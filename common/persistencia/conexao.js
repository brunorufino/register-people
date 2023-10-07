import mysql from 'mysql2/promise';

export default async function conectar() {
    if (global.poolConexoes) {
        return await global.poolConexoes.getConnection();
    }
    global.poolConexoes = mysql.createPool({
        host: '129.146.68.51',
        port: 3306,
        user: 'aluno5-ppiadsead',
        database: 'backendaluno5-ppiadsead',
        password: 'yFJ3riVW8bjqXve0Hza3',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        idleTimeout: 60000,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    })
    return await global.poolConexoes.getConnection();
}