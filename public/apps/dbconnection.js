const mysql = require('mysql')

        var db_con = mysql.createPool({
            host : 'localhost',
            port : '3306',
            user : 'root',
            password : 'password',
            database : 'db'
        });

        db_con.getConnection(function(err, conn){
            if(err)
                console.log(err.code);
            else
                console.log("Database Connection created");
        });

        module.exports = db_con;