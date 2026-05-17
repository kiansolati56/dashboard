<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function register(array $data, Request $request): User
    {
        $user = User::create([
            'name' => trim($data['name']),
            'username' => Str::lower(trim($data['username'])),
            'email' => Str::lower(trim($data['email'])),
            'password' => $data['password'],
            'theme_preference' => $data['theme_preference'] ?? 'dark',
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        $user->forceFill([
            'last_login_at' => now(),
        ])->save();

        return $user->fresh();
    }

    public function login(array $data, Request $request, bool $remember = false): User
    {
        $ok = Auth::attempt([
            'email' => Str::lower(trim($data['email'])),
            'password' => $data['password'],
        ], $remember);

        if (!$ok) {
            throw ValidationException::withMessages([
                'email' => ['These credentials do not match our records.'],
            ]);
        }

        $request->session()->regenerate();

        $user = $request->user();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['Unable to resolve authenticated user.'],
            ]);
        }

        $user->forceFill([
            'last_login_at' => now(),
        ])->save();

        return $user->fresh();
    }

    public function logout(Request $request): void
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }

    public function updateTheme(Request $request, string $theme): User
    {
        $user = $request->user();

        if (!$user) {
            abort(401);
        }

        $user->update([
            'theme_preference' => $theme,
        ]);

        return $user->fresh();
    }

    public function updateProfile(array $data, Request $request): User
    {
        $user = $request->user();

        if (!$user) {
            abort(401);
        }

        $avatarPath = $user->avatar;

        if ($request->hasFile('avatar')) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }

            $avatarPath = $request->file('avatar')->store("avatars/{$user->id}", 'public');
        }

        $user->update([
            'name' => trim($data['name']),
            'username' => Str::lower(trim($data['username'])),
            'bio' => $data['bio'] ?? null,
            'theme_preference' => $data['theme_preference'] ?? $user->theme_preference,
            'avatar' => $avatarPath,
        ]);

        return $user->fresh();
    }
}