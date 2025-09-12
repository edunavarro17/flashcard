<?php
require_once __DIR__ . '/../src/Database.php';
require_once __DIR__ . '/../src/Models/Flashcard.php';

$command = $argv[1] ?? null;

switch ($command) {
    case 'list':
        foreach (Flashcard::all() as $card) {
            echo "[{$card['id']}] {$card['front']} -> {$card['back']} ({$card['color']})\n";
        }
        break;

    case 'create':
        $front = readline("Front: ");
        $back  = readline("Back: ");
        $color = readline("Color (#hex): ");
        $card = Flashcard::create(['front' => $front, 'back' => $back, 'color' => $color]);
        echo "Created flashcard ID {$card['id']}\n";
        break;

    case 'update':
        $id    = (int)($argv[2] ?? 0);
        if (!$id) die("Usage: php cli.php update <id>\n");

        $front = readline("Front: ");
        $back  = readline("Back: ");
        $color = readline("Color (#hex): ");
        $card = Flashcard::update($id, ['front' => $front, 'back' => $back, 'color' => $color]);
        echo "Updated flashcard {$card['id']}\n";
        break;

    case 'delete':
        $id = (int)($argv[2] ?? 0);
        if (!$id) die("Usage: php cli.php delete <id>\n");
        Flashcard::delete($id);
        echo "Deleted flashcard $id\n";
        break;

    default:
        echo "Usage: php cli.php [list|create|update <id>|delete <id>]\n";
}
