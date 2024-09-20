<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'first_name'=>'required',
            'last_name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required',
            'password_confirm'=>'required|same:password'
        ];
    }
    public function messages()
    {
        return [
            'first_name.required' => "Le nom de l'administrateur est requis",
            'last_name.required' => "Le prénom de l'administrateur est requis",
            'email.required' => 'Le mail est requis',
            'email.email' => "Le mail n'est pas valide",

        ];
    }
}
