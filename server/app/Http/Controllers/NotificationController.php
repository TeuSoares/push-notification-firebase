<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class NotificationController extends Controller
{
    public function sendNotification(Request $request)
    {
        $deviceTokens = [
            'f1Hi0lcTN9mmCu1RWy7i_L:APA91bHjd8V-Buh3JpNzjES-azomupOWk4BY8rqhg01kQoycz2oNIbgmOhtg-iOTpSxy15Hl8UVzGopyJS9UZIn5QCFr53amLa4LFj5GhLGXpkKeeKWlS9iW-BblskRRnpmjB8PHErUk',
            'c-HjmHSI56PCo4qZgykeWf:APA91bHzBklPR1aX867pgTwZiEGH6sXhojmQPDNPLo89Qr1O3eb1FvopZhDePtTfDI1B44Lf9KXmqCKf-RiyHyVKdOtQsZXl2BrUBeMeb22HNi2hERyEwGvgfV5Y08GMAPIysR4niX9M',
        ];

        $headers = [
            'Authorization' => 'Bearer ' . $this->getGoogleAccessToken(),
            'Content-Type' => 'application/json'
        ];

        $messages_ids = [];

        foreach ($deviceTokens as $token) {
            $data = [
                "message" => [
                    "token" => $token,
                    "notification" => [
                      "title" => $request->title,
                      "body" => $request->body
                    ]
                ]
            ];

            $response = Http::withHeaders($headers)
                ->post('https://fcm.googleapis.com/v1/projects/push-notification-2cb1f/messages:send', $data);

            array_push($messages_ids, $response->json());
        }

        return response()->json($messages_ids);
    }

    private function getGoogleAccessToken() 
    {
        // Gera um token de acesso OAuth 2.0 de curta duração a partir das credenciais do arquivo JSON derivado de uma conta de serviço.
        $client = new \Google\Client();
        $client->useApplicationDefaultCredentials(); // Recupera o valor da variável GOOGLE_APPLICATION_CREDENTIALS no .env
        $client->addScope('https://www.googleapis.com/auth/firebase.messaging');
        $client->fetchAccessTokenWithAssertion();
        $token = $client->getAccessToken();
        return $token['access_token'];
   }
}