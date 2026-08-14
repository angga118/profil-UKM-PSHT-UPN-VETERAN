CREATE DATABASE IF NOT EXISTS `profil_ukm_psht`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `profil_ukm_psht`;

CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(60) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_users_username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `site_content` (
  `content_key` VARCHAR(40) NOT NULL,
  `content_value` JSON NOT NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`content_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `gallery_items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(160) NOT NULL,
  `description` VARCHAR(200) NOT NULL DEFAULT '',
  `image_url` VARCHAR(255) NOT NULL,
  `sort_order` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `gallery_items_sort_order_index` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `site_content` (`content_key`, `content_value`) VALUES
('hero', JSON_OBJECT(
  'eyebrow', 'Persaudaraan Setia Hati Terate',
  'title', 'UKM PSHT UPN "Veteran" Jawa Timur',
  'description', 'Tangguh Dalam Aksi, Unggul Dalam Prestasi'
)),
('welcome', JSON_OBJECT(
  'title', 'Selamat Datang',
  'text', 'di landing page resmi UKM PSHT UPN "Veteran" Jawa Timur'
))
ON DUPLICATE KEY UPDATE `content_value` = VALUES(`content_value`);
