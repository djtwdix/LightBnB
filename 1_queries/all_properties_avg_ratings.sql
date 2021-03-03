SELECT properties.title, ROUND(AVG(rating))
FROM properties
JOIN property_reviews ON properties.id = property_id
GROUP BY properties.title
HAVING ROUND(AVG(rating)) >= 3
LIMIT 10;