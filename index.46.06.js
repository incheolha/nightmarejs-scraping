const ycombinator = require('./ycombinators');

(async () => {

  await ycombinator.initialize();

  let articles = await ycombinator.getArticles(50);
  console.log(articles);
  debugger;
})();