<?php
use PHPUnit\Framework\TestCase;
require_once __DIR__ . '/../src/Models/Flashcard.php';

final class FlashcardTest extends TestCase {
    public function testCreateAndFindFlashcard(): void {
        $data = [
            'front' => 'Test front',
            'back' => 'Test back',
            'color' => '#123456'
        ];
        $created = Flashcard::create($data);
        $this->assertEquals('Test front', $created['front']);
        $this->assertEquals('Test back', $created['back']);

        $fetched = Flashcard::find($created['id']);
        $this->assertEquals($created['id'], $fetched['id']);
    }

    public function testRandomFlashcard(): void {
        $card = Flashcard::random();
        $this->assertArrayHasKey('front', $card);
        $this->assertArrayHasKey('back', $card);
    }
}
