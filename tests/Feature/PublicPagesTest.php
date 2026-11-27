<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class PublicPagesTest extends TestCase
{
    public function test_pwa_assets_are_available(): void
    {
        $manifestPath = public_path('site.webmanifest');
        $serviceWorkerPath = public_path('sw.js');
        $offlinePagePath = public_path('offline.html');

        self::assertFileExists($manifestPath);
        self::assertFileExists($serviceWorkerPath);
        self::assertFileExists($offlinePagePath);

        $manifest = json_decode((string) file_get_contents($manifestPath), true, flags: JSON_THROW_ON_ERROR);

        self::assertSame('Reservatr', $manifest['name']);
        self::assertSame('standalone', $manifest['display']);
        self::assertStringContainsString("'/offline.html'", (string) file_get_contents($serviceWorkerPath));
        self::assertStringContainsString("const CACHE_NAME = 'reservatr-v1'", (string) file_get_contents($serviceWorkerPath));
    }

    public function test_public_marketing_pages_are_available(): void
    {
        foreach ([
            'home' => 'welcome',
            'about' => 'about',
            'contact' => 'contact',
            'privacy' => 'privacy-policy',
            'terms' => 'terms-and-conditions',
        ] as $routeName => $component) {
            $this->get(route($routeName))
                ->assertOk()
                ->assertInertia(fn (Assert $page) => $page->component($component));
        }
    }
}
