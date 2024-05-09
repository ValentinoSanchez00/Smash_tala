-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-05-2024 a las 12:43:05
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
(3, 'Frutos secos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bebida`
--

CREATE TABLE `bebida` (
  `id_bebida` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `valor` float DEFAULT NULL,
  `coste` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bebida`
--

INSERT INTO `bebida` (`id_bebida`, `nombre`, `tipo`, `valor`, `coste`) VALUES
(1, 'Refresco de cola', 'Refresco', 2.5, 0.8),
(2, 'Agua mineral', 'Agua', 1.5, 0.4),
(3, 'Jugo de naranja', 'Jugo', 3, 1);

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
(3, 'Plaza Mayor 789');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(33) NOT NULL DEFAULT current_timestamp(),
  `email` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombre`, `email`, `password`) VALUES
(1, 'Juan Perez', 'juan@example.com', 'password123'),
(2, 'María García', 'maria@example.com', 'securepwd'),
(3, 'Carlos Rodríguez', 'carlos@example.com', 'mysecretpassword');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente_pide_pedido`
--

CREATE TABLE `cliente_pide_pedido` (
  `cliente_id_cliente` int(11) NOT NULL,
  `pedido_id_pedido` int(11) NOT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente_pide_pedido`
--

INSERT INTO `cliente_pide_pedido` (`cliente_id_cliente`, `pedido_id_pedido`, `fecha`) VALUES
(1, 1, '2024-05-01'),
(2, 2, '2024-05-02'),
(3, 3, '2024-05-03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cocineros`
--

CREATE TABLE `cocineros` (
  `id_cocineros` int(11) NOT NULL,
  `nombre` varchar(16) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `jefe_id_jefe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hamburguesa`
--

CREATE TABLE `hamburguesa` (
  `id_hamburguesa` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `valor` float DEFAULT NULL,
  `coste` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hamburguesa`
--

INSERT INTO `hamburguesa` (`id_hamburguesa`, `nombre`, `tipo`, `valor`, `coste`) VALUES
(1, 'Hamburguesa Clásica', 'Clásica', 8.99, 3.5),
(2, 'Hamburguesa BBQ', 'BBQ', 10.99, 4.2),
(3, 'Hamburguesa Vegana', 'Vegana', 9.99, 3.8);

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
(2, 2),
(3, 3);

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
(2, 'Carne de res', 300, NULL),
(3, 'Lechuga', 10, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jefe`
--

CREATE TABLE `jefe` (
  `username` varchar(16) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `id_jefe` int(11) NOT NULL DEFAULT current_timestamp(),
  `nombre` varchar(45) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `contraseña` varchar(45) DEFAULT NULL,
  `log_category_id` int(11) NOT NULL,
  `log_id_log` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `jefe`
--

INSERT INTO `jefe` (`username`, `email`, `password`, `id_jefe`, `nombre`, `correo`, `contraseña`, `log_category_id`, `log_id_log`) VALUES
('jefe_1', 'jefe1@example.com', 'password123', 2147483647, 'Jefe', 'jefe1@example.com', 'password123', 1, 1);

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
(1, 1, '2024-05-01', 'Registro 1'),
(2, 2, '2024-05-02', 'Registro 2'),
(3, 3, '2024-05-03', 'Registro 3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `coste` float DEFAULT NULL,
  `cliente_id_cliente` int(11) DEFAULT NULL,
  `casa_id_casa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `coste`, `cliente_id_cliente`, `casa_id_casa`) VALUES
(1, 15.5, 1, 1),
(2, 12.25, 2, 2),
(3, 18.75, 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido_esta_bebida`
--

CREATE TABLE `pedido_esta_bebida` (
  `pedido_id_pedido` int(11) NOT NULL,
  `bebida_id_bebida` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido_esta_bebida`
--

INSERT INTO `pedido_esta_bebida` (`pedido_id_pedido`, `bebida_id_bebida`) VALUES
(1, 1),
(2, 2),
(3, 3);

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
(3, 3);

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
-- Indices de la tabla `bebida`
--
ALTER TABLE `bebida`
  ADD PRIMARY KEY (`id_bebida`);

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
-- Indices de la tabla `cliente_pide_pedido`
--
ALTER TABLE `cliente_pide_pedido`
  ADD PRIMARY KEY (`cliente_id_cliente`,`pedido_id_pedido`),
  ADD KEY `fk_cliente_has_pedido_pedido1_idx` (`pedido_id_pedido`),
  ADD KEY `fk_cliente_has_pedido_cliente_idx` (`cliente_id_cliente`);

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
  ADD PRIMARY KEY (`id_jefe`,`log_category_id`,`log_id_log`),
  ADD KEY `fk_jefe_log1_idx` (`log_category_id`,`log_id_log`);

--
-- Indices de la tabla `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`category_id`,`id_log`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `fk_pedido_cliente1_idx` (`cliente_id_cliente`),
  ADD KEY `fk_pedido_casa1_idx` (`casa_id_casa`);

--
-- Indices de la tabla `pedido_esta_bebida`
--
ALTER TABLE `pedido_esta_bebida`
  ADD PRIMARY KEY (`pedido_id_pedido`,`bebida_id_bebida`),
  ADD KEY `fk_pedido_has_bebida_bebida1_idx` (`bebida_id_bebida`),
  ADD KEY `fk_pedido_has_bebida_pedido1_idx` (`pedido_id_pedido`);

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
-- Filtros para la tabla `cliente_pide_pedido`
--
ALTER TABLE `cliente_pide_pedido`
  ADD CONSTRAINT `fk_cliente_has_pedido_cliente` FOREIGN KEY (`cliente_id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_cliente_has_pedido_pedido1` FOREIGN KEY (`pedido_id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `fk_pedido_casa1` FOREIGN KEY (`casa_id_casa`) REFERENCES `casa` (`id_casa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pedido_cliente1` FOREIGN KEY (`cliente_id_cliente`) REFERENCES `cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pedido_esta_bebida`
--
ALTER TABLE `pedido_esta_bebida`
  ADD CONSTRAINT `fk_pedido_has_bebida_bebida1` FOREIGN KEY (`bebida_id_bebida`) REFERENCES `bebida` (`id_bebida`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pedido_has_bebida_pedido1` FOREIGN KEY (`pedido_id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
