<?php
declare(strict_types=1);

require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/Models/Flashcard.php';

class Router {
    public function handle($method, $uri) {
        $path = parse_url($uri, PHP_URL_PATH);
        header('Content-Type: application/json');

        $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin'); 
        header('Access-Control-Allow-Credentials: false');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Content-Type: application/json; charset=utf-8');

        if ($method === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
        switch ("$method $path") {
            case 'GET /flashcards':
                echo json_encode(Flashcard::all());
                break;

            case 'GET /flashcards/review':
                echo json_encode(Flashcard::random());
                break;

            case 'POST /flashcards':
                $data = json_decode(file_get_contents('php://input'), true);
                echo json_encode(Flashcard::create($data));
                break;

            case $method === 'PUT' && preg_match('#^/flashcards/(\d+)$#', $path, $matches):
                $data = json_decode(file_get_contents('php://input'), true) ?? [];
                echo json_encode(Flashcard::update((int)$matches[1], $data));
                exit;

            case $method === 'DELETE' && preg_match('#^/flashcards/(\d+)$#', $path, $m):
                echo json_encode(['deleted' => Flashcard::delete((int)$m[1])]);
                exit;

            case $method === 'DELETE' && preg_match('#^/flashcards/(\d+)/$#', $path):
                http_response_code(400);
                echo json_encode(['error' => 'Trailing slash not allowed']);
                exit;

            default:
                http_response_code(404);
                echo json_encode(['error' => 'Endpoint not found']);
        }
    }
}
