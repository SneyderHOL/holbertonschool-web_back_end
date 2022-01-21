-- SQL script that creates a stored procedure AddBonus that adds a new correction for a student.
DELIMITER //
CREATE PROCEDURE AddBonus (IN userid INTEGER, project_name VARCHAR(255), c_score INTEGER)
BEGIN
IF EXISTS(SELECT id FROM projects WHERE name = project_name) THEN
SET @p_id = (SELECT id FROM projects WHERE name = project_name LIMIT 1);
ELSE
INSERT INTO projects (name) VALUES (project_name);
SET @p_id = LAST_INSERT_ID();
END IF;
INSERT INTO corrections (user_id, project_id, score) VALUES (userid, @p_id, c_score);
END;//
DELIMITER ;
