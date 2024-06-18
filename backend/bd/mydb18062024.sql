-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-06-2024 a las 12:55:28
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mydb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alergenos`
--

CREATE TABLE `alergenos` (
  `id_alergeno` int(11) NOT NULL,
  `tipo_alergeno` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alergenos`
--

INSERT INTO `alergenos` (`id_alergeno`, `tipo_alergeno`) VALUES
(1, 'Gluten'),
(2, 'Lactosa'),
(3, 'Frutos secos'),
(4, 'Vegano');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `casa`
--

CREATE TABLE `casa` (
  `id_casa` int(11) NOT NULL,
  `direccion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `casa`
--

INSERT INTO `casa` (`id_casa`, `direccion`) VALUES
(1, 'Calle Principal 123'),
(2, 'Avenida Central 456'),
(3, 'Plaza Mayor 789'),
(4, 'Calle capitan cortes'),
(5, 'pepe'),
(6, 'IES Ribera del tajo'),
(7, 'Av america');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(33) NOT NULL DEFAULT current_timestamp(),
  `apellido` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(200) NOT NULL,
  `rol` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombre`, `apellido`, `email`, `password`, `rol`) VALUES
(0, 'Valentino', 'Sanchez Raverta', 'vsanchez@yopmail.com', '51cb69e002770bcbb2f0616ff5196a573845e2ae927c7f2d67b1246ffd20c860', 0),
(1, 'Juan', 'Perez', 'juan@example.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 0),
(2, 'María ', 'García', 'maria@example.com', '68256910bc07ec7457bcb7f4374e43ab5c98eda8d8eb8e1e53d6e33a47e8afe3', 0),
(3, 'Valentino ', 'Sanchez', 'vsanchez@up-spain.com', '51cb69e002770bcbb2f0616ff5196a573845e2ae927c7f2d67b1246ffd20c860', 2),
(4, 'Chef Master', 'Sanchez', 'chefmaster@example.com', '51cb69e002770bcbb2f0616ff5196a573845e2ae927c7f2d67b1246ffd20c860', 1),
(5, 'Angie', 'Patarroyo', 'apatarroyo@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 0),
(6, 'Valentino', 'Sanchez Raverta', 'valentinosanchezraverta@gmail.com', '51cb69e002770bcbb2f0616ff5196a573845e2ae927c7f2d67b1246ffd20c860', 2),
(7, 'pepe', 'Sanchez Raverta', 'pepe@gmail.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_tiene_casa`
--

CREATE TABLE `cliente_tiene_casa` (
  `id_cliente` int(11) NOT NULL,
  `id_casa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente_tiene_casa`
--

INSERT INTO `cliente_tiene_casa` (`id_cliente`, `id_casa`) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3),
(4, 4),
(4, 7),
(5, 5),
(6, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cocineros`
--

CREATE TABLE `cocineros` (
  `id_cocineros` int(11) NOT NULL,
  `nombre` varchar(16) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `jefe_id_jefe` int(11) DEFAULT NULL,
  `cliente_id_cliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cocineros`
--

INSERT INTO `cocineros` (`id_cocineros`, `nombre`, `edad`, `jefe_id_jefe`, `cliente_id_cliente`) VALUES
(0, 'Chef Master', 25, NULL, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hamburguesa`
--

CREATE TABLE `hamburguesa` (
  `id_hamburguesa` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `descripcion` varchar(200) NOT NULL,
  `valor` float DEFAULT NULL,
  `coste` float DEFAULT NULL,
  `imagen` varchar(100) NOT NULL,
  `tiempo_prep` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hamburguesa`
--

INSERT INTO `hamburguesa` (`id_hamburguesa`, `nombre`, `tipo`, `descripcion`, `valor`, `coste`, `imagen`, `tiempo_prep`) VALUES
(1, 'Hamburguesa Clásica', 'Clásica', 'Una suculenta hamburguesa con carne jugosa, queso derretido, lechuga fresca y salsa especial en un pan tierno y tostado', 8.99, 3.5, './assets/images/hamb1.jpg', 10),
(2, 'Hamburguesa BBQ', 'BBQ', ' Deliciosa hamburguesa con salsa BBQ ahumada, cebolla caramelizada, bacon crujiente, queso cheddar fundido y pepinillos en un pan tostado.', 10.99, 4.2, './assets/images/hamb3.jpg', 15),
(3, 'Hamburguesa Vegana', 'Vegana', 'Hamburguesa vegana con rebozado crujiente de garbanzos, acompañada de aguacate, tomate, espinacas frescas y mayonesa vegana en un pan integral.', 9.99, 3.8, './assets/images/hamb2.jpg', 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hamburguesa_tiene_ingrediente`
--

CREATE TABLE `hamburguesa_tiene_ingrediente` (
  `ingrediente_id_ingrediente` int(11) NOT NULL,
  `hamburguesa_id_hamburguesa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hamburguesa_tiene_ingrediente`
--

INSERT INTO `hamburguesa_tiene_ingrediente` (`ingrediente_id_ingrediente`, `hamburguesa_id_hamburguesa`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(3, 1),
(3, 3),
(4, 2),
(5, 1),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(11, 3),
(12, 3),
(13, 1),
(14, 3),
(15, 3),
(16, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingrediente`
--

CREATE TABLE `ingrediente` (
  `id_ingrediente` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `kal` int(11) DEFAULT NULL,
  `alergenos_id_alergeno` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ingrediente`
--

INSERT INTO `ingrediente` (`id_ingrediente`, `nombre`, `kal`, `alergenos_id_alergeno`) VALUES
(1, 'Pan', 200, 1),
(2, 'Carne', 300, NULL),
(3, 'Lechuga', 10, NULL),
(4, 'queso', 10, 2),
(5, 'salsa especial', 10, 2),
(6, 'salsa bbq', 10, 2),
(7, 'bacon', 10, 1),
(8, 'cebolla caramelizada', 10, 1),
(9, 'pepinillos', 10, NULL),
(10, 'hamburguesa vegana', 10, 4),
(11, 'garbanzos', 10, 4),
(12, 'aguacate', 10, 4),
(13, 'tomate\r\n', 10, 4),
(14, 'espinacas\r\n', 10, 4),
(15, 'mayonesa vegana\r\n', 10, 4),
(16, 'pan integral\r\n', 10, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jefe`
--

CREATE TABLE `jefe` (
  `username` varchar(16) DEFAULT NULL,
  `id_jefe` int(11) NOT NULL DEFAULT current_timestamp(),
  `id_cliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `jefe`
--

INSERT INTO `jefe` (`username`, `id_jefe`, `id_cliente`) VALUES
('jefe_1', 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jefe_ve_log`
--

CREATE TABLE `jefe_ve_log` (
  `jefe_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `jefe_ve_log`
--

INSERT INTO `jefe_ve_log` (`jefe_id`, `category_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(1, 13),
(1, 14),
(1, 15),
(1, 16),
(1, 17),
(1, 18),
(1, 19),
(1, 20),
(1, 21),
(1, 22),
(1, 23),
(1, 24),
(1, 25),
(1, 26),
(1, 27),
(1, 28),
(1, 29),
(1, 30),
(1, 31),
(1, 32),
(1, 33),
(1, 34),
(1, 35),
(1, 36),
(1, 37),
(1, 38),
(1, 39),
(1, 40),
(1, 41),
(1, 42),
(1, 43),
(1, 45),
(1, 46);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log`
--

CREATE TABLE `log` (
  `category_id` int(11) NOT NULL,
  `id_log` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `contenido` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `log`
--

INSERT INTO `log` (`category_id`, `id_log`, `fecha`, `contenido`) VALUES
(1, 1, '2023-05-01', 'El Usuario Jefe comprueba si funciona el log'),
(2, 1, '2024-04-27', 'El pedido con id 7 se ha entregado de manera exitosa'),
(3, 1, '2024-04-27', 'El pedido con id 8 se ha entregado de manera exitosa'),
(4, 1, '2024-04-27', 'El pedido con id 8 se ha entregado de manera exitosa'),
(5, 1, '2024-05-28', 'El pedido con id 9 se ha entregado de manera exitosa'),
(6, 1, '2024-05-28', 'El pedido con id 10 ha sido creado'),
(7, 1, '2024-05-28', 'El pedido con id 10 se ha entregado de manera exitosa'),
(8, 1, '2024-05-28', 'El pedido con id 11 ha sido creado'),
(9, 1, '2024-05-28', 'El pedido con id 11 se ha entregado de manera exitosa'),
(10, 1, '2024-05-28', 'El pedido con id 12 ha sido creado'),
(11, 1, '2024-05-28', 'El pedido con id 13 ha sido creado'),
(12, 1, '2024-05-28', 'El pedido con id 12 se ha entregado de manera exitosa'),
(13, 1, '2024-05-28', 'El pedido con id 13 se ha entregado de manera exitosa'),
(14, 1, '2024-05-28', 'El pedido con id 14 ha sido creado'),
(15, 1, '2024-05-28', 'El pedido con id 14 se ha entregado de manera exitosa'),
(16, 1, '2024-05-28', 'El pedido con id 14 ha sido creado'),
(17, 1, '2024-05-28', 'El pedido con id 14 se ha entregado de manera exitosa'),
(18, 1, '2024-06-03', 'El pedido con id 15 ha sido creado'),
(19, 1, '2024-06-03', 'El pedido con id 15 se ha entregado de manera exitosa'),
(20, 1, '2024-06-03', 'El pedido con id 16 ha sido creado'),
(21, 1, '2024-06-03', 'El pedido con id 16 se ha entregado de manera exitosa'),
(22, 1, '2024-06-03', 'El pedido con id 17 ha sido creado'),
(23, 1, '2024-06-03', 'El pedido con id 17 se ha entregado de manera exitosa'),
(24, 1, '2024-06-04', 'El pedido con id 18 ha sido creado'),
(25, 1, '2024-06-04', 'El pedido con id 18 se ha entregado de manera exitosa'),
(26, 1, '2024-06-04', 'El pedido con id 19 ha sido creado'),
(27, 1, '2024-06-04', 'El pedido con id 19 se ha entregado de manera exitosa'),
(28, 1, '2024-06-04', 'El pedido con id 20 ha sido creado'),
(29, 1, '2024-06-04', 'El pedido con id 20 se ha entregado de manera exitosa'),
(30, 1, '2024-06-13', 'El pedido con id 21 ha sido creado'),
(31, 1, '2024-06-13', 'El pedido con id 21 se ha entregado de manera exitosa'),
(32, 1, '2024-06-13', 'El pedido con id 22 ha sido creado'),
(33, 1, '2024-06-13', 'El pedido con id 22 se ha entregado de manera exitosa'),
(34, 1, '2024-06-14', 'El pedido con id 23 ha sido creado'),
(35, 1, '2024-06-14', 'El pedido con id 23 se ha entregado de manera exitosa'),
(36, 1, '2024-06-14', 'El pedido con id 24 ha sido creado'),
(37, 1, '2024-06-14', 'El pedido con id 24 se ha entregado de manera exitosa'),
(38, 1, '2024-06-17', 'El pedido con id 25 ha sido creado'),
(39, 1, '2024-06-17', 'El pedido en la fecha 2024-06-17  se ha entregado de manera exitosa'),
(40, 1, '2024-06-17', 'El pedido con id 26 ha sido creado'),
(41, 1, '2024-06-17', 'El pedido en la fecha 2024-06-17  se ha entregado de manera exitosa'),
(42, 1, '2024-06-17', 'El pedido con id 27 ha sido creado'),
(43, 1, '2024-06-17', 'El pedido con id 28 ha sido creado'),
(44, 1, '2024-06-17', 'El pedido de coste 0 de  en la fecha 2024-06-17 se ha entregado de manera exitosa'),
(45, 1, '2024-06-17', 'El pedido con id 29 ha sido creado'),
(46, 1, '2024-06-17', 'El pedido de coste 9.99 de chefmaster@example.com en la fecha 2024-06-17 se ha entregado de manera exitosa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `coste` float DEFAULT NULL,
  `cliente_id_cliente` int(11) DEFAULT NULL,
  `casa_id_casa` int(11) DEFAULT NULL,
  `tipo_pago` varchar(50) NOT NULL,
  `fecha` date DEFAULT '2024-01-01',
  `entregado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `coste`, `cliente_id_cliente`, `casa_id_casa`, `tipo_pago`, `fecha`, `entregado`) VALUES
(1, 15.5, 1, 1, 'efectivo', '2024-01-01', 1),
(2, 12.25, 2, 2, 'tarjeta', '2024-01-02', 1),
(3, 18.75, 3, 3, 'efectivo', '2024-01-03', 1),
(4, 19.98, 3, 3, 'efectivo', '2024-02-04', 1),
(5, 8.99, 3, 3, 'efectivo', '2024-03-05', 1),
(6, 19.98, 3, 3, 'efectivo', '2024-03-06', 1),
(7, 8.99, 3, 3, 'efectivo', '2024-05-23', 1),
(8, 19.98, 3, 3, 'efectivo', '2024-05-27', 1),
(9, 8.99, 3, 3, 'efectivo', '2024-05-28', 1),
(10, 8.99, 4, 4, 'efectivo', '2024-05-28', 1),
(11, 8.99, 3, 3, 'efectivo', '2024-05-28', 1),
(12, 8.99, 3, 3, 'efectivo', '2024-05-28', 1),
(13, 8.99, 3, 4, 'efectivo', '2024-05-28', 1),
(14, 8.99, 3, 3, 'efectivo', '2024-05-28', 1),
(15, 8.99, 4, 4, 'efectivo', '2024-06-03', 1),
(16, 9.99, 4, 4, 'efectivo', '2024-06-03', 1),
(17, 28.97, 4, 4, 'efectivo', '2024-06-03', 1),
(18, 8.99, 3, 3, 'efectivo', '2024-06-04', 1),
(19, 19.98, 6, 6, 'efectivo', '2024-06-04', 1),
(20, 8.99, 6, 6, 'efectivo', '2024-06-04', 1),
(21, 17.98, 3, 3, 'efectivo', '2024-06-13', 1),
(22, 28.97, 7, 4, 'efectivo', '2024-06-13', 1),
(23, 29.97, 4, 4, 'efectivo', '2024-06-14', 1),
(24, 10.99, 3, 3, 'efectivo', '2024-06-14', 1),
(25, 8.99, 3, 3, 'efectivo', '2024-06-17', 1),
(26, 10.99, 4, 4, 'efectivo', '2024-06-17', 1),
(27, 9.99, 4, 4, 'efectivo', '2024-06-17', 1),
(28, 19.98, 4, 7, 'efectivo', '2024-06-17', 1),
(29, 9.99, 4, 7, 'efectivo', '2024-06-17', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_esta_hamburguesa`
--

CREATE TABLE `pedido_esta_hamburguesa` (
  `pedido_id_pedido` int(11) NOT NULL,
  `hamburguesa_id_hamburguesa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido_esta_hamburguesa`
--

INSERT INTO `pedido_esta_hamburguesa` (`pedido_id_pedido`, `hamburguesa_id_hamburguesa`) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 3),
(4, 1),
(4, 2),
(5, 1),
(6, 1),
(6, 2),
(7, 1),
(8, 1),
(8, 2),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 3),
(17, 1),
(17, 2),
(18, 1),
(19, 1),
(19, 2),
(20, 1),
(21, 1),
(22, 1),
(22, 2),
(23, 1),
(23, 2),
(23, 3),
(24, 2),
(25, 1),
(26, 2),
(27, 3),
(28, 3),
(29, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_has_cocineros`
--

CREATE TABLE `pedido_has_cocineros` (
  `pedido_id_pedido` int(11) NOT NULL,
  `cocineros_id_cocineros` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alergenos`
--
ALTER TABLE `alergenos`
  ADD PRIMARY KEY (`id_alergeno`);

--
-- Indices de la tabla `casa`
--
ALTER TABLE `casa`
  ADD PRIMARY KEY (`id_casa`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `cliente_tiene_casa`
--
ALTER TABLE `cliente_tiene_casa`
  ADD PRIMARY KEY (`id_cliente`,`id_casa`),
  ADD KEY `id_casa` (`id_casa`);

--
-- Indices de la tabla `cocineros`
--
ALTER TABLE `cocineros`
  ADD PRIMARY KEY (`id_cocineros`),
  ADD KEY `fk_cocineros_jefe1_idx` (`jefe_id_jefe`);

--
-- Indices de la tabla `hamburguesa`
--
ALTER TABLE `hamburguesa`
  ADD PRIMARY KEY (`id_hamburguesa`);

--
-- Indices de la tabla `hamburguesa_tiene_ingrediente`
--
ALTER TABLE `hamburguesa_tiene_ingrediente`
  ADD PRIMARY KEY (`ingrediente_id_ingrediente`,`hamburguesa_id_hamburguesa`),
  ADD KEY `fk_ingrediente_has_hamburguesa_hamburguesa1_idx` (`hamburguesa_id_hamburguesa`),
  ADD KEY `fk_ingrediente_has_hamburguesa_ingrediente1_idx` (`ingrediente_id_ingrediente`);

--
-- Indices de la tabla `ingrediente`
--
ALTER TABLE `ingrediente`
  ADD PRIMARY KEY (`id_ingrediente`),
  ADD KEY `fk_ingredientes_alergenos1_idx` (`alergenos_id_alergeno`);

--
-- Indices de la tabla `jefe`
--
ALTER TABLE `jefe`
  ADD PRIMARY KEY (`id_jefe`);

--
-- Indices de la tabla `jefe_ve_log`
--
ALTER TABLE `jefe_ve_log`
  ADD PRIMARY KEY (`jefe_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`category_id`,`id_log`),
  ADD KEY `idx_id_log` (`id_log`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `fk_pedido_cliente1_idx` (`cliente_id_cliente`),
  ADD KEY `fk_pedido_casa1_idx` (`casa_id_casa`);

--
-- Indices de la tabla `pedido_esta_hamburguesa`
--
ALTER TABLE `pedido_esta_hamburguesa`
  ADD PRIMARY KEY (`pedido_id_pedido`,`hamburguesa_id_hamburguesa`),
  ADD KEY `fk_pedido_esta_hamburguesa_pedido_idx` (`pedido_id_pedido`),
  ADD KEY `fk_pedido_esta_hamburguesa_hamburguesa_idx` (`hamburguesa_id_hamburguesa`);

--
-- Indices de la tabla `pedido_has_cocineros`
--
ALTER TABLE `pedido_has_cocineros`
  ADD PRIMARY KEY (`pedido_id_pedido`,`cocineros_id_cocineros`),
  ADD KEY `fk_pedido_has_cocineros_cocineros1_idx` (`cocineros_id_cocineros`),
  ADD KEY `fk_pedido_has_cocineros_pedido1_idx` (`pedido_id_pedido`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente_tiene_casa`
--
ALTER TABLE `cliente_tiene_casa`
  ADD CONSTRAINT `cliente_tiene_casa_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `cliente_tiene_casa_ibfk_2` FOREIGN KEY (`id_casa`) REFERENCES `casa` (`id_casa`);

--
-- Filtros para la tabla `cocineros`
--
ALTER TABLE `cocineros`
  ADD CONSTRAINT `fk_cocineros_jefe1` FOREIGN KEY (`jefe_id_jefe`) REFERENCES `jefe` (`id_jefe`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `hamburguesa_tiene_ingrediente`
--
ALTER TABLE `hamburguesa_tiene_ingrediente`
  ADD CONSTRAINT `fk_ingrediente_has_hamburguesa_hamburguesa1` FOREIGN KEY (`hamburguesa_id_hamburguesa`) REFERENCES `hamburguesa` (`id_hamburguesa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ingrediente_has_hamburguesa_ingrediente1` FOREIGN KEY (`ingrediente_id_ingrediente`) REFERENCES `ingrediente` (`id_ingrediente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ingrediente`
--
ALTER TABLE `ingrediente`
  ADD CONSTRAINT `fk_ingredientes_alergenos1` FOREIGN KEY (`alergenos_id_alergeno`) REFERENCES `alergenos` (`id_alergeno`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `jefe`
--
ALTER TABLE `jefe`
  ADD CONSTRAINT `fk_jefe_log1` FOREIGN KEY (`log_category_id`,`log_id_log`) REFERENCES `log` (`category_id`, `id_log`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `jefe_ve_log`
--
ALTER TABLE `jefe_ve_log`
  ADD CONSTRAINT `jefe_ve_log_ibfk_1` FOREIGN KEY (`jefe_id`) REFERENCES `jefe` (`id_jefe`),
  ADD CONSTRAINT `jefe_ve_log_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `log` (`category_id`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `fk_pedido_casa1` FOREIGN KEY (`casa_id_casa`) REFERENCES `casa` (`id_casa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pedido_cliente1` FOREIGN KEY (`cliente_id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pedido_esta_hamburguesa`
--
ALTER TABLE `pedido_esta_hamburguesa`
  ADD CONSTRAINT `fk_pedido_esta_hamburguesa_hamburguesa` FOREIGN KEY (`hamburguesa_id_hamburguesa`) REFERENCES `hamburguesa` (`id_hamburguesa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pedido_esta_hamburguesa_pedido` FOREIGN KEY (`pedido_id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pedido_has_cocineros`
--
ALTER TABLE `pedido_has_cocineros`
  ADD CONSTRAINT `fk_pedido_has_cocineros_cocineros1` FOREIGN KEY (`cocineros_id_cocineros`) REFERENCES `cocineros` (`id_cocineros`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pedido_has_cocineros_pedido1` FOREIGN KEY (`pedido_id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
