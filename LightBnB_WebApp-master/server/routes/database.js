const db = require("../db")

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return db.query(
    `SELECT *
    FROM users
    WHERE email = $1`, [email]
  )
    .then(res => {
      return res.rows[0];
    });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return db.query(
    `SELECT *
    FROM users
    WHERE id = $1`, [id]
  )
    .then(res => {
      return res.rows[0];
    });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return db.query(
    `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
  `, [user.name, user.email, user.password])
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return db.query(`SELECT reservations.*, properties.*, ROUND(AVG(rating)) as average_rating
  FROM reservations
  JOIN properties ON properties.id = reservations.property_id
  JOIN property_reviews ON property_reviews.property_id = properties.id
  WHERE reservations.guest_id = $1 AND end_date <= now()::date
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date
  LIMIT $2`, [guest_id, limit])
    .then(res => {
      console.log(res.rows)
      return res.rows;
    })
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit) {
  const queryParams = [];
  let queryString = `
  SELECT properties.*, ROUND(avg(rating)) as average_rating FROM properties
  JOIN property_reviews ON properties.id = property_id`;

  if (options.city) {
    queryParams.push(`%${options.city}%`)
    queryString += ` WHERE city LIKE $${queryParams.length}`
  }

  if (options.minimum_price_per_night) {
    queryParams.push(Number(options.minimum_price_per_night) * 100);
    if (queryParams.length) {
      queryString += ` AND cost_per_night >= $${queryParams.length}`
    } else {
      queryString += ` WHERE cost_per_night >= $${queryParams.length}`
    }
  };

  if (options.maximum_price_per_night) {
    queryParams.push(Number(options.maximum_price_per_night) * 100)
    if (queryParams.length) {
      queryString += ` AND cost_per_night <= $${queryParams.length}`
    } else {
      queryString += ` WHERE cost_per_night <= $${queryParams.length}`
    }
  };

  queryString += `
  GROUP BY properties.id `;
  
  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating))
    queryString += `HAVING ROUND(avg(rating)) >= $${queryParams.length} `
  };

  queryParams.push(limit)
  queryString += `ORDER BY cost_per_night
  LIMIT $${queryParams.length}
  `;

  return db.query(queryString, queryParams)
  .then(res => {
    return res.rows;
  });
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  console.log(property)
  const queryString = `INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, 
                          parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city,
                          province, post_code, owner_id)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
                       RETURNING *`
  const queryParams = [property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, 
                       property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, 
                       property.number_of_bedrooms, property.country, property.street, property.city, 
                       property.province, property.post_code, property.owner_id];
  console.log(queryParams)
  console.log(queryString)
  return db.query(queryString, queryParams)
    .then (res => {
      console.log(res.rows[0])
      return res.rows[0]
    });
      
}
exports.addProperty = addProperty;
