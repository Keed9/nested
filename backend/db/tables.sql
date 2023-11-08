
CREATE DATABASE NESTED;

USE NESTED;

DROP TABLE IF EXISTS NESTED.ADDRESSES;
CREATE TABLE NESTED.ADDRESSES(
    A_UID               VARCHAR(150) PRIMARY KEY NOT NULL COMMENT "ADDRESS UNIQUE ID",
    A_AVENUE            VARCHAR(150) NOT NULL COMMENT "ADDRESS AVENUE",
    A_EXT_NUMBER        VARCHAR(4) NOT NULL COMMENT "ADDRESS EXTERIOR NUMBER",
    A_INT_NUMBER        VARCHAR(4) DEFAULT 'NONE' COMMENT "ADDRESS INTERIOR NUMBER",
    A_CITY              VARCHAR(150) NOT NULL COMMENT "ADDRESS CITY",
    A_STATE             VARCHAR(150) NOT NULL COMMENT "ADDRESS STATE",
    A_COUNTRY           VARCHAR(150) NOT NULL COMMENT "ADDRESS COUNTRY"
);

#INSERT ADMIN ADDRESS
INSERT INTO NESTED.ADDRESSES VALUES(
    UUID(),
    'AV INDEPENDENCIA',
    '133',
    '',
    'APODACA',
    'NUEVO LEON',
    'MEXICO'
)

DROP TABLE IF EXISTS NESTED.USER_TYPES;
CREATE TABLE NESTED.USER_TYPES(
    U_TYPE          CHAR(1) PRIMARY KEY NOT NULL COMMENT "USER TYPE ID",
    U_TYPE_DESC     VARCHAR(25) NOT NULL COMMENT "USER TYPE DESCRIPTION"
);

DROP TABLE IF EXISTS NESTED.USER_STATUS;
CREATE TABLE NESTED.USER_STATUS(
    U_STATUS     CHAR(1) PRIMARY KEY NOT NULL COMMENT "USER STATUS",
    U_STATUS_DESC   VARCHAR(25) NOT NULL COMMENT "USER STATUS DESCRIPTION"
);

DELETE FROM NESTED.USER_STATUS;
INSERT INTO NESTED.USER_STATUS VALUES("A", "ACTIVE"), ("D", "DOWNED");

DELETE FROM NESTED.USER_TYPES;
INSERT INTO NESTED.USER_TYPES VALUES("A", "ADMIN"), ("U", "USER"), ("P", "PATIENT");

DROP TABLE IF EXISTS NESTED.USERS;
CREATE TABLE NESTED.USERS(
    UUID            VARCHAR(150) NOT NULL COMMENT 'USER UNIQUE ID',
    U_EMAIL         VARCHAR(255) UNIQUE NOT NULL COMMENT 'USER EMAIL',
    U_PWD           VARCHAR(255) NOT NULL COMMENT 'USER PASSWORD',
    U_PHONE         VARCHAR(12) UNIQUE NOT NULL COMMENT 'USER PHONE',
    U_F_NAME        VARCHAR(150) NOT NULL COMMENT 'USER FIRST NAME',
    U_L_NAME        VARCHAR(150) NOT NULL COMMENT 'USER LAST NAME',
    CURP            VARCHAR(60) UNIQUE NOT NULL COMMENT 'USER CURP',
    U_IMG           MEDIUMBLOB COMMENT 'USER PROFILE IMAGE',
    U_ADDRESS       VARCHAR(150) NOT NULL COMMENT 'USER ADDRESS',
    U_TYPE          CHAR(1) NOT NULL COMMENT 'USER TYPE',
    U_ADD_DATE      DATETIME NOT NULL COMMENT 'USER DATE ADDED',
    U_PROF_MOD_DATE DATETIME NOT NULL COMMENT 'USER MODIFY DATE',
    CONSTRAINT p_user_id PRIMARY KEY(UUID),
    CONSTRAINT user_address FOREIGN KEY(U_ADDRESS) REFERENCES ADDRESSES(A_UID),
    CONSTRAINT user_type FOREIGN KEY (U_TYPE) REFERENCES USER_TYPES(U_TYPE)
);

#INSERT ADMIN INFO
INSERT INTO NESTED.USERS(
    UUID,
    U_EMAIL,
    U_PHONE,
    U_F_NAME,
    U_L_NAME,
    CURP,
    U_ADDRESS,
    U_TYPE,
    U_ADD_DATE,
    U_PROF_MOD_DATE
)VALUES(
    UUID(),
    'KEED@GMAIL.COM',
    '8122887411',
    'MIKE',
    'MED',
    'MEOM990524HNLDRG04',
    '20f84172-71e5-11ee-b646-20c9d0784529',
    'A',
    SYSDATE(),
    SYSDATE()
);

#CREATE USERS TABLE RECURSIVE CONSTRAINTS
ALTER TABLE NESTED.USERS ADD COLUMN U_ADD_BY VARCHAR(150) NOT NULL COMMENT 'USER ADDED BY';
ALTER TABLE NESTED.USERS ADD COLUMN U_MOD_BY VARCHAR(150) NOT NULL COMMENT 'USER MODIFIED BY';

#CONFIG ADMIN USER;
DELIMITER//
BEGIN
    DECLARE ADMIN_ID VARCHAR(150);
    SET ADMIN_ID = (SELECT UUID FROM USERS LIMIT 1);
    UPDATE NESTED.USERS SET U_ADD_BY = ADMIN_ID, U_MOD_BY = ADMIN_ID;
END;
//
DELIMITER; 

ALTER TABLE NESTED.USERS ADD CONSTRAINT add_users FOREIGN KEY(U_ADD_BY) REFERENCES USERS(UUID);
ALTER TABLE NESTED.USERS ADD CONSTRAINT mod_users FOREIGN KEY(U_MOD_BY) REFERENCES USERS(UUID);

SELECT * FROM NESTED.USERS;

DROP TABLE IF EXISTS NESTED.DATES;
CREATE TABLE NESTED.DATES(
    D_UUID          VARCHAR(150) NOT NULL COMMENT 'DATE ID',
    D_DATE          DATETIME NOT NULL COMMENT 'SCHEDUED DATE',
    D_COMMENT       TEXT COMMENT 'SCHEDULED DATE COMMENT',
    U_SCHEDULE      VARCHAR(150) NOT NULL COMMENT 'WHO SCHEDULE A DATE',
    CONSTRAINT p_date PRIMARY KEY(D_UUID),
    CONSTRAINT user_date FOREIGN KEY(U_SCHEDULE) REFERENCES USERS(UUID)
);

DROP TABLE IF EXISTS NESTED.USERS_DATES;
CREATE TABLE NESTED.USERS_DATES(
    U_UID           VARCHAR(150) NOT NULL COMMENT 'PATIENT UID',
    D_UID          VARCHAR(150) NOT NULL COMMENT 'DATE UID',
    D_STATUS        CHAR(1) DEFAULT 'A' COMMENT 'DATE STATUS',
    LAT_MOD_DATE    DATETIME NOT NULL COMMENT 'LAST MODIFIED DATE',
    U_MOD_BY        VARCHAR(150) NOT NULL COMMENT 'WHO MODIFIED THE DATE STATUS',
    CONSTRAINT p_user_date PRIMARY KEY(U_UID, D_UID),
    CONSTRAINT pk_user_id FOREIGN KEY(U_UID) REFERENCES USERS(UUID),
    CONSTRAINT PK_date_id FOREIGN KEY(D_UID) REFERENCES DATES(D_UUID)
);

