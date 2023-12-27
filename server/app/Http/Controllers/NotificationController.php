<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class NotificationController extends Controller
{
    public function sendNotification(Request $request)
    {
        $headers = [
            'Authorization' => 'Bearer ' . $this->getGoogleAccessToken(),
            'Content-Type' => 'application/json'
        ];

        $data = [
            "message" => [
                "token" => env('FIREBASE_CLIENT_TOKEN'),
                "notification" => [
                  "title" => $request->title,
                  "body" => $request->body
                ]
            ]
        ];

        $response = Http::withHeaders($headers)
            ->post('https://fcm.googleapis.com/v1/projects/push-notification-2cb1f/messages:send', $data);

        if ($response->failed()) {
            return $response->throw();
        }

        return $response->json();
    }

    private function getGoogleAccessToken() {
        // Gera um token de acesso OAuth 2.0 de curta duração a partir das credenciais do arquivo JSON derivado de uma conta de serviço.
        $client = new \Google\Client();
        $client->useApplicationDefaultCredentials(); // Recupera o valor da variável GOOGLE_APPLICATION_CREDENTIALS no .env
        $client->addScope('https://www.googleapis.com/auth/firebase.messaging');
        $client->fetchAccessTokenWithAssertion();
        $token = $client->getAccessToken();
        return $token['access_token'];
   }
}