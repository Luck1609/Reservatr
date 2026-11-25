<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsOnboarded
{
  /**
   * Handle an incoming request.
   *
   * @param  Closure(Request): (Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {
    $user = $request->user();

    if (! $user instanceof User) {
      return $next($request);
    }

    if ($request->routeIs('onboarding', 'onboarding.store')) {
      return $user->has_onboarded
        ? to_route('dashboard')
        : $next($request);
    }

    if (! $user->has_onboarded) {
      return to_route('onboarding');
    }

    return $next($request);
  }
}
