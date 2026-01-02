const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Read DATABASE_URL from .env.local
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const dbUrlMatch = envContent.match(/DATABASE_URL="?([^"\n]+)"?/);
const DATABASE_URL = dbUrlMatch ? dbUrlMatch[1] : null;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env.local');
  process.exit(1);
}

async function fixInquiriesTable() {
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔄 Connecting to database...');
    const client = await pool.connect();
    console.log('✅ Connected to database');

    // Check if read_at column exists
    const checkColumn = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'inquiries' AND column_name = 'read_at'
    `);

    if (checkColumn.rows.length === 0) {
      console.log('🔄 Adding read_at column to inquiries table...');
      await client.query(`
        ALTER TABLE inquiries 
        ADD COLUMN IF NOT EXISTS read_at TIMESTAMP WITH TIME ZONE
      `);
      console.log('✅ read_at column added successfully');
    } else {
      console.log('✅ read_at column already exists');
    }

    client.release();
  } catch (error) {
    console.error('❌ Fix failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

fixInquiriesTable();
