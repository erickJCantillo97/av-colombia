<?php

namespace App\Repositories;

use App\Interfaces\ServiceRepositoryInterface;
use App\Models\Included;
use App\Models\Service;
use App\Models\User;
use Illuminate\Container\Attributes\DB;
use Illuminate\Support\Facades\Auth;

class ServiceRepository extends BaseRepository implements ServiceRepositoryInterface
{
    public function model()
    {
        return Service::class;
    }

    public function getAllByType($type = 'TOUR')
    {
        return $this->model->with('images', 'features', 'availabilities', 'availabilities.horarios', 'availabilities.precies')
            ->where('type', $type)->get();
    }

    public function getAll()
    {
        return $this->model->with('images', 'features', 'availabilities', 'availabilities.horarios', 'availabilities.precies')
            ->get();
    }

    public function search(array $data)
    {
        $search = $data['search'] ?? null;
        $type = $data['type'] ?? null;
        $user_id = $data['user_id'] ?? null;

        if ($user_id) {
            Auth::login(User::find($user_id));
        }

        return $this->model->with('locks')
            ->with('images', 'features', 'availabilities', 'availabilities.horarios', 'availabilities.precies')
            ->where('type', $type)
            ->whereAny([
                'title',
                'title_en',
                'description',
                'description_en',
            ], 'LIKE', $search)
            ->get();
    }

    public function getById($id)
    {
        return $this->model->find($id);
    }

    public function create(array $data)
    {
        $included = array_merge(json_decode($data['includes']), json_decode($data['notIncludes']));
        foreach ($included as $i) {
            Included::firstOrCreate(['name' => $i]);
        }
        return $this->model->create($data);
    }

    public function update($id, array $data)
    {
        $includes = json_decode($data['includes']) ?? [];
        $notIncludes = json_decode($data['notIncludes']) ?? [];
        $included = array_merge($includes, $notIncludes);

        foreach ($included as $i) {
            Included::firstOrCreate(['name' => $i]);
        }

        return $this->find($id)->update($data);
    }

    public function setPortada($id, $image)
    {
        $service = $this->model->where('slug', $id)->first();
        $service->portada = $image->store('public/images');
        $service->save();
        return $service;
    }

    public function delete($id)
    {
        return $this->model->where('id', $id)->first()->delete();
    }

    public function getProveedors($id)
    {
        return $this->model->find($id)->proveedors;
    }

    public function getServiceByUser($userId)
    {
        $services = \DB::select('CALL ObtenerTodosLosServicios(?)', [$userId]);
        return array_map(function ($service)  {
           $images = isset($service->image_urls) ? explode(',', $service->image_urls) : [];
           $service->image_urls = $images;
           return $service;
        }, $services);
    }

    public function getServiceBySlugAndUser($slug, $userId)
    {
        return array_map(function ($service) {
            $images = isset($service->image_urls) ? explode(',', $service->image_urls) : [];
            $service->image_urls = $images;
            return $service;
        }, \DB::select('CALL ObtenerServiciosBySlugAndUser(?, ?)', [$slug, $userId]));
    }
}
