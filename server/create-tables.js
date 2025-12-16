const { Pool } = require('pg');

const pool = new Pool({
  host: 'trolley.proxy.rlwy.net',
  port: 14507,
  user: 'postgres',
  password: 'IaxekoClEdwnwWishoQOJZdKQPQAohNg',
  database: 'railway',
});

const createTablesSQL = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  token_expiry TIMESTAMP,
  two_fa_enabled BOOLEAN DEFAULT FALSE,
  two_fa_secret VARCHAR(255),
  two_fa_backup_codes JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  current_level VARCHAR(255),
  completed_modules JSONB,
  badges_earned JSONB,
  total_points INTEGER DEFAULT 0,
  last_position_x FLOAT DEFAULT 0,
  last_position_y FLOAT DEFAULT 0,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_username ON users(username);
`;

async function createTables() {
  try {
    console.log('Connecting to Railway PostgreSQL...');
    await pool.query(createTablesSQL);
    console.log('✅ Tables created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
    process.exit(1);
  }
}

createTables();
