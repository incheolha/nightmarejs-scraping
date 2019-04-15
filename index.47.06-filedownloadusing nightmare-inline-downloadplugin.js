
const Nightmare = require('nightmare');
require('nightmare-inline-download')(Nightmare);
const nightmare = Nightmare({
                    show: true
});

( async () => {

                await nightmare.goto('https://github.com/segmentio/nightmare');
                await nightmare.click('a[href="/segmentio/nightmare/archive/master.zip"]')
                let download = await nightmare.download('./code.zip');

                console.log(download);
                debugger;
})();