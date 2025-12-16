const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

async function createTestUser() {
  try {
    // Hash the password
    const password = '123@123@';
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Creating test user: alex / 123@123@');
    console.log('Hashed password:', hashedPassword);

    // Insert the user
    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash, email_verified, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING id, username, email, email_verified`,
      ['alex', 'alex@test.com', hashedPassword, true]
    );

    console.log('✅ Test user created successfully!');
    console.log('User:', result.rows[0]);
    console.log('\n🎮 You can now login with:');
    console.log('   Email: alex@test.com');
    console.log('   Password: 123@123@');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating test user:', error.message);
    
    // If duplicate, that's fine - user already exists
    if (error.code === '23505') {
      console.log('✅ Test user already exists!');
      console.log('\n🎮 You can login with:');
      console.log('   Email: alex@test.com');
      console.log('   Password: 123@123@');
      process.exit(0);
    }
    
    process.exit(1);
  }
}

createTestUser();
