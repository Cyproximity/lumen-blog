<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Psr\Http\Message\ServerRequestInterface;

class UserController extends Controller
{
  
  public function __construct()
  {
    
  }

  public function me(ServerRequestInterface $request){
    $reserve_routes = array(
      'background' => "/user/me",
    );

    $content = array(
      'author' => "Gerald Agustin",
      'email' => "gerald.agustin09@gmail.com",
      'routes' => $reserve_routes
    );
    
    return response($content)
                    ->withHeaders([
                        'Content-Type' => 'application/json'
                      ]);
  }
}
?>