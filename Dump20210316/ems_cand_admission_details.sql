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
-- Table structure for table `cand_admission_details`
--

DROP TABLE IF EXISTS `cand_admission_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cand_admission_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cand_id` varchar(500) DEFAULT NULL,
  `rank` varchar(900) DEFAULT NULL,
  `rank_no` varchar(900) DEFAULT NULL,
  `ar_no` varchar(900) DEFAULT NULL,
  `total_mark` varchar(900) DEFAULT NULL,
  `neet_mark` varchar(900) DEFAULT NULL,
  `reg_no` varchar(900) DEFAULT NULL,
  `neet_roll_no` varchar(900) DEFAULT NULL,
  `course` varchar(900) DEFAULT NULL,
  `admission_type` varchar(900) DEFAULT NULL,
  `admission_quota` varchar(900) DEFAULT NULL,
  `course_commencement` varchar(900) DEFAULT NULL,
  `date_of_admission` varchar(900) DEFAULT NULL,
  `date_of_allotment` varchar(900) DEFAULT NULL,
  `selected_category` varchar(900) DEFAULT NULL,
  `willing_for_counciling` varchar(900) DEFAULT NULL,
  `last_modified_time` varchar(900) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cand_admission_details`
--

LOCK TABLES `cand_admission_details` WRITE;
/*!40000 ALTER TABLE `cand_admission_details` DISABLE KEYS */;
INSERT INTO `cand_admission_details` VALUES (7,'Ponm1','123','1223','122','123,670','1223','undefined','121233','MBBS','SC','undefined','2021-03-05','2021-03-16','2021-03-11','BC','undefined','03/22/2021 13:55:49'),(9,'Priy1','123','123','122','123','123','123','123','MBBS','OC',NULL,'2021-03-05','2021-03-05','2021-03-05','OC','yes','03/22/2021 20:41:19'),(11,'Raja1','123','11','122','111,670','11','undefined','111','MBBS','BC','undefined','2021-03-25','2021-03-04','2021-03-04','BC','undefined','03/23/2021 11:17:27'),(12,'Ponm1','','','',',','','undefined','','MBBS',' ','undefined','','','',' ','undefined','04/01/2021 20:45:00'),(13,'Ravi2','','','',',','','undefined','','MBBS',' ','undefined','','','',' ','undefined','04/01/2021 20:54:15'),(14,'Kris1','','','',',','','undefined','','MBBS',' ','undefined','','','',' ','undefined','04/02/2021 11:57:02'),(15,'Kris1','','','',',','','undefined','','MBBS',' ','undefined','','','',' ','undefined','04/02/2021 12:17:10'),(16,'Kris1','','','',',','','undefined','','MBBS',' ','undefined','','','',' ','undefined','04/02/2021 12:18:57'),(17,'Kris1','','','',',','','undefined','','MBBS',' ','undefined','','','',' ','undefined','04/02/2021 12:19:36'),(18,'Kala1','','','',',','','undefined','','MBBS',' ','undefined','','','',' ','undefined','04/02/2021 12:52:01'),(19,'Pala1','','','',',','','undefined','','MBBS',' ','undefined','','','',' ','undefined','04/02/2021 12:54:36'),(20,'Pala2','','','',',','','undefined','','MBBS',' ','undefined','','','',' ','undefined','04/02/2021 13:09:33'),(21,'Raja2','','','',',','','undefined','','MBBS',' ','undefined','','','',' ','undefined','04/02/2021 13:33:25'),(22,'Rame2','','','',',','','undefined','','MBBS',' ','undefined','','','',' ','undefined','04/02/2021 19:15:30');
/*!40000 ALTER TABLE `cand_admission_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-02 19:55:15
