-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13-Out-2019 às 17:47
-- Versão do servidor: 10.3.16-MariaDB
-- versão do PHP: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dearjohn`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `brb_orders`
--

CREATE TABLE `brb_orders` (
  `order_id` int(11) NOT NULL,
  `order_costumerId` int(11) NOT NULL,
  `order_employeeId` int(11) NOT NULL,
  `order_dateTime` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `order_price` varchar(10) NOT NULL,
  `order_items` varchar(100) DEFAULT NULL,
  `order_paymentId` int(11) NOT NULL,
  `order_serviceIds` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `brb_payments`
--

CREATE TABLE `brb_payments` (
  `payment_mode` varchar(20) NOT NULL,
  `payment_description` varchar(300) NOT NULL,
  `payment_value` varchar(10) NOT NULL,
  `payment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `brb_people`
--

CREATE TABLE `brb_people` (
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
-- Estrutura da tabela `brb_products`
--

CREATE TABLE `brb_products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_description` varchar(500) NOT NULL,
  `product_excerpt` varchar(200) DEFAULT NULL,
  `product_price` varchar(10) NOT NULL,
  `product_priceOff` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `brb_services`
--

CREATE TABLE `brb_services` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(100) NOT NULL,
  `service_parentId` int(11) NOT NULL,
  `service_active` tinyint(1) NOT NULL,
  `service_meanTime` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `brb_orders`
--
ALTER TABLE `brb_orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Índices para tabela `brb_products`
--
ALTER TABLE `brb_products`
  ADD PRIMARY KEY (`product_id`);

--
-- Índices para tabela `brb_services`
--
ALTER TABLE `brb_services`
  ADD PRIMARY KEY (`service_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `brb_orders`
--
ALTER TABLE `brb_orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `brb_products`
--
ALTER TABLE `brb_products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `brb_services`
--
ALTER TABLE `brb_services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
