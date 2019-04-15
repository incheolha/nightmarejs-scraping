const Nightmare = require('nightmare');

let nightmare = null;

const ycombinator = {
    
    initialize : async() => {
        nightmare = Nightmare({ 
            show: true,                 // { headless: false }
            // openDevTools: {
            //   mode: 'detach'            // devTool 실행시
            // }
          }) ; 
    },
    getArticles : async (limit = 30 ) => {

        try {
          await nightmare.viewport(1200,600);
          await nightmare.goto('https://news.ycombinator.com/news');
      
          let articles = [];
          let isPagenation = null;
          do {
                let new_articles = await nightmare.evaluate(() => {
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
                
                articles = [
                                ...articles,
                                ...new_articles
                ]
    
    // site 가 pagenation으로 구성 되어잇을시 사용

                isPagenation = await nightmare.exists('a[class="morelink"]');
        
                if(isPagenation && articles.length < limit) {
                    await nightmare.click('a[class="morelink"]');
                    await nightmare.wait('table[class="itemlist');  //정상적으로 새로운 페이지 사이트를 로드하는것을 기다린다
                }
        
          } while ( articles.length < limit && isPagenation)

          return articles.splice(0, limit);      // 제한된 숫자 만큼만 array에서 받는다
      
        } catch(error) {
          console.log(`Something happended: ${ error }`);
        }
      
    },

    download: 
      
}

module.exports = ycombinator;