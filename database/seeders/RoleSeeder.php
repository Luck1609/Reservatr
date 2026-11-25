<?php

namespace Database\Seeders;

use App\Enums\UserTypeEnum;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{


  public function run(): void
  {
    $roles = [
      UserTypeEnum::Client->value,
      UserTypeEnum::Provider->value,
      UserTypeEnum::Admin->value
    ];


    foreach ($roles as $role) {
      Role::findOrCreate($role, 'web');
    }
  }
}
