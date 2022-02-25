/**
 * The Server Can be configured and created here...
 *
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data = require("./data");
const http = require("http");
const url = require("url");
const hostname = "localhost";
const port = 3035;

/**
 * Start the Node Server Here...
 *
 * The http.createServer() method creates a new server that listens at the specified port.
 * The requestListener function (function (req, res)) is executed each time the server gets a request.
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
http
  .createServer(function (req, res) {
    // .. Here you can create your data response in a JSON format

    const CORS = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      "Access-Control-Max-Age": 2592000, // 30 days
    };

    const uri = url.parse(req.url, true);
    const method = req.method;
    const query = uri.query;
    let pathname = uri.pathname;
    let id;
    

    console.log(query);
    console.log(pathname);
    
    const splitPath = pathname.split("/");
    console.log(splitPath);

    if (splitPath.length > 2) {
      pathname = `/${splitPath[1]}`;
      id = splitPath[2];
    }

    if ((pathname = "/products" && method === "GET")) {
      res.writeHead(200, {
        "Content-Type": "application/json",
        ...CORS
      });

      if (id) {
        const product = data.find((x) => x._id === id && JSON.parse(x.isActive));
        if (product) {
          res.write(JSON.stringify({ success: true, data: product }));
        } else {
          res.writeHead(400, {
            "Content-Type": "application/json",
            ...CORS
          });
          res.write(
            JSON.stringify({
              success: false,
              errorMessage: "Id not found",
              data: null,
            })
          );
        }
        res.end();
        return;
      } else if (Object.keys(query).length > 0) {
        if (query.search) {
          const regex = new RegExp(query.search, "i");
          const filterProducts = data.filter(
            (product) =>
              (product.name.search(regex) !== -1 ||
              product.about.search(regex) !== -1 ||
              product.tags.some(tag => regex.test(tag))) && JSON.parse(product.isActive)
          );
          res.write(JSON.stringify({ success: true, data: filterProducts }));
          res.end();
        } else {
          res.writeHead(400, {
            "Content-Type": "application/json",
            ...CORS
          });
          res.write(
            JSON.stringify({
              success: false,
              errorMessage: "query param is not available",
              data: null,
            })
          );
          res.end();
        }
      } else {
        res.write(JSON.stringify({ success: true, data }));
        res.end();
      }
      return;
    }

    res.write("response");
    res.end();
    // const headers = {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    //   "Access-Control-Max-Age": 2592000, // 30 days
    // };

    // console.log("req.url", req.url);

    // const uri = url.parse(req.url, true);
    // const query = uri.query;
    // const method = req.method;
    // let pathname = uri.pathname;
    // let id;

    // const splitUri = uri.pathname.split("/");
    // if (splitUri.length >= 3) {
    //   pathname = `/${splitUri[1]}`;
    //   id = splitUri[2];
    // }

    // console.log("pathname", pathname);
    // console.log("method", method);
    // console.log("query", query);
    // console.log("id", id);

    // if (pathname === "/products" && method === "GET") {
    //   res.writeHead(
    //     200,
    //     Object.assign(
    //       {},
    //       {
    //         "Content-Type": "application/json",
    //       },
    //       headers
    //     )
    //   );
    //   if (id) {
    //     const product = data.find((x) => x._id === id);
    //     res.write(JSON.stringify(product));
    //     res.end();
    //   } else if (Object.keys(query).length > 0) {
    //     if (query.search) {
    //       const regex = new RegExp(query.search, "i");
    //       const filterProducts = data.filter(
    //         (x) =>
    //           x.name.search(regex) !== -1 ||
    //           x.about.search(regex) !== -1 ||
    //           x.tags.some((e) => regex.test(e))
    //       );
    //       res.write(JSON.stringify(filterProducts));
    //       res.end();
    //     }
    //     res.end();
    //   } else {
    //     res.write(JSON.stringify(data));
    //     res.end();
    //   }
    //   return;
    // }

    // const uri = url.parse(req.url, true);
    // const method = req.method;
    // let path = uri.pathname;
    // const query = uri.query;

    // const splitPath = path.split("/");

    // console.log("splitPath", splitPath);

    // let params = undefined;

    // res.on("error", (error) => {

    // })

    // if (splitPath.length > 0) {
    //   path = splitPath[1];
    //   params = splitPath[2] || undefined;
    // }

    // res.writeHead(200, { "Content-Type": "application/json" }); // http header
    // if (path === "products" && method === "GET" && params === undefined) {
    //   console.log("query", query);
    //   if (query.search) {
    //     const regex = new RegExp(query.search, "i");
    //     const filterProducts = data.filter(
    //       (x) =>
    //         x.name.search(regex) !== -1 ||
    //         x.about.search(regex) !== -1 ||
    //         x.tags.includes(query.search)
    //     );
    //     res.write(JSON.stringify(filterProducts)); // Write out the default response
    //     res.end(); //end the response
    //   } else {
    //     res.write(JSON.stringify(data)); // Write out the default response
    //     res.end(); //end the response
    //   }
    // }

    // if (path === "products" && method === "GET" && params !== undefined) {
    //   const item = data.find((x) => x._id === params);
    //   if (item) {
    //     res.write(JSON.stringify(item)); // Write out the default response
    //     res.end(); //end the response
    //   }
    // }
  })
  .listen(port);

console.log(`[Server running on ${hostname}:${port}]`);
