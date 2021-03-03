SELECT properties.title, ROUND(AVG(rating))
FROM properties
JOIN property_reviews ON properties.id = property_id
GROUP BY properties.title
LIMIT 10;