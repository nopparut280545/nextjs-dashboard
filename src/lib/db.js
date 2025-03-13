import mysql from 'mysql2/promise';

let connection = null;

async function getConnection() {
    if (!connection) {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }
    return connection;
}

const db = {
    query: async (sql, params) => {
        const conn = await getConnection();
        try {
            const [results] = await conn.execute(sql, params);
            return results;
        } catch (error) {
            console.error('Database error:', error);
            throw error;
        }
    }
};

export default db;