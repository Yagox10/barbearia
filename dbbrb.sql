-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Erstellungszeit: 02. Nov 2019 um 10:40
-- Server-Version: 10.3.17-MariaDB-0+deb10u1
-- PHP-Version: 7.3.11-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `dbbrb`
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

--
-- Daten für Tabelle `brb_payments`
--

INSERT INTO `brb_payments` (`payment_id`, `payment_customerId`, `payment_employeeId`, `payment_mode`, `payment_description`, `payment_value`, `payment_date`) VALUES
(1, 3, 5, 'cash', 'Cabelo e barba', '20,00', '2019-10-26'),
(2, 2, 5, 'debit', 'Cabelo e barba', '25,00', '2019-10-26'),
(3, 2, 5, 'credit', 'Barba modelada e cabelo com pigmentação', '32,00', '2019-10-26');

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

--
-- Daten für Tabelle `brb_people`
--

INSERT INTO `brb_people` (`person_id`, `person_fullName`, `person_birthday`, `person_phone`, `person_email`, `person_address`, `person_scope`, `person_doc`) VALUES
(1, 'Nome', '2019-10-10', '219464805', 'djo@oodas.com', 'jdiasj idsjid a', 'customer', ''),
(2, 'Nome', '2019-10-10', '219464805', 'djo@oodas.com', 'jdiasj idsjid a', 'customer', ''),
(3, 'Nome do cliente', '2005-02-23', '21964470631', 'algum@email.com', 'algum endereço qualquer, 0 - Cetnro', 'customer', ''),
(4, 'Mais um', '2019-10-04', '2198000089', 'mais@um.com', 'endereço aqui agora', 'customer', ''),
(5, 'gf', '1990-02-10', '21999', 'z@b', 'endere dede ', 'employee', '');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `brb_products`
--

CREATE TABLE `brb_products` (
  `product_id` int(11) NOT NULL,
  `product_scope` varchar(15) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_description` varchar(500) NOT NULL,
  `product_stock` int(11) NOT NULL DEFAULT 0,
  `product_price` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `brb_products`
--

INSERT INTO `brb_products` (`product_id`, `product_scope`, `product_name`, `product_description`, `product_stock`, `product_price`) VALUES
(1, '', 'nome do prod', 'descr do prod', 0, '4,20'),
(2, '', 'Novo Produto', 'Esse produto é vendido aqui', 0, '13,00'),
(3, '', 'Cerveja Artesanal', 'Cerveja do Dear John', 0, '7,60');

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
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `brb_people`
--
ALTER TABLE `brb_people`
  MODIFY `person_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `brb_products`
--
ALTER TABLE `brb_products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `brb_services`
--
ALTER TABLE `brb_services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
