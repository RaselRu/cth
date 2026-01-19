<?php
// Конфигурация проекта
define('DB_HOST', 'sql107.byethost7.com');
define('DB_USER', 'b7_36760225');
define('DB_PASS', 'CHANGE_ME');
define('DB_NAME', 'b7_36760225_cth');

try {
    $pdo = new PDO(
        "mysql:host=".DB_HOST.";dbname=".DB_NAME.";charset=utf8mb4",
        DB_USER,
        DB_PASS
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("DB Error: " . $e->getMessage());
}
?>
