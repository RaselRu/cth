<?php
require 'config.php';
session_start();

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $tiktok_username = trim($_POST['tiktok_username'] ?? '');
    $inviter_code = trim($_POST['inviter_code'] ?? '');
    $screenshot = $_FILES['screenshot'] ?? null;

    if (empty($tiktok_username)) {
        $error = 'Пожалуйста, введите ваш ник в TikTok';
    } else {
        try {
            // Generate unique ref code
            $ref_code = substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 8);

            // Insert user
            $stmt = $pdo->prepare("INSERT INTO users (tiktok_username, ref_code, inviter_code) VALUES (?, ?, ?)");
            $stmt->execute([$tiktok_username, $ref_code, $inviter_code]);
            $user_id = $pdo->lastInsertId();

            // Handle screenshot upload (placeholder logic)
            $screenshot_path = null;
            if ($screenshot && $screenshot['error'] === UPLOAD_ERR_OK) {
                $screenshot_path = 'uploads/' . basename($screenshot['name']);
                // Note: Actual file upload would need proper handling
            }

            // Insert repost record
            $stmt = $pdo->prepare("INSERT INTO reposts (user_id, screenshot) VALUES (?, ?)");
            $stmt->execute([$user_id, $screenshot_path]);

            // Set session and redirect
            $_SESSION['user_id'] = $user_id;
            header('Location: dashboard.php');
            exit;

        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                $error = 'Этот ник в TikTok уже используется';
            } else {
                $error = 'Ошибка регистрации: ' . $e->getMessage();
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Регистрация - CTH</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Регистрация</h1>

            <?php if ($error): ?>
                <div class="alert error"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>

            <form method="POST" enctype="multipart/form-data" class="form">
                <div class="form-group">
                    <label for="tiktok_username">Ваш ник в TikTok</label>
                    <input type="text" id="tiktok_username" name="tiktok_username" required placeholder="@your_tiktok">
                </div>

                <div class="form-group">
                    <label for="inviter_code">Код друга (опционально)</label>
                    <input type="text" id="inviter_code" name="inviter_code" placeholder="Код друга">
                </div>

                <div class="form-group">
                    <label for="screenshot">Скриншот репоста (заглушка)</label>
                    <input type="file" id="screenshot" name="screenshot" accept="image/*">
                </div>

                <button type="submit" class="btn-primary">Зарегистрироваться</button>
            </form>

            <p class="text-center mt-20">Уже есть аккаунт? <a href="index.php">Войти</a></p>
        </div>
    </div>
</body>
</html>
