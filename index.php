<?php require 'config.php'; session_start(); ?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CTH — коллекционный клуб</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="manifest" href="manifest.json">
</head>
<body>
    <div class="hero">
        <h1>CTH — твоя коллекция в кармане</h1>
        <p>Собирай стикеры, выполняй челленджи и развивай своё мини-сообщество.</p>

        <?php if(isset($_SESSION['user_id'])): ?>
            <a href="dashboard.php" class="btn-primary">Перейти в кабинет</a>
        <?php else: ?>
            <a href="register.php" class="btn-primary">Начать</a>
        <?php endif; ?>
    </div>
</body>
</html>