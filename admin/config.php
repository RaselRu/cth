<?php
// admin/config.php
// Настройки админки. Сразу замените пароль на свой хеш.
// Чтобы сгенерировать хеш локально: php -r "echo password_hash('NEW_PASS', PASSWORD_DEFAULT);"

define('ADMIN_USER', 'admin');
// Замените значение на сгенерированный хеш пароля.
define('ADMIN_PASS_HASH', '$2y$10$REPLACE_WITH_YOUR_HASH');

define('PAGES_DIR', __DIR__ . '/../pages'); // директория с редактируемыми страницами
// Ограничиваем прав доступа при сохранении файлов
define('ALLOWED_EXTENSIONS', ['html', 'htm']);
?>