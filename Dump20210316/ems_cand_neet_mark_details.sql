-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: ems
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cand_neet_mark_details`
--

DROP TABLE IF EXISTS `cand_neet_mark_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cand_neet_mark_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cand_id` varchar(450) DEFAULT NULL,
  `phy_mark` varchar(450) DEFAULT NULL,
  `phy_max_mark` varchar(450) DEFAULT NULL,
  `chem_mark` varchar(450) DEFAULT NULL,
  `chem_max_mark` varchar(450) DEFAULT NULL,
  `bio_mark` varchar(450) DEFAULT NULL,
  `bio_max_mark` varchar(450) DEFAULT NULL,
  `agg_mark` varchar(450) DEFAULT NULL,
  `agg_max_mark` varchar(450) DEFAULT NULL,
  `last_modified_time` varchar(450) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cand_neet_mark_details`
--

LOCK TABLES `cand_neet_mark_details` WRITE;
/*!40000 ALTER TABLE `cand_neet_mark_details` DISABLE KEYS */;
INSERT INTO `cand_neet_mark_details` VALUES (1,'Ponm1','1','3','1','2','2','365','323','3','03/22/2021 13:55:49'),(2,'2','','','','','','','','','03/22/2021 14:01:56'),(3,'Priy1','70','100','70','100','70','100','70','100','03/22/2021 20:41:19'),(4,'Devi1','','','','','','','','','03/23/2021 11:10:19'),(5,'Raja1','1','1','1','1','1','1','1','1','03/23/2021 11:17:27'),(6,'Ponm1','','','','','','','','','04/01/2021 20:45:00'),(7,'Ravi2','','','','','','','','','04/01/2021 20:54:15'),(8,'Kris1','','','','','','','','','04/02/2021 11:57:02'),(9,'Kris1','','','','','','','','','04/02/2021 12:17:10'),(10,'Kris1','','','','','','','','','04/02/2021 12:18:57'),(11,'Kris1','','','','','','','','','04/02/2021 12:19:36'),(12,'Kala1','','','','','','','','','04/02/2021 12:52:01'),(13,'Pala1','','','','','','','','','04/02/2021 12:54:36'),(14,'Pala2','','','','','','','','','04/02/2021 13:09:33'),(15,'Raja2','','','','','','','','','04/02/2021 13:33:25'),(16,'Rame2','','','','','','','','','04/02/2021 19:15:30');
/*!40000 ALTER TABLE `cand_neet_mark_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-02 19:55:14
