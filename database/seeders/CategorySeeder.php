<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    private array $categories;

    public function __construct()
    {
        $this->categories = $this->loadData();
    }

    /** @return array<int, array{name: string}> */
    private function loadData(): array
    {
        return require 'data/categories.php';
    }

    public function run(): void
    {

        foreach ($this->categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
            ]);
        }
    }
}
