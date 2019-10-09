var express = require('express');
var app = express();
const Influx = require('influx');

const port = 3005;

const influx = new Influx.InfluxDB({
    host: '192.168.1.11',
    database: 'home',
    schema: [
      {
        measurement: 'temperatures',
        fields: {
          value: Influx.FieldType.FLOAT
        },
        tags: [
          'room',
          'sensor'
        ]
      }
    ]
   })

app.get('/', function(req, res){    
    var room = req.query.room;
    var temp =req.query.temp;
    var sensor =req.query.sensor;

    influx.writePoints([
        {
          measurement: 'temperatures',
          tags: { room: room, sensor: sensor },
          fields: { value: temp },
        }
      ]); 
      
      res.send("ok");
  });
  

app.listen(port);