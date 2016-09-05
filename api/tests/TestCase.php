<?php

use Lukasoppermann\Httpstatus\Httpstatuscodes;

class TestCase extends Laravel\Lumen\Testing\TestCase implements Httpstatuscodes
{
    protected $client;

    public function createApplication()
    {
        return require __DIR__.'/../bootstrap/app.php';
    }

    public function setUp()
    {
      parent::setUp();

      $this->client = new GGuzzleHttp\Client([
        'base_uri' => 'http://',
        'exceptions' => false
      ]);
    }
}
