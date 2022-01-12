# teepee-dashboard
⛺️ Property valuation dashboard with data scraping graphs and forecast.


## Fake data in mongodb
A script has been write in order to seed mongodb on fake data. After having started all your containers, run the following line to seed the database:

``` bash
docker exec api node seedmongo.js
```