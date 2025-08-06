<?php

namespace Database\Seeders;

use App\Models\MoverAccountStatus;
use Illuminate\Database\Seeder;

class MoverAccountStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    protected $data = [
        ['key' => 'REGISTRATION_INITIATED', 'value' => 'REGISTRATION INITIATED'],
        ['key' => 'EMAIL_VERIFICATION_PENDING', 'value' => 'EMAIL VERIFICATION PENDING'],
        ['key' => 'EMAIL_VERIFIED', 'value' => 'EMAIL VERIFIED'],
        ['key' => 'ADMIN_APPROVAL_PENDING', 'value' => 'ADMIN APPROVAL PENDING'],
        ['key' => 'ACCOUNT_PARTIALLY_APPROVED', 'value' => 'ACCOUNT PARTIALLY APPROVED'],
        ['key' => 'DOCUMENTS_UPLOAD_PENDING', 'value' => 'DOCUMENTS UPLOAD PENDING'],
        ['key' => 'DOCUMENTS_REVIEW_PENDING', 'value' => 'DOCUMENTS REVIEW PENDING'],
        ['key' => 'DOCUMENTS_APPROVED', 'value' => 'DOCUMENTS APPROVED'],
        ['key' => 'DOCUMENTS_REJECTED', 'value' => 'DOCUMENTS REJECTED'],
        ['key' => 'ACCOUNT_APPROVED', 'value' => 'ACCOUNT APPROVED'],
        ['key' => 'ACCOUNT_REJECTED', 'value' => 'ACCOUNT REJECTED'],
    ];

    public function run()
    {
        foreach ($this->data as $data) {
            MoverAccountStatus::create($data);
        }
    }
}
