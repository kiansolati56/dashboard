<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\UpdateProfileRequest;
use App\Http\Requests\Auth\UpdateThemeRequest;
use App\Http\Resources\AuthUserResource;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(private readonly AuthService $auth)
    {
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->auth->register($request->validated(), $request);

        return response()->json([
            'message' => 'Registered successfully.',
            'user' => new AuthUserResource($user),
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $user = $this->auth->login(
            $request->validated(),
            $request,
            $request->boolean('remember')
        );

        return response()->json([
            'message' => 'Logged in successfully.',
            'user' => new AuthUserResource($user),
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'user' => new AuthUserResource($request->user()),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $this->auth->logout($request);

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }

    public function updateTheme(UpdateThemeRequest $request): JsonResponse
    {
        $data = $request->validated();

        $user = $this->auth->updateTheme($request, $data['theme_preference']);

        return response()->json([
            'message' => 'Theme updated successfully.',
            'user' => new AuthUserResource($user),
        ]);
    }

    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        $user = $this->auth->updateProfile($request->validated(), $request);

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => new AuthUserResource($user),
        ]);
    }
}