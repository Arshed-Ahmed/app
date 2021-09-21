-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2021 at 09:32 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `safeenviro`
--

-- --------------------------------------------------------

--
-- Table structure for table `collectiondata`
--

CREATE TABLE `collectiondata` (
  `collectionid` int(100) NOT NULL,
  `collectionpoint` text NOT NULL,
  `collectedby` text NOT NULL,
  `wastetype` text NOT NULL,
  `collectingequipment` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `dateandtime` text NOT NULL,
  `tippingpoint` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `collectiondata`
--

INSERT INTO `collectiondata` (`collectionid`, `collectionpoint`, `collectedby`, `wastetype`, `collectingequipment`, `quantity`, `dateandtime`, `tippingpoint`) VALUES
(206, 'Colombo', 'Kamal', 'Food', 'Truck', 11, '18/09/2021 07:21 PM (GMT+5:30) Sri Jayawardenepura', ''),
(207, 'Colombo', 'Kamal', 'Food', 'Truck', 11, '18/09/2021 07:21 PM (GMT+5:30) Sri Jayawardenepura', ''),
(208, 'Colombo', 'Kamal', 'Food', 'Truck', 11, '18/09/2021 07:21 PM (GMT+5:30) Sri Jayawardenepura', '');

-- --------------------------------------------------------

--
-- Table structure for table `collectionform`
--

CREATE TABLE `collectionform` (
  `collectionid` int(100) NOT NULL,
  `collectionpoint` text NOT NULL,
  `collectedby` text NOT NULL,
  `wastetype` text NOT NULL,
  `collectingequipment` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `dateandtime` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reviewedform`
--

CREATE TABLE `reviewedform` (
  `id` int(100) NOT NULL,
  `collectionpoint` text NOT NULL,
  `collectedby` text NOT NULL,
  `wastetype` text NOT NULL,
  `collectingequipment` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `dateandtime` text NOT NULL,
  `tippingpoint` text NOT NULL,
  `blockId` text NOT NULL,
  `transactionHash` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reviewedform`
--

INSERT INTO `reviewedform` (`id`, `collectionpoint`, `collectedby`, `wastetype`, `collectingequipment`, `quantity`, `dateandtime`, `tippingpoint`, `blockId`, `transactionHash`) VALUES
(200, 'Mawnella', 'Atkin', 'Food', 'Bin', 52, '16/09/2021 06:24 PM (GMT+5:30) Sri Jayawardenepura', 'Puttalam', '11059896', '0x54aa87131dcc4b3c609df95c351df1ebdd617c84d6eeef45b82ae42370109d12'),
(201, 'Colombo', 'Kamal', 'Food', 'Bin', 11, '18/09/2021 07:21 PM (GMT+5:30) Sri Jayawardenepura', 'Colombo', '11065715', '0x0b4aaf441e343de998ffa3cc52eb988ba7595dcd8363e6f9d05d7676e4fbada7'),
(202, 'Puttalam', 'Kamal', 'Plastic', 'Truck', 23, '18/09/2021 07:21 PM (GMT+5:30) Sri Jayawardenepura', 'Colombo', '11065732', '0xee076ac604fe86d53862bfd04d630f07eb99520a600df0fa916253de344eb298'),
(203, 'Colombo', 'Kamal', 'Food', 'Truck', 0, '18/09/2021 07:21 PM (GMT+5:30) Sri Jayawardenepura', 'Puttalam', '11065732', '0xee076ac604fe86d53862bfd04d630f07eb99520a600df0fa916253de344eb298'),
(204, 'Colombo', 'Kamal', 'Food', 'Truck', 11, '18/09/2021 07:21 PM (GMT+5:30) Sri Jayawardenepura', 'colo', '11065750', '0x908fa998720a814a4bdee8046112443c3bf2f86c049c6388c3d0494da62698a9'),
(205, 'Kandy', 'Klaus', 'Food', 'Truck', 12, '13/09/2021 06:30 PM (GMT+5:30) Sri Jayawardenepura', 'col', '11066108', '0xe1780bc5c9a9d8f4c420821bb6fa668ed87e48838d24a88805a71d383d16c806');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` varchar(500) NOT NULL,
  `email` text NOT NULL DEFAULT '%@%',
  `type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `type`) VALUES
(2, 'Collector', '$2b$10$0atgTpaDmV0QYod/nxei0umC4DcwyBsMQ2VY7/ZmGq2FL54TfvIoq', 'safeenviro@co.uk', 'Collector'),
(1, 'Safe Enviro', '$2b$10$Nqj7IpucYFJli8eHdAZJcuL8oivMVIbFF.NM5jr2NJKP.VSrMZMqK', 'admin@safeenviro.com', 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `collectiondata`
--
ALTER TABLE `collectiondata`
  ADD PRIMARY KEY (`collectionid`);

--
-- Indexes for table `collectionform`
--
ALTER TABLE `collectionform`
  ADD PRIMARY KEY (`collectionid`);

--
-- Indexes for table `reviewedform`
--
ALTER TABLE `reviewedform`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`(200));

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `collectiondata`
--
ALTER TABLE `collectiondata`
  MODIFY `collectionid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=209;

--
-- AUTO_INCREMENT for table `collectionform`
--
ALTER TABLE `collectionform`
  MODIFY `collectionid` int(100) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
