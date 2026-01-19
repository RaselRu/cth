-- Схема базы данных
CREATE DATABASE IF NOT EXISTS `b7_36760225_cth` CHARACTER SET utf8mb4;
USE `b7_36760225_cth`;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tiktok_username VARCHAR(50) UNIQUE,
    ref_code VARCHAR(10) UNIQUE,
    inviter_code VARCHAR(10) NULL,
    balance INT DEFAULT 100,
    xp INT DEFAULT 0,
    level INT DEFAULT 1,
    daily_streak INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS collections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    sticker_id INT,
    acquired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    amount INT,
    type ENUM('buy','reward','ref'),
    ref_user_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reposts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    screenshot TEXT,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
