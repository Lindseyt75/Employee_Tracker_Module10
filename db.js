// db.js
const { Client } = require('pg');

// Create a new client instance to connect to the PostgreSQL database
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres', // Replace with your PostgreSQL username
  password: '1', // Replace with your PostgreSQL password
  database: 'employee_manager_db', // Your database name
});

client.connect();

// Function to query the database
const queryDatabase = (queryText, values = []) => {
  return client.query(queryText, values);
};

module.exports = { queryDatabase, client };
