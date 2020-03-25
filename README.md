# GitHub-Star-Counter

> ✨ City of stars, are you shining just for me?

## What Is It

An API to count a GitHub user's total stars.

> /user/:username - to show a user's total stars and forks of is repositories.

For example: [https://api.github-star-counter.workers.dev/user/idealclover](https://api.github-star-counter.workers.dev/user/idealclover)

Heroku version: [https://github-star-counter.herokuapp.com/user/idealclover](https://github-star-counter.herokuapp.com/user/idealclover)

Moreover, you can combined it with [shields.io](https://shields.io/) to produce a badge like this:

![](https://img.shields.io/badge/dynamic/json?logo=github&label=GitHub%20Stars&style=for-the-badge&query=%24.stars&url=https://api.github-star-counter.workers.dev/user/idealclover)

![](https://img.shields.io/badge/dynamic/json?logo=github&label=GitHub%20Forks&style=for-the-badge&query=%24.forks&url=https://api.github-star-counter.workers.dev/user/idealclover)

Sometimes due to slow network, the pictures above could not show correctly, here are the static version:

![](https://github.com/idealclover/GitHub-Star-Counter/raw/master/assets/pic1.svg?sanitize=true)

![](https://github.com/idealclover/GitHub-Star-Counter/raw/master/assets/pic2.svg?sanitize=true)

## Deploy

### On Heroku

In order to increase the API rate limit, you can register GitHub auth code [here](https://github.com/settings/tokens)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/idealclover/GitHub-Star-Counter/tree/heroku)

### On Cloudflare Worker

This is a serverless function deployed on Cloudflare Workers. Please check: [Quick Start | Cloudflare Workers](https://developers.cloudflare.com/workers/quickstart) if you want to deploy or contribute.

## LICENSE

Inspired by [yyx990803/starz](https://github.com/yyx990803/starz).

Thanks for strong support by [fengkx](https://github.com/fengkx)!

MIT LICENSE. Have fun.