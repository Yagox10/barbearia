-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 30. Okt 2019 um 10:52
-- Server-Version: 10.3.17-MariaDB-0+deb10u1
-- PHP-Version: 7.3.9-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `dearjohn`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `brb_payments`
--

CREATE TABLE `brb_payments` (
  `payment_id` int(11) NOT NULL,
  `payment_customerId` int(11) NOT NULL,
  `payment_employeeId` int(11) NOT NULL,
  `payment_mode` varchar(20) NOT NULL,
  `payment_description` varchar(300) NOT NULL,
  `payment_value` varchar(10) NOT NULL,
  `payment_date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `brb_people`
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
-- Tabellenstruktur für Tabelle `brb_products`
--

CREATE TABLE `brb_products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_description` varchar(500) NOT NULL,
  `product_stock` int(11) NOT NULL DEFAULT 0,
  `product_price` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `brb_services`
--

CREATE TABLE `brb_services` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `service_active` tinyint(1) NOT NULL,
  `service_meanTime` varchar(8) DEFAULT NULL,
  `service_price` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `brb_payments`
--
ALTER TABLE `brb_payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indizes für die Tabelle `brb_people`
--
ALTER TABLE `brb_people`
  ADD PRIMARY KEY (`person_id`);

--
-- Indizes für die Tabelle `brb_products`
--
ALTER TABLE `brb_products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indizes für die Tabelle `brb_services`
--
ALTER TABLE `brb_services`
  ADD PRIMARY KEY (`service_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `brb_payments`
--
ALTER TABLE `brb_payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `brb_people`
--
ALTER TABLE `brb_people`
  MODIFY `person_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `brb_products`
--
ALTER TABLE `brb_products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `brb_services`
--
ALTER TABLE `brb_services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
