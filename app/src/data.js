/**
 *  data.js - processes data file weather.dat and assumes a given format.
 *          To generalize, we could read in the data filename from properties,
 *          or have it passed in.
 *    Format assumptions:
 *          - tab delimited
 *          - headers will have a line that begins with "Jan"
 *          - data begins line immediately following "Jan" header
 *          - columns 1, 2, 4, 20 will contain day, high, low, precipitation
 *          - if precipitation has "T" for "Trace" amount of precipitation, use 0.0
 *          - all other data values are numeric
 */

const fs = require('fs')
const path = require('path');
const appDir = path.dirname(require.main.filename);

let dataMap = [];

exports.loadData = () => {
  fs.readFile(path.join(appDir, '../resources') + '/weather.dat', 'utf8', function (err,data) {
        
    if (err) {
        return console.log(err);
    }
    let items;
    const lines = data.split('\n');
    let lineIndex = 0, itemIndex, dayIndex;
    let processingData = false;
    lines.forEach(function(line) {
        if (processingData) {
            items = line.split('\t');
            itemIndex = 0;
            items.forEach(function(item) {
                switch (itemIndex) {
                case 0:
                    // day
                    dayIndex = item;
                    dataMap[dayIndex] = {};
                    dataMap[dayIndex]['day'] = parseInt(item);
                case 1:
                    // daily high
                    dataMap[dayIndex]['high'] = parseInt(item);
                case 3:
                    // daily low
                    dataMap[dayIndex]['low'] = parseInt(item);
                case 19:
                    // precipitation
                    if (item === 'T') {  // 'T' for 'Trace' amount of precipitation
                        item = "0.00";
                    }
                    dataMap[dayIndex]['precipitation'] = parseFloat(item);
                default:
                    // skip it
                }
                itemIndex++;
            });
        } else {
            if (line.split('\t')[0] === 'Jan') {
                processingData = true;
            }
        }
        lineIndex++;
    });
  });
  console.log('dataMap successfully read in');
}

exports.getAllData = () => {
    return dataMap;
}

exports.getData = (day) => {
    return dataMap[day];
}

exports.getDayHigh = (day) => {
    return dataMap[day]['high'];
}

exports.getDayLow = (day) => {
    return dataMap[day]['low'];
}

exports.getDayPrecipitation = (day) => {
    return dataMap[day]['precipitation'];
}

exports.getDaySpread = (day) => {
    return dataMap[day]['high'] - dataMap[day]['low'];
}

exports.getMinHighDay = () => {
    return dataMap.reduce(function(min, day) {
        if (day['high'] < min['high']) {
            return day;
        } else {
            return min;
        }
    });
}

exports.getMaxHighDay = () => {
    return dataMap.reduce(function(max, day) {
        if (day['high'] > max['high']) {
            return day;
        } else {
            return max;
        }
    });
}

exports.getMinLowDay = () => {
    return dataMap.reduce(function(min, day) {
        if (day['low'] < min['low']) {
            return day;
        } else {
            return min;
        }
    });
}

exports.getMaxLowDay = () => {
    return dataMap.reduce(function(max, day) {
        if (day['low'] > max['low']) {
            return day;
        } else {
            return max;
        }
    });
}

exports.getMinSpreadDay = () => {
    return dataMap.reduce(function(min, day) {
        if (day['high'] - day['low'] < min['high'] - min['low']) {
            return day;
        } else {
            return min;
        }
    });
}

exports.getMaxSpreadDay = () => {
    return dataMap.reduce(function(max, day) {
        if (day['high'] - day['low'] > max['high'] - max['low']) {
            return day;
        } else {
            return max;
        }
    });
}

exports.getMinPrecipitationDay = () => {
    return dataMap.reduce(function(min, day) {
        if (day['precipitation'] < min['precipitation']) {
            return day;
        } else {
            return min;
        }
    });
}

exports.getMaxPrecipitationDay = () => {
    return dataMap.reduce(function(max, day) {
        if (day['precipitation'] > max['precipitation']) {
            return day;
        } else {
            return max;
        }
    });
}

exports.getTotalPrecipitation = () => {
    return dataMap.reduce(function(agg, day) {
        agg['numDays']++;
        agg['total'] = Number((agg['total'] + day['precipitation']).toFixed(2));
        return agg;
    }, { numDays: 0, total: 0.00 });
}
