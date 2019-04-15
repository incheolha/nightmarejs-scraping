const Nightmare = require('nightmare');
const nightmare = Nightmare({ 
                              show: true,                 // { headless: false }
                              // openDevTools: {
                              //   mode: 'detach'            // devTool 실행시
                              // }
                            }) ; 

(async () => {

  try {
    await nightmare.viewport(1200,600);
    await nightmare.goto('https://learnscraping.com');

// scrollto를 이용하여 자동으로 scrolling 하는 기능
    let height = await nightmare.evaluate(() => document.body.scrollHeight );
    await nightmare.scrollTo(height, 0);

// Wait for a specific selector to be found on a page 
    await nightmare.wait('#selector');

// Click on a selector 
    await nightmare.click('#selector');
// type ust as a normal keyboard would 
    await nightmare.type('#selector', 'String to type');
// return true if selector is found on the page, else false 
    let is_selector = await nightmare.exists('#selector');
// return true if selector is visible and not hidden, else false
    let is_visible = await nightmare.visible('#selector')
// return current Url of the page
    let current_url = await nightmare.url();
// return the current title
    let current_title = await nightmare.current_title();
// return array with all the cookies
    let cookies = await nightmare.cookies.get();
    
  } catch(error) {
    console.log(`Something happended: ${ error }`);
  }

 debugger;
})();