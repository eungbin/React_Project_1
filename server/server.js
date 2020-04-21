const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'vk2sjf12',
    database : 'jspdb'
});

connection.query('SELECT * FROM video', function (error, results, fields) {
    if (error) {
        console.log(error);
    }
    console.log(results);
});

app.get('/api/host', (req, res) => {
    res.send({ host : 'eungbin' });
})

app.post('/api/add', (req, res) => {
    let sql = "insert into video values(?)";
    let video_link = req.video_link;
    //console.log("video_link : " + video_link);
    //console.log("req : " + req.body);

    connection.query(sql, video_link, (err, rows, fields) => {
        res.send(rows);
    })
});

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})
