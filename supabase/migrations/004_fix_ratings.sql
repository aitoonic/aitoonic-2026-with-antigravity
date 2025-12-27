-- 1. Reset all ratings to NULL to clear fake seed data
UPDATE tools SET rating = NULL;

-- 2. Recalculate average ratings for tools that have real reviews
WITH review_stats AS (
    SELECT tool_id, AVG(rating) as average_rating
    FROM reviews
    GROUP BY tool_id
)
UPDATE tools
SET rating = ROUND(review_stats.average_rating, 1)
FROM review_stats
WHERE tools.id = review_stats.tool_id;
