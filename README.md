Problem Statement
======
 
In the attached weather.dat file you’ll find daily Weather Underground (wunderground.com) data for Austin, TX for January 2017.  Using this text file as an example, write a program to output the following:
 
*   The day number with the smallest temperature spread of the month.  The day number is the 1st field of daily temperature readings.  The highest daily temperature is the 2nd field, and the lowest daily temperature is the 4th field.
*   The total precipitation for the month.  The daily precipitation is the 20th field of the daily temperature readings.

Solution
------

Node.js app creates a service that exposes a number of endpoints to query the data file for information
about the high, low, and precipitation for given days and across all the days.


API documentation
------
returns all data: /weather/all

returns data for a given day: /weather/day/{dayNum}

returns the high for a given day: /weather/day/{dayNum}/high

returns the low for a given day: /weather/day/{dayNum}/low

returns the precipitation for a given day: /weather/day/{dayNum}/precipitation

returns the temperature spread between high and low for a given day: /weather/day/{dayNum}/spread

returns the minimum high across all days: /weather/high/min

returns the maximum high across all days: /weather/high/max

returns the minimum low across all days: /weather/low/min

returns the maximum low across all days: /weather/low/max

returns the minimum temperature spread across all days: /weather/spread/min

returns the maximum temperature spread across all days: /weather/spread/max

returns the minimum precipitation across all days: /weather/precipitation/min

returns the maximum precipitation across all days: /weather/precipitation/max

returns the total precipitation across all days: /weather/precipitation/total


Installing
------
npm install


Running
------
npm start


Public URL
------
http://weather-bv.us-east-1.elasticbeanstalk.com/weather/help
