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
-- Table structure for table `audit_trail`
--

DROP TABLE IF EXISTS `audit_trail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_trail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(900) DEFAULT NULL,
  `current_user` varchar(900) DEFAULT NULL,
  `audited_time` varchar(900) DEFAULT NULL,
  `user_agent` varchar(900) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_trail`
--

LOCK TABLES `audit_trail` WRITE;
/*!40000 ALTER TABLE `audit_trail` DISABLE KEYS */;
INSERT INTO `audit_trail` VALUES (2,'Adding_Student_MBBS','Ponm1','03/22/2021 13:55:49','CPPONM55'),(3,'Adding_Student_MBBS','2','03/22/2021 14:01:56','CPPONM55'),(4,'Adding_Student_MBBS','Priy1','03/22/2021 20:41:19','CAPONM72'),(5,'Adding_Student_MBBS','Devi1','03/23/2021 11:10:19','CAPONM72'),(6,'Adding_Student_MBBS','Raja1','03/23/2021 11:17:27','undefined'),(7,'Adding_Student_MBBS','Ponm1','04/01/2021 20:45:00','CAPONM72'),(8,'Adding_Student_MBBS','Ravi2','04/01/2021 20:54:15','CAPONM72'),(9,'Adding_Student_MBBS','Kris1','04/02/2021 11:57:02','CAPONM72'),(10,'Adding_Student_MBBS','Kris1','04/02/2021 12:17:10','undefined'),(11,'Adding_Student_MBBS','Kris1','04/02/2021 12:18:57','undefined'),(12,'Adding_Student_MBBS','Kris1','04/02/2021 12:19:36','undefined'),(13,'Adding_Student_MBBS','Kala1','04/02/2021 12:52:01','CAPONM72'),(14,'Adding_Student_MBBS','Pala1','04/02/2021 12:54:36','CAPONM72'),(15,'Adding_Student_MBBS','Pala2','04/02/2021 13:09:33','CAPONM72'),(16,'Adding_Student_MBBS','Raja2','04/02/2021 13:33:25','CAPONM72'),(17,'Adding_Student_MBBS','Rame2','04/02/2021 19:15:30','CAPONM72');
/*!40000 ALTER TABLE `audit_trail` ENABLE KEYS */;
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
