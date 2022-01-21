-- SQL script that creates a stored procedure ComputeAverageScoreForUser that computes and store the average score for a student
DELIMITER //
CREATE PROCEDURE ComputeAverageScoreForUser (IN userid INTEGER)
BEGIN
SET @avg_score = (SELECT ROUND(AVG(score), 2) FROM corrections WHERE user_id = userid);
UPDATE users SET average_score = @avg_score WHERE id = userid;
END;//
DELIMITER ;
