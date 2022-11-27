const puppeteer = require("puppeteer");
const cheerio = require("cheerio");


let j = 1;
async function config(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url + `${j}`);
  j++;
  return page;
}

let answer = [];
let len = 0;
async function scrapper(page, url) {
  await page.reload();
  let html = await page.evaluate(() => document.body.innerHTML);
  let $ = cheerio.load(html);
  $("tr", html).each(function () {
    len++;
    let id = $("td.id-cell a",this).text()
    let q = $("td.status-small a", this).text().trim();
    let status = $("td.status-cell > span > span", this).text();
    let temp = {
      id:id,
      question: q,
      status: status,
    };
    if (temp["question"] != "") {
      answer.push(temp);
    }
  });
  while (len == 2) {                 // 53
    len = 0;
    await page.goto(url + `${j}`);
    j++;
    await page.reload();
    html = await page.evaluate(() => document.body.innerHTML);
    //   console.log(html);
    $ = cheerio.load(html);
    $("tr", html).each(function () {
      len++;
      let q = $("td.status-small a", this).text().trim();
      let status = $("td.status-cell > span > span", this).text();
      let temp = {
        question: q,
        status: status,
      };
      if (temp["question"] != "") {
        answer.push(temp);
      }
    });
    // break;
  }
}

async function monitor(url) {
  let page = await config(url);
  await scrapper(page, url);

}

async function run(username){
    await monitor(
            `https://codeforces.com/submissions/${username}/page/`
          );

        //   answer = JSON.stringify(answer);
          // console.log(answer);
          return answer;
        
}

// (async () => {
//   await monitor(
//     `https://codeforces.com/submissions/${usernameOfCodeForces}/page/`
//   );
//   //   console.log(len);

//   answer = JSON.stringify(answer);
//   console.log(answer);
// })();

module.exports = {run}
