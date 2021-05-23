<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DataController extends Controller
{
    //
    public function __construct() {
    }

    public function index(){

        if ($search = \Request::get('q')) {
            $client = new \GuzzleHttp\Client();

            $res = $client->request('GET', 'https://www.metaweather.com/api/location/search/?query='.$search,['verify' => false]);
    
            if ($res->getStatusCode() == 200) { // 200 OK
                $response_data = $res->getBody()->getContents();
            }
    
            foreach(json_decode($response_data) as $key=>$val){
                

                $resdata = $client->request('GET', 'https://www.metaweather.com/api/location/'.$val->woeid,['verify' => false]);
    
                if ($resdata->getStatusCode() == 200) { // 200 OK
                    $response_weater_data = $resdata->getBody()->getContents();
                }

                dd($response_weater_data);
            }
            return json_decode($response_data);
        }   
        exit;

       
    }
}
