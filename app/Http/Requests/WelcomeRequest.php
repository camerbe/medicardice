<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class WelcomeRequest extends FormRequest
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
            'welcome_titre_fr'=>'required',
            'welcome_titre_en'=>'required',
            //'welcome_titre_en'=>'required',
            'welcome_msg_fr'=>'required',
            'welcome_msg_en'=>'required',
            //'photo'=>'required|file',
            'welcome_keyword_en'=>'required',
            'welcome_keyword_fr'=>'required',

        ];
    }
}
