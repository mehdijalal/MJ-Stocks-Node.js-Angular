
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[IAP].[AA_Resource]') AND type in (N'U'))
ALTER TABLE [IAP].[AA_Resource] DROP CONSTRAINT IF EXISTS [FK_Resources_ST_Status]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[IAP].[AA_Resource]') AND type in (N'U'))
ALTER TABLE [IAP].[AA_Resource] DROP CONSTRAINT IF EXISTS [FK_Resources_ST_Source]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[IAP].[AA_Newsfeed]') AND type in (N'U'))
ALTER TABLE [IAP].[AA_Newsfeed] DROP CONSTRAINT IF EXISTS [FK_Newsfeed_ST_Status]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[IAP].[AA_Lookup_Province]') AND type in (N'U'))
ALTER TABLE [IAP].[AA_Lookup_Province] DROP CONSTRAINT IF EXISTS [FK_Lookup_Provinces_Lookup_Countries]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[IAP].[AA_Announcement]') AND type in (N'U'))
ALTER TABLE [IAP].[AA_Announcement] DROP CONSTRAINT IF EXISTS [FK_Announcements_ST_Status]
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[IAP].[AA_Newsfeed]') AND type in (N'U'))
ALTER TABLE [IAP].[AA_Newsfeed] DROP CONSTRAINT IF EXISTS [DF_AA_Newsfeed_IsPublished]
GO
/****** Object:  Table [IAP].[AA_Resource]    Script Date: 2020-03-16 8:28:57 AM ******/
DROP TABLE IF EXISTS [IAP].[AA_Resource]
GO
/****** Object:  Table [IAP].[AA_RequestForMaterial]    Script Date: 2020-03-16 8:28:57 AM ******/
DROP TABLE IF EXISTS [IAP].[AA_RequestForMaterial]
GO
/****** Object:  Table [IAP].[AA_Newsfeed]    Script Date: 2020-03-16 8:28:57 AM ******/
DROP TABLE IF EXISTS [IAP].[AA_Newsfeed]
GO
/****** Object:  Table [IAP].[AA_Lookup_Status]    Script Date: 2020-03-16 8:28:57 AM ******/
DROP TABLE IF EXISTS [IAP].[AA_Lookup_Status]
GO
/****** Object:  Table [IAP].[AA_Lookup_Source]    Script Date: 2020-03-16 8:28:57 AM ******/
DROP TABLE IF EXISTS [IAP].[AA_Lookup_Source]
GO
/****** Object:  Table [IAP].[AA_Lookup_Province]    Script Date: 2020-03-16 8:28:57 AM ******/
DROP TABLE IF EXISTS [IAP].[AA_Lookup_Province]
GO
/****** Object:  Table [IAP].[AA_Lookup_Priority]    Script Date: 2020-03-16 8:28:57 AM ******/
DROP TABLE IF EXISTS [IAP].[AA_Lookup_Priority]
GO
/****** Object:  Table [IAP].[AA_Lookup_Country]    Script Date: 2020-03-16 8:28:57 AM ******/
DROP TABLE IF EXISTS [IAP].[AA_Lookup_Country]
GO
/****** Object:  Table [IAP].[AA_ErrorsLog]    Script Date: 2020-03-16 8:28:57 AM ******/
DROP TABLE IF EXISTS [IAP].[AA_ErrorsLog]
GO
/****** Object:  Table [IAP].[AA_Announcement]    Script Date: 2020-03-16 8:28:57 AM ******/
DROP TABLE IF EXISTS [IAP].[AA_Announcement]
GO
/****** Object:  Table [IAP].[AA_ProtectedAPI]   Script Date: 2020-03-16 8:28:57 AM ******/
DROP TABLE IF EXISTS [IAP].[AA_ProtectedAPI]
GO
/****** Object:  Table [IAP].[IWA_Admin_Access]  Script Date: 2020-03-16 8:28:57 AM ******/
DROP TABLE IF EXISTS [IAP].[IWA_Admin_Access]
GO
/****** Object:  Table [IAP].[AA_Announcement]    Script Date: 2020-03-16 8:28:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[AA_Announcement](
	[AnnouncementID] [int] IDENTITY(1,1) NOT NULL,
	[StatusID] [int] NULL,
	[Title] [varchar](255) NULL,
	[PublishedFrom] [datetime] NULL,
	[PublishedTo] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [varchar](255) NULL,
	[AnnouncementContent] [varchar](max) NULL,
	[IsDeleted] [bit] NULL,
	[IsVisible] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [varchar](255) NULL,
	[Priority] [int] NULL,
 CONSTRAINT [PK_Announcements] PRIMARY KEY CLUSTERED 
(
	[AnnouncementID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [IAP].[AA_ErrorsLog]    Script Date: 2020-03-16 8:28:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[AA_ErrorsLog](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ErrorMessage] [nvarchar](max) NULL,
	[ErrorStack] [nvarchar](max) NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [nvarchar](255) NULL,
	[ErrorCode] [nvarchar](255) NULL,
 CONSTRAINT [PK_ErrorsLog] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [IAP].[AA_Lookup_Country]    Script Date: 2020-03-16 8:28:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[AA_Lookup_Country](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](3) NOT NULL,
	[Name] [varchar](255) NOT NULL,
 CONSTRAINT [PK_Lookup_Countries] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [IAP].[AA_Lookup_Priority]    Script Date: 2020-03-16 8:28:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[AA_Lookup_Priority](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](15) NULL,
 CONSTRAINT [PK_ST_Priority] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [IAP].[AA_Lookup_Province]    Script Date: 2020-03-16 8:28:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[AA_Lookup_Province](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Code] [varchar](32) NOT NULL,
	[Name] [varchar](255) NOT NULL,
	[CountryID] [int] NOT NULL,
 CONSTRAINT [PK_Lookup_Provinces] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [IAP].[AA_Lookup_Source]    Script Date: 2020-03-16 8:28:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[AA_Lookup_Source](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](20) NULL,
 CONSTRAINT [PK_ST_Source] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [IAP].[AA_Lookup_Status]    Script Date: 2020-03-16 8:28:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[AA_Lookup_Status](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](15) NULL,
 CONSTRAINT [PK_ST_Status] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [IAP].[AA_Newsfeed]    Script Date: 2020-03-16 8:28:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[AA_Newsfeed](
	[NewsfeedID] [int] IDENTITY(1,1) NOT NULL,
	[StatusID] [int] NULL,
	[Title] [varchar](255) NULL,
	[IsDeleted] [bit] NULL,
	[Headline] [varchar](255) NULL,
	[NewsfeedContent] [varchar](max) NULL,
	[IsVisible] [bit] NULL,
	[PublishedDate] [datetime] NULL,
	[IsPublished] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [varchar](255) NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [varchar](255) NULL,
 CONSTRAINT [PK_Newsfeed] PRIMARY KEY CLUSTERED 
(
	[NewsfeedID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [IAP].[AA_RequestForMaterial]    Script Date: 2020-03-16 8:28:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[AA_RequestForMaterial](
	[RequestID] [int] IDENTITY(1,1) NOT NULL,
	[ProgramList] [varchar](255) NULL,
	[EnglishLanguageInstitute] [varchar](255) NULL,
	[FirstName] [varchar](255) NULL,
	[LastName] [varchar](255) NULL,
	[EmailAddress] [varchar](255) NULL,
	[AddressLine1] [varchar](255) NULL,
	[AddressLine2] [varchar](255) NULL,
	[CountryID] [int] NOT NULL,
	[ProvinceID] [int] NULL,
	[City] [varchar](255) NULL,
	[RequestedBy] [varchar](255) NULL,
	[RequestedDate] [datetime] NULL,
	[PostalCode] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [IAP].[AA_Resource]    Script Date: 2020-03-16 8:28:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[AA_Resource](
	[ResourceID] [int] IDENTITY(1,1) NOT NULL,
	[StatusID] [int] NULL,
	[DisplayName] [varchar](255) NULL,
	[SourceID] [int] NULL,
	[PublishedDate] [datetime] NULL,
	[Description] [varchar](8000) NULL,
	[Link] [varchar](250) NULL,
	[IsDeleted] [bit] NULL,
	[IsVisible] [bit] NULL,
	[IsPublished] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [varchar](255) NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [varchar](255) NULL,
	[Priority] [int] NULL,
	[FileName] [varchar](255) NULL,
 CONSTRAINT [PK_Resources] PRIMARY KEY CLUSTERED 
(
	[ResourceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [IAP].[AA_ProtectedAPI]    Script Date: 2020-03-24 11:20:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[AA_ProtectedAPI](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](256) NOT NULL,
	[ApiAddress] [nvarchar](256) NOT NULL,
 CONSTRAINT [PK_IAP.AA_ProtectedAPI] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [IAP].[IWA_Admin_Access]   Script Date: 2020-03-24 11:20:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [IAP].[IWA_Admin_Access] (
    [IWA_EMAIL]       VARCHAR (250) NOT NULL,
    [IWA_ACCESS_TYPE] VARCHAR (10)  NOT NULL
);
GO

ALTER TABLE [IAP].[AA_Newsfeed] ADD  CONSTRAINT [DF_AA_Newsfeed_IsPublished]  DEFAULT ((0)) FOR [IsPublished]
GO
ALTER TABLE [IAP].[AA_Announcement]  WITH CHECK ADD  CONSTRAINT [FK_Announcements_ST_Status] FOREIGN KEY([StatusID])
REFERENCES [IAP].[AA_Lookup_Status] ([ID])
GO
ALTER TABLE [IAP].[AA_Announcement] CHECK CONSTRAINT [FK_Announcements_ST_Status]
GO
ALTER TABLE [IAP].[AA_Lookup_Province]  WITH CHECK ADD  CONSTRAINT [FK_Lookup_Provinces_Lookup_Countries] FOREIGN KEY([CountryID])
REFERENCES [IAP].[AA_Lookup_Country] ([ID])
GO
ALTER TABLE [IAP].[AA_Lookup_Province] CHECK CONSTRAINT [FK_Lookup_Provinces_Lookup_Countries]
GO
ALTER TABLE [IAP].[AA_Newsfeed]  WITH CHECK ADD  CONSTRAINT [FK_Newsfeed_ST_Status] FOREIGN KEY([StatusID])
REFERENCES [IAP].[AA_Lookup_Status] ([ID])
GO
ALTER TABLE [IAP].[AA_Newsfeed] CHECK CONSTRAINT [FK_Newsfeed_ST_Status]
GO
ALTER TABLE [IAP].[AA_Resource]  WITH CHECK ADD  CONSTRAINT [FK_Resources_ST_Source] FOREIGN KEY([SourceID])
REFERENCES [IAP].[AA_Lookup_Source] ([ID])
GO
ALTER TABLE [IAP].[AA_Resource] CHECK CONSTRAINT [FK_Resources_ST_Source]
GO
ALTER TABLE [IAP].[AA_Resource]  WITH CHECK ADD  CONSTRAINT [FK_Resources_ST_Status] FOREIGN KEY([StatusID])
REFERENCES [IAP].[AA_Lookup_Status] ([ID])
GO
ALTER TABLE [IAP].[AA_Resource] CHECK CONSTRAINT [FK_Resources_ST_Status]
GO
