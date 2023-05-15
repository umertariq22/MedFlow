USE [master]
GO
/****** Object:  Database [med]    Script Date: 15/05/2023 6:04:31 pm ******/
CREATE DATABASE [med]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'med', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MEDFLOW\MSSQL\DATA\med.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'med_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MEDFLOW\MSSQL\DATA\med_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [med] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [med].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [med] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [med] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [med] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [med] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [med] SET ARITHABORT OFF 
GO
ALTER DATABASE [med] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [med] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [med] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [med] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [med] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [med] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [med] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [med] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [med] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [med] SET  DISABLE_BROKER 
GO
ALTER DATABASE [med] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [med] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [med] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [med] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [med] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [med] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [med] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [med] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [med] SET  MULTI_USER 
GO
ALTER DATABASE [med] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [med] SET DB_CHAINING OFF 
GO
ALTER DATABASE [med] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [med] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [med] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [med] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [med] SET QUERY_STORE = OFF
GO
USE [med]
GO
/****** Object:  Table [dbo].[Appointment]    Script Date: 15/05/2023 6:04:31 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Appointment](
	[appointment_id] [int] IDENTITY(1,1) NOT NULL,
	[patient_id] [int] NULL,
	[doctor_id] [int] NULL,
	[appointment_date] [datetime] NULL,
	[prescription] [varchar](500) NULL,
	[status] [varchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[appointment_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Doctor]    Script Date: 15/05/2023 6:04:31 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Doctor](
	[doctor_id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [varchar](50) NULL,
	[last_name] [varchar](50) NULL,
	[specialization] [int] NULL,
	[phone_number] [varchar](20) NULL,
	[email] [varchar](100) NULL,
	[address] [varchar](100) NULL,
	[password] [varchar](64) NULL,
	[description] [varchar](1000) NULL,
	[degree] [varchar](50) NULL,
	[fees] [int] NULL,
	[experience] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[doctor_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Patient]    Script Date: 15/05/2023 6:04:31 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Patient](
	[patient_id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [varchar](50) NULL,
	[last_name] [varchar](50) NULL,
	[date_of_birth] [date] NULL,
	[gender] [varchar](10) NULL,
	[address] [varchar](100) NULL,
	[phone_number] [varchar](20) NULL,
	[email] [varchar](100) NULL,
	[blood_type] [varchar](10) NULL,
	[password] [varchar](64) NULL,
PRIMARY KEY CLUSTERED 
(
	[patient_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[AppointmentDetails]    Script Date: 15/05/2023 6:04:31 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[AppointmentDetails]
AS
SELECT a.appointment_id, a.patient_id, p.first_name AS patient_first_name, p.last_name AS patient_last_name, 
       a.doctor_id, d.first_name AS doctor_first_name, d.last_name AS doctor_last_name, a.appointment_date, 
       a.prescription, a.status
FROM [dbo].[Appointment] AS a
JOIN [dbo].[Patient] AS p ON a.patient_id = p.patient_id
JOIN [dbo].[Doctor] AS d ON a.doctor_id = d.doctor_id;
GO
/****** Object:  Table [dbo].[Billing]    Script Date: 15/05/2023 6:04:31 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Billing](
	[billing_id] [int] IDENTITY(1,1) NOT NULL,
	[amount] [int] NULL,
	[status] [varchar](10) NULL,
	[doctor_id] [int] NULL,
	[patient_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[billing_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BloodDoner]    Script Date: 15/05/2023 6:04:31 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BloodDoner](
	[blood_bank_id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [varchar](25) NULL,
	[last_name] [varchar](25) NULL,
	[address] [varchar](100) NULL,
	[phone_number] [varchar](20) NULL,
	[email] [varchar](30) NULL,
	[blood_type] [varchar](3) NULL,
PRIMARY KEY CLUSTERED 
(
	[blood_bank_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Specialization]    Script Date: 15/05/2023 6:04:31 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Specialization](
	[spec_id] [int] IDENTITY(1,1) NOT NULL,
	[spec_name] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[spec_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Timings]    Script Date: 15/05/2023 6:04:31 pm ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Timings](
	[doctor_id] [int] NOT NULL,
	[timing_day] [varchar](10) NOT NULL,
	[start_time] [time](7) NULL,
	[end_time] [time](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[doctor_id] ASC,
	[timing_day] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[BloodDoner] ON 
GO
INSERT [dbo].[BloodDoner] ([blood_bank_id], [first_name], [last_name], [address], [phone_number], [email], [blood_type]) VALUES (3, N'Umer', N'Tariq', N'kdhakjfdakfhkjadnfkj', N'12345678912', N'bzohab@gmail.com', N'O-')
GO
SET IDENTITY_INSERT [dbo].[BloodDoner] OFF
GO
SET IDENTITY_INSERT [dbo].[Doctor] ON 
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (34, N'John', N'Doe', 1, N'555-1234', N'johndoe1@example.com', N'123 Main St', N'$2a$10$x2DsFa3sBbmfYFQg86ii3ubLhp.RZXwMrrLoTt942XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 200, 5)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (35, N'Jane', N'Smith', 1, N'555-5678', N'janesmith1@example.com', N'456 Elm St', N'$2a$10$x2DsFa3sBbmfYFQg86ii3ubLhp.RZXwMrrLoTt942XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 175, 3)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (36, N'Bob', N'Johnson', 1, N'555-2468', N'bobjohnson1@example.com', N'789 Oak St', N'$2a$10$x2DsFa3sBbmfYFQg86ii3ubLhp.RZXwMrrLoTt942XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'DO', 150, 2)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (37, N'Sarah', N'Lee', 1, N'555-3698', N'sarahlee1@example.com', N'987 Maple St', N'$2a$10$x2DsFa3sBbmfYFQg86ii3ubLhp.RZXwMrrLoTt942XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 225, 7)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (38, N'Tom', N'Brown', 2, N'555-1357', N'tombrown2@example.com', N'321 Pine St', N'$2a$10$x2DsFa3sBbmfYFQg86ii3ubLhp.RZXwMrrLoTt942XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'DO', 175, 4)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (39, N'Lisa', N'Davis', 2, N'555-2468', N'lisadavis2@example.com', N'654 Cedar St', N'$2a$10$x2DsFa3sBbmfYFQg86ii3ubLhp.RZXwMrrLoTt942XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 200, 6)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (40, N'Mike', N'Wilson', 2, N'555-3698', N'mikewilson2@example.com', N'987 Birch St', N'$2a$10$x2DsFa3sBbmfYFQg86ii3ubLhp.RZXwMrrLoTt942XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'DO', 150, 3)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (41, N'Emily', N'Brown', 2, N'555-7890', N'emilybrown2@example.com', N'753 Oak St', N'$2a$10$x2DsFa3sBbmfYFQg86ii3ubLhp.RZXwMrrLoTt942XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 225, 8)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (42, N'Tom', N'Brown', 3, N'555-1357', N'tombrown3@example.com', N'331 Pine St', N'$3a$10$x3DsFa3sBbmfYFQg86ii3ubLhp.RZXwMrrLoTt943XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'DO', 175, 4)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (43, N'Lisa', N'Davis', 3, N'555-3468', N'lisadavis3@example.com', N'654 Cedar St', N'$3a$10$x3DsFa3sBbmfYFQg86ii3ubLhp.RZXwMrrLoTt943XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 300, 6)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (44, N'Mike', N'Wilson', 3, N'555-3698', N'mikewilson3@example.com', N'987 Birch St', N'$3a$10$x3DsFa3sBbmfYFQg86ii3ubLhp.RZXwMrrLoTt943XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'DO', 150, 3)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (45, N'Emily', N'Brown', 3, N'555-7890', N'emilybrown3@example.com', N'753 Oak St', N'$3a$10$x3DsFa3sBbmfYFQg86ii3ubLhp.RZXwMrrLoTt943XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 335, 8)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (46, N'Tom', N'Brown', 4, N'555-1457', N'tombrown4@example.com', N'441 Pine St', N'$4a$10$x4DsFa4sBbmfYFQg86ii4ubLhp.RZXwMrrLoTt944XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'DO', 175, 4)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (47, N'Lisa', N'Davis', 4, N'555-4468', N'lisadavis4@example.com', N'654 Cedar St', N'$4a$10$x4DsFa4sBbmfYFQg86ii4ubLhp.RZXwMrrLoTt944XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 400, 6)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (48, N'Mike', N'Wilson', 4, N'555-4698', N'mikewilson4@example.com', N'987 Birch St', N'$4a$10$x4DsFa4sBbmfYFQg86ii4ubLhp.RZXwMrrLoTt944XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'DO', 150, 4)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (49, N'Emily', N'Brown', 4, N'555-7890', N'emilybrown4@example.com', N'754 Oak St', N'$4a$10$x4DsFa4sBbmfYFQg86ii4ubLhp.RZXwMrrLoTt944XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 445, 8)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (50, N'Tom', N'Brown', 5, N'555-1557', N'tombrown5@example.com', N'551 Pine St', N'$5a$10$x5DsFa5sBbmfYFQg86ii5ubLhp.RZXwMrrLoTt955XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'DO', 175, 5)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (51, N'Lisa', N'Davis', 5, N'555-5568', N'lisadavis5@example.com', N'655 Cedar St', N'$5a$10$x5DsFa5sBbmfYFQg86ii5ubLhp.RZXwMrrLoTt955XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 500, 6)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (52, N'Mike', N'Wilson', 5, N'555-5698', N'mikewilson5@example.com', N'987 Birch St', N'$5a$10$x5DsFa5sBbmfYFQg86ii5ubLhp.RZXwMrrLoTt955XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'DO', 150, 5)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (53, N'Emily', N'Brown', 5, N'555-7890', N'emilybrown5@example.com', N'755 Oak St', N'$5a$10$x5DsFa5sBbmfYFQg86ii5ubLhp.RZXwMrrLoTt955XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 555, 8)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (55, N'Tom', N'Brown', 6, N'666-1667', N'tombrown6@example.com', N'661 Pine St', N'$6a$10$x6DsFa6sBbmfYFQg86ii6ubLhp.RZXwMrrLoTt966XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'DO', 176, 6)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (56, N'Lisa', N'Davis', 6, N'666-6668', N'lisadavis6@example.com', N'666 Cedar St', N'$6a$10$x6DsFa6sBbmfYFQg86ii6ubLhp.RZXwMrrLoTt966XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 600, 6)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (57, N'Mike', N'Wilson', 6, N'666-6698', N'mikewilson6@example.com', N'987 Birch St', N'$6a$10$x6DsFa6sBbmfYFQg86ii6ubLhp.RZXwMrrLoTt966XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'DO', 160, 6)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (58, N'Emily', N'Brown', 6, N'666-7890', N'emilybrown6@example.com', N'766 Oak St', N'$6a$10$x6DsFa6sBbmfYFQg86ii6ubLhp.RZXwMrrLoTt966XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 666, 8)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (59, N'Tom', N'Brown', 7, N'777-1777', N'tombrown7@example.com', N'771 Pine St', N'$7a$10$x7DsFa7sBbmfYFQg87ii7ubLhp.RZXwMrrLoTt977XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'DO', 177, 7)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (60, N'Lisa', N'Davis', 7, N'777-7778', N'lisadavis7@example.com', N'777 Cedar St', N'$7a$10$x7DsFa7sBbmfYFQg87ii7ubLhp.RZXwMrrLoTt977XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 700, 7)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (61, N'Mike', N'Wilson', 7, N'777-7798', N'mikewilson7@example.com', N'987 Birch St', N'$7a$10$x7DsFa7sBbmfYFQg87ii7ubLhp.RZXwMrrLoTt977XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'DO', 170, 7)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (62, N'Emily', N'Brown', 7, N'777-7890', N'emilybrown7@example.com', N'777 Oak St', N'$7a$10$x7DsFa7sBbmfYFQg87ii7ubLhp.RZXwMrrLoTt977XPLxv8L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 777, 8)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (63, N'Tom', N'Brown', 10, N'999-1999', N'tombrown10@example.com', N'991 Pine St', N'$9a$10$x9DsFa9sBbmfYFQg99ii9ubLhp.RZXwMrrLoTt999XPLxv9L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'DO', 199, 9)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (64, N'Lisa', N'Davis', 10, N'999-9999', N'lisadavis10@example.com', N'999 Cedar St', N'$9a$10$x9DsFa9sBbmfYFQg99ii9ubLhp.RZXwMrrLoTt999XPLxv9L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 900, 9)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (65, N'Mike', N'Wilson', 10, N'999-9999', N'mikewilson10@example.com', N'999 Birch St', N'$9a$10$x9DsFa9sBbmfYFQg99ii9ubLhp.RZXwMrrLoTt999XPLxv9L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'DO', 190, 9)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (66, N'Emily', N'Brown', 10, N'999-9990', N'emilybrown10@example.com', N'999 Oak St', N'$9a$10$x9DsFa9sBbmfYFQg99ii9ubLhp.RZXwMrrLoTt999XPLxv9L0LTMS', N'As a doctor, I am committed to providing the best possible care to my patients. With years of experience in the field, I have gained expertise in diagnosing and treating a wide range of medical conditions. My approach to patient care is empathetic and personalized, where I take the time to understand each patients unique needs and develop a treatment plan accordingly. I believe in working collaboratively with my patients to ensure that they are well-informed about their health and can make informed decisions about their care. My goal is to help my patients achieve optimal health and well-being', N'MD', 999, 9)
GO
INSERT [dbo].[Doctor] ([doctor_id], [first_name], [last_name], [specialization], [phone_number], [email], [address], [password], [description], [degree], [fees], [experience]) VALUES (67, N'zbc', N'xyz', 1, N'13488888887', N'abc@zyx.adsd', N'jasjdnkjajk ', N'$2a$10$8lJg1lpT4OYla2U6Le2JSuPe4MmaDO77VWyB94dKrwzU/DaAQ7bY.', N'hdjabsj bka', N'fklnds h', 21212, 10)
GO
SET IDENTITY_INSERT [dbo].[Doctor] OFF
GO
SET IDENTITY_INSERT [dbo].[Patient] ON 
GO
INSERT [dbo].[Patient] ([patient_id], [first_name], [last_name], [date_of_birth], [gender], [address], [phone_number], [email], [blood_type], [password]) VALUES (4, N'John', N'Doe', CAST(N'1980-05-25' AS Date), N'Male', N'123 Main St, Anytown USA', N'123-456-7890', N'johndoe@gmail.com', N'A+', N'$2b$10$NtYYpqeb1A6RtBoi3X//Gue0FclKn8qAaRqmTISklz0IuJkceZM56')
GO
INSERT [dbo].[Patient] ([patient_id], [first_name], [last_name], [date_of_birth], [gender], [address], [phone_number], [email], [blood_type], [password]) VALUES (5, N'Jane', N'Doe', CAST(N'1985-07-15' AS Date), N'Female', N'456 Oak St, Anytown USA', N'555-555-5555', N'janedoe@yahoo.com', N'O-', N'$2b$10$NtYYpqeb1A6RtBoi3X//Gue0FclKn8qAaRqmTISklz0IuJkceZM56')
GO
INSERT [dbo].[Patient] ([patient_id], [first_name], [last_name], [date_of_birth], [gender], [address], [phone_number], [email], [blood_type], [password]) VALUES (6, N'Bob', N'Smith', CAST(N'1992-02-10' AS Date), N'Male', N'789 Pine St, Anytown USA', N'777-777-7777', N'bobsmith@hotmail.com', N'B+', N'$2b$10$NtYYpqeb1A6RtBoi3X//Gue0FclKn8qAaRqmTISklz0IuJkceZM56')
GO
INSERT [dbo].[Patient] ([patient_id], [first_name], [last_name], [date_of_birth], [gender], [address], [phone_number], [email], [blood_type], [password]) VALUES (7, N'Mary', N'Johnson', CAST(N'1977-11-01' AS Date), N'Female', N'321 Elm St, Anytown USA', N'999-999-9999', N'maryj@yahoo.com', N'AB-', N'$2b$10$NtYYpqeb1A6RtBoi3X//Gue0FclKn8qAaRqmTISklz0IuJkceZM56')
GO
INSERT [dbo].[Patient] ([patient_id], [first_name], [last_name], [date_of_birth], [gender], [address], [phone_number], [email], [blood_type], [password]) VALUES (8, N'David', N'Lee', CAST(N'1989-09-03' AS Date), N'Male', N'543 Maple St, Anytown USA', N'444-444-4444', N'davidlee@gmail.com', N'A-', N'$2b$10$NtYYpqeb1A6RtBoi3X//Gue0FclKn8qAaRqmTISklz0IuJkceZM56')
GO
INSERT [dbo].[Patient] ([patient_id], [first_name], [last_name], [date_of_birth], [gender], [address], [phone_number], [email], [blood_type], [password]) VALUES (15, N'jksahjk', N'jhdaskfjk', CAST(N'2019-06-18' AS Date), N'M', N'jdfhjkfhsdjkfb', N'12345678901', N'thh12@lf.ff', N'B+', N'$2a$10$TJtKVCRBJ8Jbxnu4rd8D2udpSY3gjpUWFyINGiGJweh9UKuzK.x6u')
GO
INSERT [dbo].[Patient] ([patient_id], [first_name], [last_name], [date_of_birth], [gender], [address], [phone_number], [email], [blood_type], [password]) VALUES (16, N'abc', N'def', CAST(N'2005-01-01' AS Date), N'M', N'dskljfmvklm', N'124567328479', N'abc@ff.dd', N'A+', N'$2a$10$/nE/Py/i4SU68yEZeK27be7hM9aiY..ReNecmfL7p1fwWIr1kpko2')
GO
INSERT [dbo].[Patient] ([patient_id], [first_name], [last_name], [date_of_birth], [gender], [address], [phone_number], [email], [blood_type], [password]) VALUES (17, N'abc', N'def', CAST(N'2004-11-30' AS Date), N'M', N'jasnjknjka vjk dandkjnakjc 1', N'134567312121', N'ashh@ff.ff', N'A+', N'$2a$10$Ix2/ROD9pvpzR/ZsljyFa.BbYaQtLZXRvyP.Znwtw3rPPxqyVp1R2')
GO
INSERT [dbo].[Patient] ([patient_id], [first_name], [last_name], [date_of_birth], [gender], [address], [phone_number], [email], [blood_type], [password]) VALUES (18, N'ABD', N'Dad', CAST(N'2021-01-01' AS Date), N'M', N'asdnjkansk', N'12345678908', N'abc@xyz.cc', N'A+', N'$2a$10$StNSEKvIHBdDOVB4BG7mV.2eRTM39uTBG/lVtuZHhxoziDQ2nT4SG')
GO
INSERT [dbo].[Patient] ([patient_id], [first_name], [last_name], [date_of_birth], [gender], [address], [phone_number], [email], [blood_type], [password]) VALUES (19, N'abc', N'xyz', CAST(N'2021-01-01' AS Date), N'M', N'jkfskjafhjksdb', N'12345678907', N'abc@xs.dd', N'A+', N'$2a$10$v/3e/NwYykDnT6GIWExxFeEWzGO1zI6p09./XhWxMD7Is0lPYkJDS')
GO
INSERT [dbo].[Patient] ([patient_id], [first_name], [last_name], [date_of_birth], [gender], [address], [phone_number], [email], [blood_type], [password]) VALUES (20, N'Mashhood', N'Ali', CAST(N'1970-12-12' AS Date), N'M', N'sdjfnj kfjkb', N'12345678906', N'mash@gg.dd', N'B-', N'$2a$10$35YkLYQLoJUm0bcRNOSQ8.LZ1KVNNw2XRRDOmJpYA0udbS3TQdjoG')
GO
SET IDENTITY_INSERT [dbo].[Patient] OFF
GO
SET IDENTITY_INSERT [dbo].[Specialization] ON 
GO
INSERT [dbo].[Specialization] ([spec_id], [spec_name]) VALUES (1, N'Cardiology')
GO
INSERT [dbo].[Specialization] ([spec_id], [spec_name]) VALUES (2, N'Dermatology')
GO
INSERT [dbo].[Specialization] ([spec_id], [spec_name]) VALUES (3, N'Endocrinology')
GO
INSERT [dbo].[Specialization] ([spec_id], [spec_name]) VALUES (4, N'Gastroenterology')
GO
INSERT [dbo].[Specialization] ([spec_id], [spec_name]) VALUES (5, N'Hematology')
GO
INSERT [dbo].[Specialization] ([spec_id], [spec_name]) VALUES (6, N'Infectious Disease')
GO
INSERT [dbo].[Specialization] ([spec_id], [spec_name]) VALUES (7, N'Neurology')
GO
INSERT [dbo].[Specialization] ([spec_id], [spec_name]) VALUES (8, N'Oncology')
GO
INSERT [dbo].[Specialization] ([spec_id], [spec_name]) VALUES (9, N'Orthopedics')
GO
INSERT [dbo].[Specialization] ([spec_id], [spec_name]) VALUES (10, N'Pediatrics')
GO
SET IDENTITY_INSERT [dbo].[Specialization] OFF
GO
/****** Object:  Index [UQ__Appointm__F014EDC6F9BB00B0]    Script Date: 15/05/2023 6:04:31 pm ******/
ALTER TABLE [dbo].[Appointment] ADD UNIQUE NONCLUSTERED 
(
	[patient_id] ASC,
	[doctor_id] ASC,
	[appointment_date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__BloodDon__AB6E61643D4981CD]    Script Date: 15/05/2023 6:04:31 pm ******/
ALTER TABLE [dbo].[BloodDoner] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Doctor__AB6E61641D99B3B2]    Script Date: 15/05/2023 6:04:31 pm ******/
ALTER TABLE [dbo].[Doctor] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Patient__AB6E616452D797F4]    Script Date: 15/05/2023 6:04:31 pm ******/
ALTER TABLE [dbo].[Patient] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Patient__AB6E6164FFEFFD87]    Script Date: 15/05/2023 6:04:31 pm ******/
ALTER TABLE [dbo].[Patient] ADD UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Appointment]  WITH CHECK ADD FOREIGN KEY([doctor_id])
REFERENCES [dbo].[Doctor] ([doctor_id])
GO
ALTER TABLE [dbo].[Appointment]  WITH CHECK ADD FOREIGN KEY([patient_id])
REFERENCES [dbo].[Patient] ([patient_id])
GO
ALTER TABLE [dbo].[Billing]  WITH CHECK ADD FOREIGN KEY([doctor_id])
REFERENCES [dbo].[Doctor] ([doctor_id])
GO
ALTER TABLE [dbo].[Billing]  WITH CHECK ADD FOREIGN KEY([patient_id])
REFERENCES [dbo].[Patient] ([patient_id])
GO
ALTER TABLE [dbo].[Doctor]  WITH CHECK ADD FOREIGN KEY([specialization])
REFERENCES [dbo].[Specialization] ([spec_id])
GO
ALTER TABLE [dbo].[Timings]  WITH CHECK ADD FOREIGN KEY([doctor_id])
REFERENCES [dbo].[Doctor] ([doctor_id])
GO
USE [master]
GO
ALTER DATABASE [med] SET  READ_WRITE 
GO
