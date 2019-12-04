-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 04, 2019 at 06:08 PM
-- Server version: 10.3.18-MariaDB-0+deb10u1
-- PHP Version: 7.3.11-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dearjohn`
--

-- --------------------------------------------------------

--
-- Table structure for table `brb_payments`
--

CREATE TABLE `brb_payments` (
  `payment_id` int(11) NOT NULL,
  `payment_customerId` varchar(100) NOT NULL,
  `payment_employeeId` varchar(100) NOT NULL,
  `payment_service` varchar(150) NOT NULL,
  `payment_mode` varchar(20) NOT NULL,
  `payment_description` varchar(300) NOT NULL,
  `payment_value` varchar(10) NOT NULL,
  `payment_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `brb_people`
--

CREATE TABLE `brb_people` (
  `person_id` int(11) NOT NULL,
  `person_fullName` varchar(100) NOT NULL,
  `person_birthday` date NOT NULL,
  `person_phone` varchar(15) NOT NULL,
  `person_email` varchar(100) NOT NULL,
  `person_address` varchar(200) NOT NULL,
  `person_scope` varchar(20) NOT NULL,
  `person_doc` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `brb_products`
--

CREATE TABLE `brb_products` (
  `product_id` int(11) NOT NULL,
  `product_scope` varchar(15) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_description` varchar(500) NOT NULL,
  `product_stock` int(11) NOT NULL DEFAULT 0,
  `product_price` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `brb_services`
--

CREATE TABLE `brb_services` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `service_active` tinyint(1) NOT NULL,
  `service_meanTime` varchar(8) DEFAULT NULL,
  `service_price` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brb_payments`
--
ALTER TABLE `brb_payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `brb_people`
--
ALTER TABLE `brb_people`
  ADD PRIMARY KEY (`person_id`);

--
-- Indexes for table `brb_products`
--
ALTER TABLE `brb_products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `brb_services`
--
ALTER TABLE `brb_services`
  ADD PRIMARY KEY (`service_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brb_payments`
--
ALTER TABLE `brb_payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `brb_people`
--
ALTER TABLE `brb_people`
  MODIFY `person_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `brb_products`
--
ALTER TABLE `brb_products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `brb_services`
--
ALTER TABLE `brb_services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
