const {exit} = require('process');
const colors = require('colors');
const axios = require("axios");
const {config} = require("dotenv");
require('dotenv').config();


function getClient() {
    const clientURL = process.env.ELASTIC_URL;
    return axios.create({
        baseURL: clientURL,
        headers: {
            common: {
                "content-type": "application/json"
            }
        }
    });

}

(async () => {
    const client = getClient();

    try {
        const result = await client.request({
            method: "GET",
            url: "/",
        });
        if(result.status!==200){
            throw result.data;
        }
        console.log(`👑 Elasticsearch is up`.green);

        const cmd = process.argv.slice(2)[0];
        let exercice = null;
        try {
            exercice = require(`./exercices/${cmd}.js`);
            console.log(`🦊 Exercice ${cmd} found`.green);

        } catch (error) {
            console.error(`😭 Cannot find ${cmd}.js in exercices or ${cmd} contains errors`.white.bgRed.bold);
            console.debug(error);
            exit(100)
        }
        console.log(`🍣 Starting ${cmd}`.green);
        try {
            await exercice(client);
        } catch (error) {
            console.log(`😱 An error occured`.red.bold);
            console.log(error);
        }
    } catch (error) {
        console.error(`😱 Something went wrong`.white.bgRed.bold);
        console.error(error);


    } finally {
        console.log(`👋 Closing Elasticsearch`.gray);
        exit(0);
    }


})();
