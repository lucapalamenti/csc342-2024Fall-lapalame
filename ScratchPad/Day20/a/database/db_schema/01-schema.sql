-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               11.5.2-MariaDB-ubu2404 - mariadb.org binary distribution
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for ncparks
CREATE DATABASE IF NOT EXISTS `ncparks` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `ncparks`;

-- Dumping structure for table ncparks.county
CREATE TABLE IF NOT EXISTS `county` (
  `cty_id` int(10) NOT NULL,
  `cty_name` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`cty_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table ncparks.park
CREATE TABLE IF NOT EXISTS `park` (
  `par_id` int(11) NOT NULL,
  `par_name` varchar(100) NOT NULL,
  `par_lat` decimal(10,8) DEFAULT 0.00000000,
  `par_lon` decimal(10,8) DEFAULT 0.00000000,
  PRIMARY KEY (`par_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table ncparks.park_county
CREATE TABLE IF NOT EXISTS `park_county` (
  `pct_par_id` int(10) DEFAULT NULL,
  `pct_cty_id` int(10) DEFAULT NULL,
  UNIQUE KEY `FK__park` (`pct_par_id`) USING BTREE,
  UNIQUE KEY `FK__county` (`pct_cty_id`) USING BTREE,
  CONSTRAINT `FK_PCT_CTY` FOREIGN KEY (`pct_cty_id`) REFERENCES `county` (`cty_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_PCT_PAR` FOREIGN KEY (`pct_par_id`) REFERENCES `park` (`par_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table ncparks.user
CREATE TABLE IF NOT EXISTS `user` (
  `usr_id` int(11) NOT NULL,
  `usr_first_name` varchar(100) NOT NULL,
  `usr_last_name` varchar(100) NOT NULL,
  `usr_username` varchar(150) NOT NULL,
  `usr_password` varchar(255) NOT NULL,
  `usr_salt` varchar(100) NOT NULL,
  `usr_avatar` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table ncparks.user_visit
CREATE TABLE IF NOT EXISTS `user_visit` (
  `uvs_usr_id` int(10) DEFAULT NULL,
  `uvs_par_id` int(10) DEFAULT NULL,
  UNIQUE KEY `FK__USER` (`uvs_usr_id`),
  UNIQUE KEY `FK__PARK` (`uvs_par_id`),
  CONSTRAINT `FK_UVS_PAR` FOREIGN KEY (`uvs_usr_id`) REFERENCES `user` (`usr_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_UVS_USR` FOREIGN KEY (`uvs_par_id`) REFERENCES `park` (`par_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
