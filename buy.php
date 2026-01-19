<?php
require 'config.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['package'])) {
    $package = $_POST['package'];
    $amount = 0;

    switch ($package) {
        case 'start':
            $amount = 500;
            break;
        case 'pro':
            $amount = 1500;
            break;
        case 'max':
            $amount = 5000;
            break;
    }

    if ($amount > 0) {
        try {
            // Update user balance
            $stmt = $pdo->prepare("UPDATE users SET balance = balance + ? WHERE id = ?");
            $stmt->execute([$amount, $_SESSION['user_id']]);

            // Record transaction
            $stmt = $pdo->prepare("INSERT INTO transactions (user_id, amount, type) VALUES (?, ?, 'buy')");
            $stmt->execute([$_SESSION['user_id'], $amount]);

            $message = 'Пополнение успешно! Ваш баланс обновлен.';
        } catch (PDOException $e) {
            $message = 'Ошибка: ' . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Пополнение баланса - CTH</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>Пополнение баланса</h1>

            <?php if ($message): ?>
                <div class="alert success"><?= htmlspecialchars($message) ?></div>
            <?php endif; ?>

            <div class="packages-grid">
                <form method="POST">
                    <div class="package-card">
                        <h3>Старт</h3>
                        <div class="package-price">499 ₸</div>
                        <div class="package-amount">500 единиц</div>
                        <button type="submit" name="package" value="start" class="btn-primary">Купить</button>
                    </div>

                    <div class="package-card">
                        <h3>Про</h3>
                        <div class="package-price">1499 ₸</div>
                        <div class="package-amount">1500 единиц</div>
                        <button type="submit" name="package" value="pro" class="btn-primary">Купить</button>
                    </div>

                    <div class="package-card">
                        <h3>Макси</h3>
                        <div class="package-price">4999 ₸</div>
                        <div class="package-amount">5000 единиц</div>
                        <button type="submit" name="package" value="max" class="btn-primary">Купить</button>
                    </div>
                </form>
            </div>

            <p class="note">Примечание: Это симуляция покупки. В реальном проекте здесь будет интеграция с Kaspi.</p>
        </div>
    </div>
</body>
</html>
