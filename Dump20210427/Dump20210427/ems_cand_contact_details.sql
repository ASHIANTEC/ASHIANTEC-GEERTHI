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
-- Table structure for table `cand_contact_details`
--

DROP TABLE IF EXISTS `cand_contact_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cand_contact_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cand_id` varchar(900) DEFAULT NULL,
  `tel_phone` varchar(900) DEFAULT NULL,
  `mobile_phone` varchar(900) DEFAULT NULL,
  `email_id` varchar(900) DEFAULT NULL,
  `aadhar_no` varchar(900) DEFAULT NULL,
  `voter_id` varchar(900) DEFAULT NULL,
  `remarks` varchar(900) DEFAULT NULL,
  `last_modified_time` varchar(900) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cand_contact_details`
--

LOCK TABLES `cand_contact_details` WRITE;
/*!40000 ALTER TABLE `cand_contact_details` DISABLE KEYS */;
INSERT INTO `cand_contact_details` VALUES (6,'Ponm1','9965477594','undefined','tmstest89@gmail.com','1234567896332','12453697','This is a test','03/22/2021 13:55:49'),(7,'2','','undefined','','','','','03/22/2021 14:01:56'),(8,'Priy1','9092114052','undefined','tmstest89@gmail.com','7859222652233','3334238222','Testing','03/22/2021 20:41:19'),(9,'Devi1','','undefined','','','','','03/23/2021 11:10:19'),(10,'Raja1','9965477594','undefined','tmstest89@gmail.com,11111,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined','undefined','111111','11111','03/23/2021 11:17:27'),(11,'Ponm1','','undefined','','','','','04/01/2021 20:45:00'),(12,'Ravi2','','undefined','','','','','04/01/2021 20:54:15'),(13,'Kris1','','undefined','','','','','04/02/2021 11:57:02'),(14,'Kris1','','undefined','','','','','04/02/2021 12:17:10'),(15,'Kris1','','undefined','','','','','04/02/2021 12:18:57'),(16,'Kris1','','undefined','','','','','04/02/2021 12:19:36'),(17,'Kala1','','undefined','','','','','04/02/2021 12:52:01'),(18,'Pala1','','undefined','','','','','04/02/2021 12:54:36'),(19,'Pala2','','undefined','','','','','04/02/2021 13:09:33'),(20,'Raja2','','undefined','','','','','04/02/2021 13:33:25'),(21,'Rame2','','undefined','','','','','04/02/2021 19:15:30');
/*!40000 ALTER TABLE `cand_contact_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-27 17:36:01
