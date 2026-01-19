<?php
require 'config.php';
session_start();

try {
    // Get top 50 users by XP
    $stmt = $pdo->query("
        SELECT id, tiktok_username, level, xp
        FROM users
        ORDER BY xp DESC
        LIMIT 50
    ");
    $leaderboard = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get current user's position if logged in
    $current_user = null;
    if (isset($_SESSION['user_id'])) {
        $stmt = $pdo->prepare("
            SELECT id, tiktok_username, level, xp,
                   (SELECT COUNT(*) FROM users WHERE xp > u.xp) + 1 as position
            FROM users u
            WHERE id = ?
        ");
        $stmt->execute([$_SESSION['user_id']]);
        $current_user = $stmt->fetch(PDO::FETCH_ASSOC);
    }
} catch (PDOException $e) {
    die("Ошибка загрузки таблицы лидеров: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Таблица лидеров - CTH</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Таблица лидеров</h1>

            <div class="leaderboard-table">
                <div class="leaderboard-header">
                    <div>Место</div>
                    <div>Ник</div>
                    <div>Уровень</div>
                    <div>XP</div>
                </div>

                <?php foreach ($leaderboard as $index => $user): ?>
                    <div class="leaderboard-row <?= isset($_SESSION['user_id']) && $_SESSION['user_id'] == $user['id'] ? 'current-user' : '' ?>">
                        <div><?= $index + 1 ?></div>
                        <div><?= htmlspecialchars($user['tiktok_username']) ?></div>
                        <div><?= $user['level'] ?></div>
                        <div><?= $user['xp'] ?></div>
                    </div>
                <?php endforeach; ?>

                <?php if ($current_user && $current_user['position'] > 50): ?>
                    <div class="leaderboard-row current-user">
                        <div><?= $current_user['position'] ?></div>
                        <div><?= htmlspecialchars($current_user['tiktok_username']) ?></div>
                        <div><?= $current_user['level'] ?></div>
                        <div><?= $current_user['xp'] ?></div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</body>
</html>
