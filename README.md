# TP Elasticsearch
A base code for [Elasticsearch](https://decima.notion.site/Exercice-Elasticsearch-c60285be3e7744e7bdc8515547901e55)

## Requirements
- NodeJS
- Docker with Docker-compose


## Getting started

### Installation
make a copy of `.env.sample` and name it `.env`.
This file is by default configured to run with the docker-compose or local installation.

Then run `yarn` or `npm install` depending on your environment.

### Start Elasticsearch with Docker

Start Elasticsearch server using `docker-compose up -d`. Elasticsearch port is `9200` and kibana is `5601`.


### Usage

Every exercices should be stored in exercices folder.
To run them just run the following command : 

```
npm run start ex0
```

If you have `yarn` you can run
```
yarn start ex0
```
It will automatically use the file `./exercices/ex0.js`.

In the Exercices folder, you can find a `ex0.js`, a sample for you to create new exercices.

All exercices can be found on [learn.henri.run](https://decima.notion.site/Exercice-Elasticsearch-c60285be3e7744e7bdc8515547901e55)

---

### Datasets

- Spotify
- my dataset on titanic
