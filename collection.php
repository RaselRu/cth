<?php
require 'config.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

try {
    // Get user collections
    $stmt = $pdo->prepare("SELECT c.*, s.sticker_name FROM collections c JOIN stickers s ON c.sticker_id = s.id WHERE c.user_id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $collections = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get total stickers count for progress
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM stickers");
    $total_stickers = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    $collected_count = count($collections);
    $progress = $total_stickers > 0 ? round(($collected_count / $total_stickers) * 100) : 0;

} catch (PDOException $e) {
    die("Ошибка загрузки коллекции: " . $e->getMessage());
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Моя коллекция - CTH</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Моя коллекция</h1>

            <div class="collection-progress">
                <div class="progress-bar" style="width: <?= $progress ?>%"></div>
                <span><?= $collected_count ?> / <?= $total_stickers ?> стикеров (<?= $progress ?>%)</span>
            </div>

            <div class="stickers-grid">
                <?php if (empty($collections)): ?>
                    <p class="empty-message">У вас пока нет стикеров. Купите их в магазине!</p>
                <?php else: ?>
                    <?php foreach ($collections as $sticker): ?>
                        <div class="sticker-card">
                            <div class="sticker-image">
                                <img src="assets/images/<?= htmlspecialchars($sticker['sticker_name']) ?>.png"
                                     alt="<?= htmlspecialchars($sticker['sticker_name']) ?>"
                                     onerror="this.src='assets/images/sticker1.png'">
                            </div>
                            <p><?= htmlspecialchars($sticker['sticker_name']) ?></p>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>

            <a href="buy.php" class="btn-primary mt-20">Купить стикеры</a>
        </div>
    </div>
</body>
</html>
