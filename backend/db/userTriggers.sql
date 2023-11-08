USE NESTED;
DELIMITER //

DROP TRIGGER IF EXISTS TR_INSERT_USERS;
CREATE TRIGGER TR_INSERT_USERS
BEFORE INSERT ON USERS
FOR EACH ROW
BEGIN
    DECLARE _EMAIL_EXISTS TINYINT(1);
    DECLARE _ISADMIN CHAR(1);

    SET _EMAIL_EXISTS = (SELECT COUNT(U_EMAIL) FROM USERS WHERE U_EMAIL = NEW.U_EMAIL);
    SET _ISADMIN = (SELECT U_TYPE FROM USERS WHERE UUID = NEW.U_ADD_BY);
    IF (_EMAIL_EXISTS > 0) OR  (_ISADMIN != 'A') THEN
        DELETE FROM ADDRESSES WHERE A_UID = NEW.U_ADDRESS;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'ERROR::EMAIL ALREADY EXISTS OR THE USER CANOT ADD MORE USERS BECAUSE IS NOT AN ADMIN';
    END IF;
    
END //

DELIMITER ;