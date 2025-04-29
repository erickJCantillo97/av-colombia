<?php

namespace App\Http\Controllers;

use App\Models\Lock;
use App\Http\Requests\StoreLockRequest;
use App\Http\Requests\UpdateLockRequest;
use App\Interfaces\LockRepositoryInterface;

class LockController extends Controller
{
    public function __construct(
        private LockRepositoryInterface $lockRepository
    ) {}

    public function store(StoreLockRequest $request)
    {
        $this->lockRepository->create($request->validated());
    }

    public function update(UpdateLockRequest $request, $lock)
    {
        $this->lockRepository->update($lock, $request->validated());
    }

    public function destroy($lock)
    {
        $this->lockRepository->delete($lock);
    }
}
