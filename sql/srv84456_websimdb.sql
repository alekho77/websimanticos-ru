-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Host: mysql-srv84456.ht-systems.ru
-- Generation Time: Mar 08, 2019 at 02:33 PM
-- Server version: 5.6.42
-- PHP Version: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `srv84456_websimdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE IF NOT EXISTS `attributes` (
  `mid` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `value` varchar(255) NOT NULL,
  KEY `mid` (`mid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE IF NOT EXISTS `blocks` (
  `bid` int(11) NOT NULL AUTO_INCREMENT,
  `pagename` varchar(16) NOT NULL,
  `idx` int(11) DEFAULT NULL,
  `type` varchar(32) NOT NULL,
  PRIMARY KEY (`bid`),
  KEY `pagename` (`pagename`),
  KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `blocktypes`
--

CREATE TABLE IF NOT EXISTS `blocktypes` (
  `type` varchar(32) NOT NULL,
  PRIMARY KEY (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE IF NOT EXISTS `content` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `bid` int(11) NOT NULL,
  `innerHTML` text NOT NULL,
  PRIMARY KEY (`cid`),
  KEY `bid` (`bid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `metas`
--

CREATE TABLE IF NOT EXISTS `metas` (
  `mid` int(11) NOT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pagemetas`
--

CREATE TABLE IF NOT EXISTS `pagemetas` (
  `pagename` varchar(16) NOT NULL,
  `mid` int(11) NOT NULL,
  KEY `pagename` (`pagename`),
  KEY `mid` (`mid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE IF NOT EXISTS `pages` (
  `name` varchar(16) NOT NULL,
  `site` varchar(16) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT 'New page',
  PRIMARY KEY (`name`),
  KEY `site` (`site`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sitemetas`
--

CREATE TABLE IF NOT EXISTS `sitemetas` (
  `sitename` varchar(16) NOT NULL,
  `mid` int(11) NOT NULL,
  KEY `sitename` (`sitename`),
  KEY `mid` (`mid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sites`
--

CREATE TABLE IF NOT EXISTS `sites` (
  `name` varchar(16) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sites`
--

INSERT INTO `sites` (`name`, `icon`) VALUES
('websimru', 'href="/images/small-logo.png" type="image/png"');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attributes`
--
ALTER TABLE `attributes`
  ADD CONSTRAINT `attributes_ibfk_1` FOREIGN KEY (`mid`) REFERENCES `metas` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `blocks`
--
ALTER TABLE `blocks`
  ADD CONSTRAINT `blocks_ibfk_1` FOREIGN KEY (`pagename`) REFERENCES `pages` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `blocks_ibfk_2` FOREIGN KEY (`type`) REFERENCES `blocktypes` (`type`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `content`
--
ALTER TABLE `content`
  ADD CONSTRAINT `content_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `blocks` (`bid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pagemetas`
--
ALTER TABLE `pagemetas`
  ADD CONSTRAINT `pagemetas_ibfk_1` FOREIGN KEY (`pagename`) REFERENCES `pages` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pagemetas_ibfk_2` FOREIGN KEY (`mid`) REFERENCES `metas` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pages`
--
ALTER TABLE `pages`
  ADD CONSTRAINT `pages_ibfk_1` FOREIGN KEY (`site`) REFERENCES `sites` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sitemetas`
--
ALTER TABLE `sitemetas`
  ADD CONSTRAINT `sitemetas_ibfk_1` FOREIGN KEY (`sitename`) REFERENCES `sites` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sitemetas_ibfk_2` FOREIGN KEY (`mid`) REFERENCES `metas` (`mid`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
