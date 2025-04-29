<?php

namespace App\Http\Controllers\BookingService;

use App\Http\Controllers\Controller;
use App\Http\Requests\BookingService\StoreBookingExtrasRequest;
use App\Interfaces\BookingExtrasRepositoryInterface;

class BookingExtrasController extends Controller
{

    public function __construct(
        private BookingExtrasRepositoryInterface $bookingExtrasRepository,
    ) {}

    public function store(StoreBookingExtrasRequest $request)
    {
        $this->bookingExtrasRepository->create($request->validated());
    }
    public function destroy($bookingExtras)
    {
        $this->bookingExtrasRepository->delete($bookingExtras);
    }
}
