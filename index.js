var Search = require('./lib/search'),
    Scraper = require('./lib/scraper'),
    Store = require('./lib/store'),
    Pager = require('./lib/pager'),
    _ = require('underscore'),
    moment = require('moment'),
    limit,
    search,
    scraper,
    store,
    count = 0;


console.log("Inicio en %s", process.env.ALAVETELI);

search  = new Search(process.env.ALAVETELI);
scraper = new Scraper(process.env.ALAVETELI);
store   = new Store(process.env.ALAVETELI);

search.on('request', function(uri, original) {
    console.log("URI %s linked to from %s", uri, original);
    scraper.push(uri);
});

scraper.on('data', function(data) {
    console.log("scraper on data, line 25");
    if (moment(data.created_at) > limit) {
        console.log("Saving request #%s from %s with the date %s", ++count, data.url_title, data.created_at);
        store.save(data);
    }
});

scraper.on('finish', function() {
    console.log("scraper on finish, line 33");    
    var now = moment(),
        restart = moment().add(7, 'days');

    new Pager(process.env.USER, process.env.REPO, process.env.TOKEN).write(store);

    _.delay(crawl, restart.valueOf() - now.valueOf());
});

function crawl() {
    console.log("crawling, line 43");
    store.clear();
    limit = moment().subtract(12, 'months');
    search.start(12);
}

crawl();

console.log("fin")