CREATE DATABASE  IF NOT EXISTS `shop` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shop`;
-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shop
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `BrandId` int NOT NULL AUTO_INCREMENT,
  `BrandName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`BrandId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'Marc'),(2,'Happy zoo'),(3,'Edini'),(4,'Dottie');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CategoryId` int NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(45) DEFAULT NULL,
  `ParentId` int DEFAULT NULL,
  PRIMARY KEY (`CategoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Men',0),(2,'T-shirts',1),(3,'Pants',1),(4,'Shirts',1),(5,'Accessories',1),(6,'Ladies',0),(7,'T-shirts',6),(8,'Skirts',6),(9,'Dresses',6),(10,'Shirts',6),(11,'Kids',0),(12,'T-shirts',11),(13,'Skirts',11),(14,'Pants',11),(15,'Accessories',11);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colour`
--

DROP TABLE IF EXISTS `colour`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colour` (
  `ColourId` int NOT NULL AUTO_INCREMENT,
  `CorlourName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ColourId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colour`
--

LOCK TABLES `colour` WRITE;
/*!40000 ALTER TABLE `colour` DISABLE KEYS */;
/*!40000 ALTER TABLE `colour` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `OrderId` int NOT NULL AUTO_INCREMENT,
  `CreatedDate` date NOT NULL DEFAULT (curdate()),
  `UpdatedDate` date DEFAULT (curdate()),
  `UserId` int DEFAULT NULL,
  `StatusId` int DEFAULT NULL,
  `SubTotal` int DEFAULT NULL,
  `Tax` int DEFAULT NULL,
  `ShippingCost` int DEFAULT '0',
  PRIMARY KEY (`OrderId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,'2020-05-28','2020-05-28',15,4,300,10,10),(2,'2020-05-28','2020-05-28',15,3,400,10,10),(3,'2020-05-28','2020-05-28',15,2,500,10,10);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetail` (
  `OrderDetailId` int NOT NULL AUTO_INCREMENT,
  `ProductDetailId` int DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `Discount` int DEFAULT NULL,
  `OrderId` int DEFAULT NULL,
  PRIMARY KEY (`OrderDetailId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

LOCK TABLES `orderdetail` WRITE;
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
INSERT INTO `orderdetail` VALUES (1,3,1,5,1),(2,6,1,NULL,1),(3,1,1,NULL,2);
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `ProductId` int NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(45) DEFAULT NULL,
  `Price` int DEFAULT NULL,
  `Image` varchar(100) DEFAULT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `Number` int DEFAULT NULL,
  `BrandId` int DEFAULT NULL,
  `CategoryId` int DEFAULT NULL,
  PRIMARY KEY (`ProductId`),
  KEY `FK_Product_Brand_BrandId_idx` (`BrandId`),
  CONSTRAINT `FK_Product_Brand_BrandId` FOREIGN KEY (`BrandId`) REFERENCES `brand` (`BrandId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (8,'Long dress',100,'/img/dress1.jpg','<p></p>                 <h4>Product details</h4>                 <p>White lace top, woven, has a round neck, short sleeves, has knitted lining attached</p>                 <h4>Material &amp; care</h4>                 <ul>                   <li>Polyester</li>                   <li>Machine wash</li>                 </ul>                 <h4>Size &amp; Fit</h4>                 <ul>                   <li>Regular fit</li>                   <li>The model (height 5\\\'8\" and chest 33\") is wearing a size S</li>                 </ul>                 <blockquote>                   <p><em>Define style this season with Armani\\\'s new range of trendy tops, crafted with intricate details. Create a chic statement look by teaming this lace number with skinny jeans and pumps.</em></p>                 </blockquote>',14,1,9),(9,'Babydoll top',52,'/img/product2.jpg','<p></p>                 <h4>Product details</h4>                 <p>White lace top, woven, has a round neck, short sleeves, has knitted lining attached</p>                 <h4>Material &amp; care</h4>                 <ul>                   <li>Polyester</li>                   <li>Machine wash</li>                 </ul>                 <h4>Size &amp; Fit</h4>                 <ul>                   <li>Regular fit</li>                   <li>The model (height 5\\\'8\" and chest 33\") is wearing a size S</li>                 </ul>                 <blockquote>                   <p><em>Define style this season with Armani\\\'s new range of trendy tops, crafted with intricate details. Create a chic statement look by teaming this lace number with skinny jeans and pumps.</em></p>                 </blockquote>',40,1,10),(10,'Midi dress',120,'/img/dress3.jpg','<p></p>                 <h4>Product details</h4>                 <p>White lace top, woven, has a round neck, short sleeves, has knitted lining attached</p>                 <h4>Material &amp; care</h4>                 <ul>                   <li>Polyester</li>                   <li>Machine wash</li>                 </ul>                 <h4>Size &amp; Fit</h4>                 <ul>                   <li>Regular fit</li>                   <li>The model (height 5\\\'8\" and chest 33\") is wearing a size S</li>                 </ul>                 <blockquote>                   <p><em>Define style this season with Armani\\\'s new range of trendy tops, crafted with intricate details. Create a chic statement look by teaming this lace number with skinny jeans and pumps.</em></p>                 </blockquote>',50,1,9),(11,'Cutie Maxi',120,'/img/dress4.jpg','<p></p>                 <h4>Product details</h4>                 <p>White lace top, woven, has a round neck, short sleeves, has knitted lining attached</p>                 <h4>Material &amp; care</h4>                 <ul>                   <li>Polyester</li>                   <li>Machine wash</li>                 </ul>                 <h4>Size &amp; Fit</h4>                 <ul>                   <li>Regular fit</li>                   <li>The model (height 5\\\'8\" and chest 33\") is wearing a size S</li>                 </ul>                 <blockquote>                   <p><em>Define style this season with Armani\\\'s new range of trendy tops, crafted with intricate details. Create a chic statement look by teaming this lace number with skinny jeans and pumps.</em></p>                 </blockquote>',56,1,9),(12,'Bodycon Dress',100,'/img/dress5.jpg','<p></p>                 <h4>Product details</h4>                 <p>White lace top, woven, has a round neck, short sleeves, has knitted lining attached</p>                 <h4>Material &amp; care</h4>                 <ul>                   <li>Polyester</li>                   <li>Machine wash</li>                 </ul>                 <h4>Size &amp; Fit</h4>                 <ul>                   <li>Regular fit</li>                   <li>The model (height 5\\\'8\" and chest 33\") is wearing a size S</li>                 </ul>                 <blockquote>                   <p><em>Define style this season with Armani\\\'s new range of trendy tops, crafted with intricate details. Create a chic statement look by teaming this lace number with skinny jeans and pumps.</em></p>                 </blockquote>',17,1,9),(13,'Cutout Dress',87,'/img/dress6.jpg','<p></p>                 <h4>Product details</h4>                 <p>White lace top, woven, has a round neck, short sleeves, has knitted lining attached</p>                 <h4>Material &amp; care</h4>                 <ul>                   <li>Polyester</li>                   <li>Machine wash</li>                 </ul>                 <h4>Size &amp; Fit</h4>                 <ul>                   <li>Regular fit</li>                   <li>The model (height 5\\\'8\" and chest 33\") is wearing a size S</li>                 </ul>                 <blockquote>                   <p><em>Define style this season with Armani\\\'s new range of trendy tops, crafted with intricate details. Create a chic statement look by teaming this lace number with skinny jeans and pumps.</em></p>                 </blockquote>',10,1,9),(14,'Đầm sheer phối ren 2 lớp',70,'/img/dress2.jpg','<p></p>                 <h4>Product details</h4>                 <p>White lace top, woven, has a round neck, short sleeves, has knitted lining attached</p>                 <h4>Material &amp; care</h4>                 <ul>                   <li>Polyester</li>                   <li>Machine wash</li>                 </ul>                 <h4>Size &amp; Fit</h4>                 <ul>                   <li>Regular fit</li>                   <li>The model (height 5\\\'8\" and chest 33\") is wearing a size S</li>                 </ul>                 <blockquote>                   <p><em>Define style this season with Armani\\\'s new range of trendy tops, crafted with intricate details. Create a chic statement look by teaming this lace number with skinny jeans and pumps.</em></p>                 </blockquote>',45,1,9),(15,'Summer dress',45,'/img/dress6.jpg','<p></p>                 <h4>Product details</h4>                 <p>White lace top, woven, has a round neck, short sleeves, has knitted lining attached</p>                 <h4>Material &amp; care</h4>                 <ul>                   <li>Polyester</li>                   <li>Machine wash</li>                 </ul>                 <h4>Size &amp; Fit</h4>                 <ul>                   <li>Regular fit</li>                   <li>The model (height 5\\\'8\" and chest 33\") is wearing a size S</li>                 </ul>                 <blockquote>                   <p><em>Define style this season with Armani\\\'s new range of trendy tops, crafted with intricate details. Create a chic statement look by teaming this lace number with skinny jeans and pumps.</em></p>                 </blockquote>',34,1,9);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productdetail`
--

DROP TABLE IF EXISTS `productdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productdetail` (
  `ProductDetailId` int NOT NULL AUTO_INCREMENT,
  `ProductId` int NOT NULL,
  `ColourId` int DEFAULT NULL,
  `SizeId` int DEFAULT NULL,
  `Number` int DEFAULT NULL,
  PRIMARY KEY (`ProductDetailId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productdetail`
--

LOCK TABLES `productdetail` WRITE;
/*!40000 ALTER TABLE `productdetail` DISABLE KEYS */;
INSERT INTO `productdetail` VALUES (1,8,NULL,3,10),(2,9,NULL,4,14),(3,10,NULL,3,11),(4,8,NULL,4,15),(5,8,NULL,5,11),(6,9,NULL,3,10);
/*!40000 ALTER TABLE `productdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `size`
--

DROP TABLE IF EXISTS `size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `size` (
  `SizeId` int NOT NULL AUTO_INCREMENT,
  `SizeName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`SizeId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `size`
--

LOCK TABLES `size` WRITE;
/*!40000 ALTER TABLE `size` DISABLE KEYS */;
INSERT INTO `size` VALUES (1,'XL'),(2,'XXL'),(3,'S'),(4,'M'),(5,'XS'),(6,'L');
/*!40000 ALTER TABLE `size` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserId` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `PhoneNumber` varchar(45) DEFAULT NULL,
  `LastName` varchar(45) DEFAULT NULL,
  `Birthdate` date DEFAULT NULL,
  `IsFemale` tinyint DEFAULT NULL,
  `Address` varchar(1000) DEFAULT NULL,
  `FacebookId` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `UserId_UNIQUE` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (15,'Thi','rubimeow96@gmail.com','$2b$10$10jmZUH/ay0Dv2sxCk2JM.eLEm80srenQYa3G0b5X/UxtrvQr8DCm',NULL,'Nguyen',NULL,NULL,'123 bla bla bla',NULL),(16,'Emanon','some@gmail.com','$2b$10$jpBOgWLmte2WHhXU6NufL.cxnmMB07Q885VdQCbn0ot5GRpb.ZtQa',NULL,'Kim','1996-06-17',NULL,'123 abcd efg',NULL),(17,'Apolo',NULL,NULL,NULL,'Ameno',NULL,NULL,NULL,'103628401392259');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-04 17:33:27
