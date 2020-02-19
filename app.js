var express = require("express");
var https = require("https");
var app = express();


// var auth = require('./auth');

// Based on yyx990803/starz https://github.com/yyx990803/starz

function request(url) {
  console.log("url: " + url);
  auth = (typeof(process.env.auth) == undefined) ?  "" : process.env.auth
  console.log(auth);
  var reqOpts = {
    hostname: "api.github.com",
    path: url,
    headers: {
      "User-Agent": "GitHub StarCounter",
      "auth": auth
    }
  };
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
          });
      })
      .end();
  });
}

function getRepos(user, page) {
  return new Promise(function(resolve, reject) {
    let url = "/users/" + user + "/repos?per_page=10&page=" + page;
    request(url).then(function(datas) {
      let rst = {
        forks: 0,
        stars: 0
      };
      datas.forEach(function(data) {
        rst.stars += data.stargazers_count;
        rst.forks += data.forks;
        console.log(data.name + ": " + rst.forks);
      });
      resolve(rst);
    });
  });
}

app.get("/user/:username", function(req, res) {
  let user = req.params.username;
  let url = "/users/" + user;
  request(url).then(function(datas) {
    console.log(datas);
    let pages = Math.ceil(datas.public_repos / 10);
    let rst = {
      forks: 0,
      stars: 0
    };
    for (let i = 0; i < pages; i++) {
      getRepos(user, i + 1).then(function(datas) {
        rst.forks += datas.forks;
        rst.stars += datas.stars;
        pages--;
        if (!pages) res.send(rst);
      });
    }
  });
});

app.listen(80, function() {
  console.log("GitHub StarCounter listening on port 80!");
});
