<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Address;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json(
            Address::query()->where('user_id', $request->user()->id)->latest()->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'type' => ['required', 'in:shipping,billing'],
            'full_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],
            'line1' => ['required', 'string', 'max:255'],
            'line2' => ['nullable', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string', 'max:255'],
            'pincode' => ['required', 'string', 'max:20'],
            'country' => ['required', 'string', 'max:255'],
            'is_default' => ['boolean'],
        ]);

        $address = Address::create([
            ...$data,
            'user_id' => $request->user()->id,
            'is_default' => $data['is_default'] ?? false,
        ]);

        if ($address->is_default) {
            Address::query()
                ->where('user_id', $request->user()->id)
                ->whereKeyNot($address->id)
                ->update(['is_default' => false]);
        }

        return response()->json(['message' => 'Address created.', 'address' => $address], 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $address = Address::query()->where('user_id', $request->user()->id)->whereKey($id)->firstOrFail();
        $data = $request->validate([
            'type' => ['sometimes', 'in:shipping,billing'],
            'full_name' => ['sometimes', 'string', 'max:255'],
            'phone' => ['sometimes', 'string', 'max:30'],
            'line1' => ['sometimes', 'string', 'max:255'],
            'line2' => ['nullable', 'string', 'max:255'],
            'city' => ['sometimes', 'string', 'max:255'],
            'state' => ['sometimes', 'string', 'max:255'],
            'pincode' => ['sometimes', 'string', 'max:20'],
            'country' => ['sometimes', 'string', 'max:255'],
            'is_default' => ['sometimes', 'boolean'],
        ]);

        $address->update($data);

        if (($data['is_default'] ?? false) === true) {
            Address::query()
                ->where('user_id', $request->user()->id)
                ->whereKeyNot($address->id)
                ->update(['is_default' => false]);
        }

        return response()->json(['message' => 'Address updated.', 'address' => $address->fresh()]);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        Address::query()->where('user_id', $request->user()->id)->whereKey($id)->delete();

        return response()->json(['message' => 'Address deleted.']);
    }
}
