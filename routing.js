const url = require("url");
const http = require("http");
const fs = require("fs");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");
const path = require("path/posix");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const slugs = dataObj.map(el => slugify(el.productName, { lower: true}));
console.log("SLUGS",slugs)

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathName = parsedUrl.pathname;
  const query = parsedUrl.query;
  console.log("pathname", url.parse(req.url, true).pathname);

  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathName === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead("404", {
      "Content-type": "text/html",
      "my-own-header": "hello World",
    });
    res.end("<h1> 404 page not found :(</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to request on port 8000");
});
