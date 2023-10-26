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