<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GoogleController extends Controller
{
    
    public function gyms(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        $lat = $request->lat;
        $lng = $request->lng;
        $apiKey = env('GOOGLE_SERVER_KEY');

        $url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
        $params = [
            'location' => "$lat,$lng",
            'radius'   => 10000,
            'type'     => 'gym',
            'key'      => $apiKey,
        ];

        $response = Http::get($url, $params);

        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json([
            'error' => 'Unable to fetch gyms from Google Places API',
            'details' => $response->body()
        ], 500);
    }
}
