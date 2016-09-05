<?php
class CollectionTest extends TestCase
{
    public function get_a_collection_by_name()
    {
        $response = $this->client->get('/collection/travel');

        $this->assertEquals(
          self::HTTP_OK,
          $response->getStatusCode()
        );

        $this->markTestIncomplete('add expected return data');
    }
}
?>
