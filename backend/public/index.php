<?php
declare(strict_types=1);

require_once __DIR__ . '/../src/Router.php';

$router = new Router();
$router->handle($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
