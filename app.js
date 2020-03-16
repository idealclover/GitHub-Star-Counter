const express = require("express");
const https = require("https");
const app = express();


const port = process.env.PORT || 8080;

// Based on yyx990803/starz https://github.com/yyx990803/starz

function request(url) {
  console.log("url: " + url);
  auth = process.env.auth || "";
  console.log(auth);
  const reqOpts = {
    hostname: "api.github.com",
    path: url,
    headers: {
      "User-Agent": "GitHub StarCounter",
    }
  };
  if (auth) reqOpts.headers["Authorization"] = "token " + auth;
  return new Promise(function(resolve, reject) {
    https
      .request(reqOpts, function(res) {
        let body = "";
        res
          .on("data", function(buf) {
            body += buf.toString();
          })
          .on("end", function() {
            resolve(JSON.parse(body));
          })
          .on("error", function (err) {
            reject(err);
          })
      })
      .end();
  });
}

async function getRepos(user, page) {
  const url = "/users/" + user + "/repos?per_page=100&page=" + page;
  const datas = await request(url);
  const rst = {
    forks: 0,
    stars: 0
  };
  datas.forEach(function(data) {
    rst.stars += data.stargazers_count;
    rst.forks += data.forks;
    console.log(data.name + ": " + rst.forks);
  });
  return rst
}

app.get("/user/:username", async function(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  const user = req.params.username;
  const url = "/users/" + user;
  try {
    const datas = await request(url);
    console.log(datas);
    let pageCount = Math.ceil((datas.public_repos / 100));
    const rst = {
      forks: 0,
      stars: 0
    };
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
      pages.push(i);
    }
    await Promise.all(pages.map(async (i) => {
      const datas = await getRepos(user, i + 1);
      rst.forks += datas.forks;
      rst.stars += datas.stars;
    }));
    res.send(rst);
  } catch (e) {
    console.log(e);
    res.send(e.toString());
  }
});

app.listen(port, function() {
  console.log("GitHub StarCounter listening on port " + port);
});
