import mysql = require('mysql');

export default class MySQL {
    private static _instance: MySQL;

    cnn: mysql.Connection;

    constructor() {
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 's4ndr0',
            database: 'node_db'
        });

        this.conectarDB();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public static ejecutarQuery(query: string, callback: Function) {
        this.instance.cnn.query(query, (err, results: Object[], fields) => {
            if(err) {
                console.log("Error en la query");
                console.log(err);
                return callback(err);
            }

            if(results.length === 0) {
                callback('El registro solicitado no existe');
            } else {
                callback(null, results);
            }
        });
    }

    private conectarDB() {
        this.cnn.connect((err: mysql.MysqlError ) => {
            if(err) {
                console.log(err.message);
                return;
            }
        })
    }
}