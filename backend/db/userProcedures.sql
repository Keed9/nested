USE NESTED;

DELIMITER //
    DROP PROCEDURE IF EXISTS SP_GET_USER;
    CREATE PROCEDURE SP_GET_USER(
        IN _ID VARCHAR(150),
        IN _EMAIL VARCHAR(150),
        IN _OPT VARCHAR(15)
    )
    BEGIN
        CASE
            WHEN _OPT = 'ID' THEN
                SELECT * FROM V_GET_USER WHERE UUID = _ID;

            WHEN _OPT = 'EMAIL' THEN
                SELECT * FROM V_GET_USER WHERE EMAIL = _EMAIL;
        END CASE;

    END;
DELIMITER ;

USE NESTED;
DELIMITER //
    DROP PROCEDURE IF EXISTS SP_USERS;
    CREATE PROCEDURE SP_USERS(
        IN _EMAIL           VARCHAR(255),
        IN _PWD             VARCHAR(255),
        IN _PHONE           VARCHAR(12),
        IN _F_NAME          VARCHAR(150),
        IN _L_NAME          VARCHAR(150),
        IN _CURP            VARCHAR(60),
        IN _IMG             VARCHAR(255),
        IN _AVENUE          VARCHAR(150),
        IN _EXT_NUMBER      VARCHAR(4),
        IN _INT_NUMBER      VARCHAR(4),
        IN _CITY            VARCHAR(150),
        IN _STATE           VARCHAR(150),
        IN _COUNTRY         VARCHAR(150),
        IN _TYPE            CHAR(1),
        IN _ADMIN           VARCHAR(150),
        IN _STATES          CHAR(1),
        IN _OPT             VARCHAR(10)
    )
    BEGIN
        CASE _OPT
            WHEN 'INSERT' THEN
                SET @ADDRESS_ID = UUID();
                SET @USER_ID = UUID();
                INSERT INTO ADDRESSES
                    VALUES(
                        @ADDRESS_ID,
                        _AVENUE,
                        _EXT_NUMBER,
                        _INT_NUMBER,
                        _CITY,
                        _STATE,
                        _COUNTRY
                    );

                INSERT INTO USERS(
                    UUID,
                    U_EMAIL,
                    U_PHONE,
                    U_F_NAME,
                    U_L_NAME,
                    CURP,
                    U_ADDRESS,
                    U_TYPE,
                    U_ADD_DATE,
                    U_PROF_MOD_DATE,
                    U_ADD_BY,
                    U_MOD_BY,
                    U_PWD,
                    U_IMG
                )
                VALUES(
                    @USER_ID,
                    _EMAIL,
                    _PHONE,
                    _F_NAME,
                    _L_NAME,
                    _CURP,
                    @ADDRESS_ID,
                    _TYPE,
                    SYSDATE(),
                    SYSDATE(),
                    _ADMIN,
                    _ADMIN,
                    _PWD,
                    _IMG
                );

                SELECT @USER_ID;

            WHEN 'UPDATE' THEN
                SET @USER_ID = (SELECT UUID FROM USERS WHERE U_EMAIL = _EMAIL);
                SET @ADDRESS_ID = (SELECT U_ADDRESS FROM USERS WHERE U_EMAIL = _EMAIL);

                UPDATE ADDRESSES 
                    SET 
                        A_AVENUE = _AVENUE, 
                        A_EXT_NUMBER = _EXT_NUMBER, 
                        A_CITY = _CITY, 
                        A_STATE = _STATE, 
                        A_COUNTRY = _COUNTRY
                    WHERE A_UID = @ADDRESS_ID;


                UPDATE USERS
                    SET
                        U_PHONE = _PHONE,
                        U_F_NAME = _F_NAME,
                        U_L_NAME = _L_NAME,
                        CURP = _CURP,
                        U_PROF_MOD_DATE = SYSDATE(),
                        U_MOD_BY = _ADMIN,
                        U_PWD = _PWD
                    WHERE UUID = @USER_ID;

                IF(_IMG != '') THEN
                    UPDATE USERS 
                        SET 
                            U_IMG = _IMG 
                        WHERE UUID = @USER_ID;
                END IF;

                SELECT @USER_ID;

        END CASE;

    END;
DELIMITER ;

USE NESTED;
DELIMITER //
    DROP PROCEDURE IF EXISTS SP_FIND_BY_NAME;
    CREATE PROCEDURE SP_FIND_BY_NAME(
        IN _NAME VARCHAR(160)
    )
    BEGIN
        SELECT * FROM V_GET_USER WHERE 'NAME' LIKE CONCAT('%', _NAME, '%');
    END //
DELIMITER ;

CALL NESTED.SP_GET_USER('', 'keed@gmail.com', 'EMAIL');

3803056d-71e5-11ee-b646-20c9d0784529
CALL NESTED.SP_USERS(
    'KEED@GMAIL.COM', 
    '123', 
    '8122887411', 
    'MIGUEL', 
    'MEDINA', 
    'MAMO990524HNLDRG04', 
    '', 
    'INDEPENDENCIA', 
    '133', 
    '',
    'APODACA', 
    'NUEVO LEON', 
    'MEXICO', 
    'A', 
    '3803056d-71e5-11ee-b646-20c9d0784529',
    '', 
    'UPDATE'
);
