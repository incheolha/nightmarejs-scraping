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
    await nightmare.goto('https://news.ycombinator.com/news');

    let articles = await nightmare.evaluate(() => {
      let tableRows = document.querySelectorAll('table[class="itemlist"] > tbody > tr'); 

      let articles = [];
      for (let row of tableRows) {
        if(row.getAttribute('class') == 'spacer') continue;
        if(row.getAttribute('class') == 'athing') {

          // this is the first rowd 있는 내용  scraping하기
            let title = row.querySelector('td[class="title"] > a').innerText;
            let url = row.querySelector('td[class="title"] > a').getAttribute('href');   
            let source = row.querySelector('span[class="sitebit comhead"] > a') ? row.querySelector('span[class="sitebit comhead"] > a').innerText : false;
            
          // 이제는 두번째 row에 있는 내용 scraping하기

            let secondRow = row.nextSibling;

            let points = secondRow.querySelector('span[class="score"]') ? secondRow.querySelector('span[class="score"]').innerText : false;
            let author = secondRow.querySelector('a[class="hnuser"]') ? secondRow.querySelector('a[class="hnuser"]').innerText : false;
            let date = secondRow.querySelector('span[class="age"]') ? secondRow.querySelector('span[class="age"]').innerText : false;
            let comments = secondRow.querySelectorAll('a')[3] ? secondRow.querySelectorAll('a')[2].innerText : false;    //이놈은 array로 구성되었으므로 4번째 array element을 가져와야한다

            articles.push( { title, url, source, points, author, date, comments } );
          
        }
      }
      return articles;
    });
   
    console.log( articles );
    debugger;

  } catch(error) {
    console.log(`Something happended: ${ error }`);
  }

 
})();