<?php
declare(strict_types=1);

require_once __DIR__ . '/../Database.php';

class Flashcard {
    public static function all() {
        $db = Database::connect();
        return $db->query("SELECT * FROM flashcards")->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function random() {
        $db = Database::connect();
        return $db->query("SELECT * FROM flashcards ORDER BY RANDOM() LIMIT 1")->fetch(PDO::FETCH_ASSOC);
    }

    public static function create($data) {
        $db = Database::connect();
        $stmt = $db->prepare("INSERT INTO flashcards (front, back, color) VALUES (:front, :back, :color)");
        $stmt->execute($data);
        return self::find($db->lastInsertId());
    }

    public static function update($id, $data) {
        $db = Database::connect();
        $stmt = $db->prepare("UPDATE flashcards SET front = :front, back = :back, color = :color, updated_at = CURRENT_TIMESTAMP WHERE id = :id");
        $data['id'] = $id;
        $stmt->execute($data);
        return self::find($id);
    }

    public static function delete($id) {
        $db = Database::connect();
        $stmt = $db->prepare("DELETE FROM flashcards WHERE id = ?");
        return $stmt->execute([$id]);
    }

    public static function find($id) {
        $db = Database::connect();
        $stmt = $db->prepare("SELECT * FROM flashcards WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
