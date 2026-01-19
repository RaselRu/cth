<?php
require 'config.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        session_destroy();
        header('Location: index.php');
        exit;
    }

    // Calculate level progress
    $current_level = $user['level'];
    $xp_for_level = $current_level * 100;
    $progress = min(100, ($user['xp'] % $xp_for_level) / $xp_for_level * 100);

} catch (PDOException $e) {
    die("Ошибка загрузки данных: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Личный кабинет - CTH</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Личный кабинет</h1>

            <div class="user-info">
                <div class="user-header">
                    <h2><?= htmlspecialchars($user['tiktok_username']) ?></h2>
                    <p>Уровень: <?= $user['level'] ?></p>
                </div>

                <div class="progress-container">
                    <div class="progress-bar" style="width: <?= $progress ?>%"></div>
                    <span><?= $user['xp'] ?> XP (<?= $progress ?>%)</span>
                </div>

                <div class="stats">
                    <div class="stat-item">
                        <span class="stat-value"><?= $user['balance'] ?></span>
                        <span class="stat-label">Баланс</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value"><?= $user['daily_streak'] ?></span>
                        <span class="stat-label">Дней подряд</span>
                    </div>
                </div>
            </div>

            <div class="dashboard-actions">
                <a href="collection.php" class="btn-action">
                    <div class="btn-icon">📋</div>
                    <span>Коллекция</span>
                </a>
                <a href="buy.php" class="btn-action">
                    <div class="btn-icon">💰</div>
                    <span>Пополнить</span>
                </a>
                <a href="leaderboard.php" class="btn-action">
                    <div class="btn-icon">🏆</div>
                    <span>Лидеры</span>
                </a>
                <a href="logout.php" class="btn-action">
                    <div class="btn-icon">🚪</div>
                    <span>Выйти</span>
                </a>
            </div>
        </div>
    </div>
</body>
</html>
