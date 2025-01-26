-- Find Viewers with Multiple Article Views in a Day
 
-- Using the table playground.views, write a SQL query to identify all viewers who viewed more than
--  one article on the same day. The table includes columns viewer_id (the ID of the viewer)
-- article_id (the ID of the article viewed), and view_date (the date of the view). The result should contain a
-- single column named viewer_id, listing each viewer who meets the criteria without duplicates, and should be sorted
-- in ascending order of viewer_id.

-- These are the tables to query for this question:
-- playground.views
-- article_id int
-- author_id int
-- viewer_id int
-- view_date date
-- Your answer should include these columns:
-- viewer_id integer

-- Option 1
SELECT DISTINCT viewer_id
FROM playground.views
WHERE viewer_id IN (
    SELECT viewer_id
    FROM playground.views
    GROUP BY viewer_id, view_date
    HAVING COUNT(DISTINCT article_id) > 1
)
ORDER BY viewer_id;

-- Option 2
WITH MULTIPLE_VIEWERS AS (
  SELECT viewer_id
  FROM playground.views
  GROUP BY viewer_id, view_date
  HAVING COUNT(DISTINCT article_id) > 1
)
SELECT DISTINCT viewer_id
FROM MULTIPLE_VIEWERS
WHERE viwer_id IN (MULTIPLE_VIEWERS)
ORDER BY viewer_id