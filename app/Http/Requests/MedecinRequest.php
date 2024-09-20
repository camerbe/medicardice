<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MedecinRequest extends FormRequest
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
            'doc_titre_fr'=>'required',
            'doc_titre_en'=>'required',
            'doc_msg_fr'=>'required',
            'doc_msg_en'=>'required',
            'photo'=>'required',
            'doc_keyword_en'=>'required',
            'doc_keyword_fr'=>'required',
        ];
    }
}
