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
-- Table structure for table `cand_photo_details`
--

DROP TABLE IF EXISTS `cand_photo_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cand_photo_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cand_id` varchar(900) DEFAULT NULL,
  `cand_photo` varchar(900) DEFAULT NULL,
  `cand_sign` varchar(900) DEFAULT NULL,
  `cand_thumb` varchar(900) DEFAULT NULL,
  `cand_finger` varchar(900) DEFAULT NULL,
  `last_modified_time` varchar(900) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cand_photo_details`
--

LOCK TABLES `cand_photo_details` WRITE;
/*!40000 ALTER TABLE `cand_photo_details` DISABLE KEYS */;
INSERT INTO `cand_photo_details` VALUES (2,'Ponm1','1616401549023WhatsApp Image 2021-03-19 at 20.38.12 (1).jpeg','1616401549024WhatsApp Image 2021-03-19 at 20.38.12 (2).jpeg','1616401549026WhatsApp Image 2021-03-19 at 20.38.12 (3).jpeg','1616401549071WhatsApp Image 2021-03-19 at 20.38.12 (5).jpeg','03/22/2021 13:55:49'),(3,'2','1616401916422WhatsApp Image 2021-03-19 at 20.38.12.jpeg','1616401916422WhatsApp Image 2021-03-19 at 20.38.12.jpeg','1616401916424WhatsApp Image 2021-03-19 at 20.38.12.jpeg','1616401916424WhatsApp Image 2021-03-19 at 20.38.12.jpeg','03/22/2021 14:01:56'),(4,'Priy1','1616425879942Priya.jpg','1616425879942priya_sign.jpg','1616425879943priya_thumb.jpg','1616425879944priya_finger.jpg','03/22/2021 20:41:19'),(5,'Devi1','1616478018980Notes-1615983100233.jpg','1616478018982pexels-sam-lion-5710224.jpg','1616478019033Admission.png','1616478019037Admission.png','03/23/2021 11:10:19'),(6,'Raja1','1616478447862Notes-1615983100233.jpg','1616478447864pexels-cottonbro-4039231.jpg','1616478447881pexels-meru-bi-6161662.jpg','1616478447921pexels-andrea-piacquadio-3775602.jpg','03/23/2021 11:17:27'),(7,'Ponm1','1617290100707Foto-Kontakt_cpa.jpg','1617290100707Foto-Kontakt_cpa.jpg','1617290100707Foto-Kontakt_cpa.jpg','1617290100708Foto-Kontakt_cpa.jpg','04/01/2021 20:45:00'),(8,'Ravi2','1617290655845medical-design (1).pdf','1617290655899output-onlinepngtools (2).png','1617290655899output-onlinepngtools (2).png','1617290655900output-onlinepngtools (2).png','04/01/2021 20:54:15'),(9,'Kris1','1617344822193output-onlinepngtools (2).png','1617344822193output-onlinepngtools (1).png','1617344822194output-onlinepngtools.png','1617344822194f16221e2bb2a763d864b7c77c3d3675c--sagittarius-tattoo-designs-sagittarius-love.jpg','04/02/2021 11:57:02'),(10,'Kris1','1617346029984output-onlinepngtools (2).png','1617346029985output-onlinepngtools (1).png','1617346029985output-onlinepngtools.png','1617346029985f16221e2bb2a763d864b7c77c3d3675c--sagittarius-tattoo-designs-sagittarius-love.jpg','04/02/2021 12:17:10'),(11,'Kris1','1617346137568output-onlinepngtools (2).png','1617346137569output-onlinepngtools (1).png','1617346137569output-onlinepngtools.png','1617346137569f16221e2bb2a763d864b7c77c3d3675c--sagittarius-tattoo-designs-sagittarius-love.jpg','04/02/2021 12:18:57'),(12,'Kris1','1617346176041output-onlinepngtools (2).png','1617346176042output-onlinepngtools (1).png','1617346176042output-onlinepngtools.png','1617346176042f16221e2bb2a763d864b7c77c3d3675c--sagittarius-tattoo-designs-sagittarius-love.jpg','04/02/2021 12:19:36'),(13,'Kala1','1617348121742best2.png','1617348121746output-onlinepngtools.png','1617348121746output-onlinepngtools (2).png','1617348121746output-onlinepngtools.png','04/02/2021 12:52:01'),(14,'Pala1','1617348276032output-onlinepngtools (2).png','1617348276032output-onlinepngtools (1).png','1617348276032output-onlinepngtools.png','1617348276033output-onlinepngtools (2).png','04/02/2021 12:54:36'),(15,'Pala2','1617349173683output-onlinepngtools (2).png','1617349173683output-onlinepngtools (1).png','1617349173683output-onlinepngtools.png','1617349173683output-onlinepngtools (2).png','04/02/2021 13:09:33'),(16,'Raja2','1617350605291output-onlinepngtools (1).png','1617350605291output-onlinepngtools.png','1617350605291output-onlinepngtools (2).png','1617350605291Sagittarius tattoos zodiac designs ideas  (29).jpg','04/02/2021 13:33:25'),(17,'Rame2','1617371130571Foto-Kontakt_cpa.jpg','1617371130572cart.png','16173711305729fc8d5b0252f123bec601916d456a4dc.png','1617371130573background.jpg','04/02/2021 19:15:30');
/*!40000 ALTER TABLE `cand_photo_details` ENABLE KEYS */;
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
