const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const data2019 = fs.createWriteStream('data2019.csv');

//Headers
data2019.write(`Year, Name, Team, Position, Points \n`);
data2018.write(`Year, Name, Team, Position, Points \n`);
data2017.write(`Year, Name, Team, Position, Points \n`);

request('https://fantasy.nfl.com/research/scoringleaders', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    $('tbody tr').each((i, el) => {
      const year = 2019
      const name = $(el)
        .find('.playerNameFull')
        .text()
      const position = $(el)
        .find('em')
        .text().split(' - ')[0]
      const team = $(el)
        .find('em')
        .text().split(' - ')[1]
      const points = $(el)
        .find('.playerSeasonTotal')
        .text();
      data2019.write(`${year}, ${name}, ${team}, ${position}, ${points} \n`);
    });
    console.log('Scraping Done...')
  }
})

request('https://fantasy.nfl.com/research/scoringleaders?position=O&statCategory=stats&statSeason=2018&statType=seasonStats', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    $('tbody tr').each((i, el) => {
      const year = 2018
      const name = $(el)
        .find('.playerNameFull')
        .text()
      const position = $(el)
        .find('em')
        .text().split(' - ')[0]
      const team = $(el)
        .find('em')
        .text().split(' - ')[1]
      const points = $(el)
        .find('.playerSeasonTotal')
        .text();
      data2018.write(`${year}, ${name}, ${team}, ${position}, ${points} \n`);
    });
    console.log('Scraping Done...')
  }
})

request('https://fantasy.nfl.com/research/scoringleaders?position=O&statCategory=stats&statSeason=2017&statType=seasonStats', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    $('tbody tr').each((i, el) => {
      const year = 2017
      const name = $(el)
        .find('.playerNameFull')
        .text()
      const position = $(el)
        .find('em')
        .text().split(' - ')[0]
      const team = $(el)
        .find('em')
        .text().split(' - ')[1]
      const points = $(el)
        .find('.playerSeasonTotal')
        .text()
      data2017.write(`${year}, ${name}, ${team}, ${position}, ${points} \n`);
    });
    console.log('Scraping Done...')
  }
})