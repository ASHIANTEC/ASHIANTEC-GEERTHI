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
-- Table structure for table `cand_profile_details`
--

DROP TABLE IF EXISTS `cand_profile_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cand_profile_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cand_id` varchar(450) DEFAULT NULL,
  `name` varchar(900) DEFAULT NULL,
  `initial` varchar(900) DEFAULT NULL,
  `initial_expansion` varchar(900) DEFAULT NULL,
  `father_name` varchar(900) DEFAULT NULL,
  `mother_name` varchar(900) DEFAULT NULL,
  `date_of_birth` varchar(900) DEFAULT NULL,
  `gender` varchar(450) DEFAULT NULL,
  `blood_group` varchar(450) DEFAULT NULL,
  `religion` varchar(450) DEFAULT NULL,
  `community` varchar(450) DEFAULT NULL,
  `caste` varchar(450) DEFAULT NULL,
  `nationality` varchar(450) DEFAULT NULL,
  `willing_to_donate_blood` varchar(450) DEFAULT NULL,
  `academic_year` varchar(450) DEFAULT NULL,
  `student_code` varchar(450) DEFAULT NULL,
  `registered_time` varchar(450) DEFAULT NULL,
  `last_modified_time` varchar(450) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cand_profile_details`
--

LOCK TABLES `cand_profile_details` WRITE;
/*!40000 ALTER TABLE `cand_profile_details` DISABLE KEYS */;
INSERT INTO `cand_profile_details` VALUES (18,'Ponm1','Ponmari','S','Subramanian','Subramanian','Parvarthy','2021-03-10','Male','B+Ve','Christian','BC','Hindu','Indian','yes','2005','123456','03/22/2021 13:55:49','03/22/2021 13:55:49'),(20,'Priy1','Priya','Philip','P','Subramanian','Parvarthy','1998-03-11','Female','B+Ve','Hindu','OC','Hindu','Indian','yes','2005','123456','03/22/2021 20:41:19','03/22/2021 20:41:19'),(21,'Devi1','Devi','S','S','Subramanian','Parvarthy','2000-02-10','Female','B+Ve','Hindu','BC','Hindu','Indian','yes','2005','123456','03/23/2021 11:10:19','03/23/2021 11:10:19'),(22,'Raja1','Raja','S','S','Subramanian','Parvarthy','2021-03-11','Male','B+Ve','Christian','OC','Hindu','Indian','yes','2005','123456','03/23/2021 11:17:27','03/23/2021 11:17:27'),(23,'Ponm1','Ponmari Subbu','','','','','','undefined','',' ',' ','',' ',' ','','','04/01/2021 20:45:00','04/01/2021 20:45:00'),(24,'Ravi2','Ravi','','','','','','undefined','',' ',' ','',' ',' ','','','04/01/2021 20:54:15','04/01/2021 20:54:15'),(25,'Kris1','Krishna','','','','','','Male','',' ',' ','',' ',' ','','','04/02/2021 11:57:02','04/02/2021 11:57:02'),(26,'Kris1','Krishna','','','','','','Male','',' ',' ','',' ',' ','','','04/02/2021 12:17:10','04/02/2021 12:17:10'),(27,'Kris1','Krishna','','','','','','Male','',' ',' ','',' ',' ','','','04/02/2021 12:18:57','04/02/2021 12:18:57'),(28,'Kris1','Krishna','','','','','','Male','',' ',' ','',' ',' ','','','04/02/2021 12:19:36','04/02/2021 12:19:36'),(29,'Kala1','Kalagar','','','','','','undefined','',' ',' ','',' ',' ','','','04/02/2021 12:52:01','04/02/2021 12:52:01'),(30,'Pala1','Palani','','','','','','undefined','',' ',' ','',' ',' ','','','04/02/2021 12:54:36','04/02/2021 12:54:36'),(31,'Pala2','Palani','','','','','','undefined','',' ',' ','',' ',' ','','','04/02/2021 13:09:33','04/02/2021 13:09:33'),(32,'Raja2','Raja Kumar','','','','','','undefined','',' ',' ','',' ',' ','','','04/02/2021 13:33:25','04/02/2021 13:33:25'),(33,'Rame2','Ramesh','','','','','','undefined','',' ',' ','',' ',' ','','','04/02/2021 19:15:30','04/02/2021 19:15:30');
/*!40000 ALTER TABLE `cand_profile_details` ENABLE KEYS */;
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
