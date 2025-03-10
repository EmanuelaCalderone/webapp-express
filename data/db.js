//importo il modulo mysql2 per la connessione al db MySQl
const mysql = require("mysql2");

//creo la connessione al db con le variabili di ambiente
const connection = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "PassWord8!",
    database: process.env.DB_NAME || "movies_db",
});

//effettuo la connessione al db
connection.connect((err) => {
    //gestione errore
    if (err) throw err;
    //messaggio in caso di connessione avvenuta con suggesso
    console.error('Connected to MySQL!');
});

//esporto la connessione perché possa essere usata in altri file
module.exports = connection;
