import mysql from 'mysql2/promise'

export default function conectar(){
    if(global.poolConexoes){
        return global.poolConexoes.getConnection();
    }
    global.poolConexoes = mysql.createPool({
        host:'localhost',
        port:3306,
        user:'aluno5-ppiadsead',
        database:'backendaluno5-ppiadsead',
        password:'yFJ3riVW8bjqXve0Hza3',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0 ,
        idleTimeout: 60000,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    })
    return conexao = global.poolConexoes.getConnection();
}