
const Nightmare = require('nightmare');
const nightmare = Nightmare({
                    show: true
});

( async () => {

                await nightmare.goto('https://learnscraping.com/blog');
                await nightmare.inject('js','./jquery-3.3.0.min.js');
                let title = await nightmare.evaluate( () => {
                  return $('p[class="site-title"]').text();
                })

                debugger;
})();