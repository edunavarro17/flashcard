<?php

class Database {
    private static $db;

    public static function connect() {
        if (!self::$db) {
            $dbPath = __DIR__ . '/../database/flashcards.db';
            $dir = dirname($dbPath);

            if (!is_dir($dir)) {
                mkdir($dir, 0777, true);
            }
            if (!is_writable($dir)) {
                @chmod($dir, 0777);
            }
            self::$db = new PDO('sqlite:' . __DIR__ . '/../database/flashcards.db');
            self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::initialize();
        }
        return self::$db;
    }

    private static function initialize() {
        $sql = "CREATE TABLE IF NOT EXISTS flashcards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            front TEXT NOT NULL,
            back TEXT NOT NULL,
            color TEXT DEFAULT '#ffffff',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )";
        self::$db->exec($sql);
    }
}
