# GitHub-Star-Counter

> ✨ City of stars, are you shining just for me?

## What Is It

An API to count a GitHub user's total stars.

> /user/:username - to show a user's total stars and forks of is repositories.

For example: [https://github-star-counter.herokuapp.com/user/idealclover](https://github-star-counter.herokuapp.com/user/idealclover)

Moreover, you can combined it with [shields.io](https://shields.io/) to produce a badge like this:

![](https://img.shields.io/badge/dynamic/json?label=GitHub%20Total%20Stars&query=%24.stars&url=https%3A%2F%2Fgithub-star-counter.herokuapp.com%2Fuser%2Fidealclover)

![](https://img.shields.io/badge/dynamic/json?label=GitHub%20Total%Forks&query=%24.forks&url=https%3A%2F%2Fgithub-star-counter.herokuapp.com%2Fuser%2Fidealclover)

## Deploy

You can easily deploy it yourself.

In order to increase the API rate limit, you can register GitHub auth code [here](https://github.com/settings/tokens)

### On Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Local Deployment

npm/yarn needed

```
git clone https://github.com/idealclover/GitHub-Star-Counter.git
cd GitHub-Star-Counter
yarn && yarn start
```

## LICENSE

Inspired by [yyx990803/starz](https://github.com/yyx990803/starz).

MIT LICENSE. Have fun.