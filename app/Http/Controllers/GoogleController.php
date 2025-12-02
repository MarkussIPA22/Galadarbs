<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GoogleController extends Controller
{
    public function gyms(Request $request)
    {
        $request->validate([
            'location' => 'required|string',
            'radius'   => 'nullable',
        ]);

        $radius = isset($request->radius) ? (float) $request->radius * 1000 : 10000; 
        $apiKey = env('GOOGLE_SERVER_KEY');

        $geoRes = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
            'address' => $request->location,
            'key' => $apiKey,
        ]);

        if (!$geoRes->successful() || empty($geoRes['results'])) {
            return response()->json([
                'error' => 'Could not find that location'
            ], 422);
        }

        $coords = $geoRes['results'][0]['geometry']['location'];
        $lat = $coords['lat'];
        $lng = $coords['lng'];

        $gymRes = Http::get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', [
            'location' => "$lat,$lng",
            'radius' => $radius,
            'type' => 'gym',
            'key' => $apiKey,
        ]);

        if ($gymRes->successful()) {
            return response()->json($gymRes->json());
        }

        return response()->json([
            'error' => 'Unable to fetch gyms from Google Places API',
            'details' => $gymRes->body()
        ], 500);
    }
}
