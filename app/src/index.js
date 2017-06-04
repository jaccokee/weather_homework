'use strict';

const datareader = require('./data');
const Hapi = require('hapi');
const Joi = require('joi');

// Init datareader
datareader.loadData();

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8081 
});

server.route({
    method: 'GET',
    path:'/weather/all', 
    handler: function (request, reply) {
        let data = datareader.getAllData();
        console.log('data', data);
        reply(data);
    }
});

server.route({
    method: 'GET',
    path: '/weather/day/{dayNum}',
    handler: function (request, reply) {
        let data = datareader.getData(encodeURIComponent(request.params.dayNum));
        reply(data);
    },
    config: {
        validate: {
            params: {
                dayNum: Joi.number().integer().min(1).default(1)
            }
        }
    }
});

server.route({
    method: 'GET',
    path: '/weather/day/{dayNum}/high',
    handler: function (request, reply) {
        let data = datareader.getDayHigh(encodeURIComponent(request.params.dayNum));
        reply({high: data});
    },
    config: {
        validate: {
            params: {
                dayNum: Joi.number().integer().min(1).default(1)
            }
        }
    }
})

server.route({
    method: 'GET',
    path: '/weather/day/{dayNum}/low',
    handler: function (request, reply) {
        let data = datareader.getDayLow(encodeURIComponent(request.params.dayNum));
        reply({low: data});
    },
    config: {
        validate: {
            params: {
                dayNum: Joi.number().integer().min(1).default(1)
            }
        }
    }
})

server.route({
    method: 'GET',
    path: '/weather/day/{dayNum}/precipitation',
    handler: function (request, reply) {
        let data = datareader.getDayPrecipitation(encodeURIComponent(request.params.dayNum));
        reply({precipitation: data});
    },
    config: {
        validate: {
            params: {
                dayNum: Joi.number().integer().min(1).default(1)
            }
        }
    }
})

server.route({
    method: 'GET',
    path: '/weather/day/{dayNum}/spread',
    handler: function (request, reply) {
        let data = datareader.getDaySpread(encodeURIComponent(request.params.dayNum));
        reply({spread: data});
    }
})

server.route({
    method: 'GET',
    path: '/weather/high/min',
    handler: function (request, reply) {
        let data = datareader.getMinHighDay();
        reply({
                  'min-high': {
                      day: data.day,
                      high: data.high,
                  }
              });
    }
})

server.route({
    method: 'GET',
    path: '/weather/high/max',
    handler: function (request, reply) {
        let data = datareader.getMaxHighDay();
        reply({
                  'max-high': {
                      day: data.day,
                      high: data.high,
                  }
              });
    }
})

server.route({
    method: 'GET',
    path: '/weather/low/min',
    handler: function (request, reply) {
        let data = datareader.getMinLowDay();
        reply({
                  'min-low': {
                      day: data.day,
                      low: data.low,
                  }
              });
    }
})

server.route({
    method: 'GET',
    path: '/weather/low/max',
    handler: function (request, reply) {
        let data = datareader.getMaxLowDay();
        reply({
                  'max-low': {
                      day: data.day,
                      low: data.low,
                  }
              });
    }
})

server.route({
    method: 'GET',
    path: '/weather/spread/min',
    handler: function (request, reply) {
        let data = datareader.getMinSpreadDay();
        reply({
                  'min-spread': {
                      day: data.day,
                      spread: data.high - data.low,
                      high: data.high,
                      low: data.low
                  }
              });
    }
})

server.route({
    method: 'GET',
    path: '/weather/spread/max',
    handler: function (request, reply) {
        let data = datareader.getMaxSpreadDay();
        reply({
                  'max-spread': {
                      day: data.day,
                      spread: data.high - data.low,
                      high: data.high,
                      low: data.low
                  }
              });
    }
})

server.route({
    method: 'GET',
    path: '/weather/precipitation/min',
    handler: function (request, reply) {
        let data = datareader.getMinPrecipitationDay();
        reply({
                  'min-precipitation': {
                      day: data.day,
                      precipitation: data.precipitation
                  }
              });
    }
})

server.route({
    method: 'GET',
    path: '/weather/precipitation/max',
    handler: function (request, reply) {
        let data = datareader.getMaxPrecipitationDay();
        reply({
                  'max-precipitation': {
                      day: data.day,
                      precipitation: data.precipitation
                  }
              });
    }
})

server.route({
    method: 'GET',
    path: '/weather/precipitation/total',
    handler: function (request, reply) {
        let data = datareader.getTotalPrecipitation();
        reply({
                  'total-precipitation': {
                      days: data.numDays,
                      total: data.total
                  }
              });
    }
})

server.route({
    method: 'GET',
    path: '/weather/help',
    handler: function (request, reply) {
        reply('<html><body>' +
            '<h2>Weather API - BV Homework</h2>' +
            '<span>returns all data: </span><span><a href="/weather/all">/weather/all</a></span><br/>' + 
            '<span>returns data for a given day: </span><span><a href="/weather/day/1">/weather/day/{dayNum}</a></span><br/>' +
            '<span>returns the high for a given day: </span><span><a href="/weather/day/1/high">/weather/day/{dayNum}/high</a></span><br/>' +
            '<span>returns the low for a given day: </span><span><a href="/weather/day/1/low">/weather/day/{dayNum}/low</a></span><br/>' +
            '<span>returns the precipitation for a given day: </span><span><a href="/weather/day/1/precipitation">/weather/day/{dayNum}/precipitation</a></span><br/>' +
            '<span>returns the temperature spread between high and low for a given day: </span><span><a href="/weather/day/1/spread">/weather/day/{dayNum}/spread</a></span><br/>' +
            '<span>returns the minimum high across all days: </span><span><a href="/weather/high/min">/weather/high/min</a></span><br/>' +
            '<span>returns the maximum high across all days: </span><span><a href="/weather/high/max">/weather/high/max</a></span><br/>' +
            '<span>returns the minimum low across all days: </span><span><a href="/weather/low/min">/weather/low/min</a></span><br/>' +
            '<span>returns the maximum low across all days: </span><span><a href="/weather/low/max">/weather/low/max</a></span><br/>' +
            '<span>returns the minimum temperature spread across all days: </span><span><a href="/weather/spread/min">/weather/spread/min</a></span><br/>' +
            '<span>returns the maximum temperature spread across all days: </span><span><a href="/weather/spread/max">/weather/spread/max</a></span><br/>' +
            '<span>returns the minimum precipitation across all days: </span><span><a href="/weather/precipitation/min">/weather/precipitation/min</a></span><br/>' +
            '<span>returns the maximum precipitation across all days: </span><span><a href="/weather/precipitation/max">/weather/precipitation/max</a></span><br/>' +
            '<span>returns the total precipitation across all days: </span><span><a href="/weather/precipitation/total">/weather/precipitation/total</a></span><br/>'
        );
    }
})

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
