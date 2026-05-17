<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => trim((string) $this->name),
            'username' => Str::lower(trim((string) $this->username)),
            'bio' => filled($this->bio) ? trim((string) $this->bio) : null,
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'username' => [
                'required',
                'string',
                'max:30',
                'alpha_dash',
                Rule::unique('users', 'username')->ignore($this->user()?->id),
            ],
            'bio' => ['nullable', 'string', 'max:500'],
            'theme_preference' => ['nullable', Rule::in(['dark', 'light'])],
            'avatar' => ['nullable', 'image', 'max:2048'],
        ];
    }
}