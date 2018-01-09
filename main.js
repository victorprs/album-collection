var express = require('express');
var path = require('path');
var mysql = require('mysql');
var fs = require('fs');

var dbConfig = JSON.parse(fs.readFileSync('dbconfig.json'));
var pool = mysql.createPool(dbConfig);

var app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'client', 'views', 'index.html'));
});

app.get('/discos', function(req, res) {
    pool.getConnection(function (err, con) {
        if (err) {
            con.release();
            res.json({'code' : 100, 'status': 'Error in connection db'});
            return;
        }

        con.query('select ALBUM.ID as id, ALBUM.NOME as nome, ALBUM.ANO_LANCAMENTO as ano, ALBUM.ID_ARTISTA as idArtista, ' +
                  ' ARTISTA.NOME as artista, ' +
                  ' GENERO.ID as idGenero, GENERO.NOME as genero '+
                  ' from ALBUM, ARTISTA, GENERO, GENEROS_DO_ALBUM '+
                  'where ALBUM.ID_ARTISTA = ARTISTA.ID ' +
                  'AND ALBUM.ID = GENEROS_DO_ALBUM.ID_ALBUM ' +
                  'and GENERO.ID = GENEROS_DO_ALBUM.ID_GENERO;', function(err, rows) {
            con.release()
            if (!err)
                res.json(rows);
        });
    
        con.on('error', function(err) {
            console.log(err);
            res.json({'code' : 100, 'status': 'Error in connection db'});
            return;
        })
    })
})

app.use(express.static(path.join(__dirname, 'client')));

app.listen(3000, function() {
    console.log('Escutando na porta 3000');
});