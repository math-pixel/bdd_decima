const csvtojsonV2=require("csvtojson/v2");

let jsonObject 
let promises = []
let namePassenger;




/**
 *
 * @param client Axios
 * @returns {Promise<void>}
 */
module.exports = async function (client) {

    await client.request({
        method: "DELETE",
        url: '/titanic_mathieu',
        params: {format: "json"}
    });
    // Show all the data
    console.log("Successfully delete db".black.bgRed)

    await client.request({
        method: "PUT",
        url: '/titanic_mathieu',
        params: {format: "json"}
    });
    console.log("Successfully create db ".black.bgGreen);

    jsonObject = await csvtojsonV2().fromFile("./titanic-full.csv")

    for (const iterator of jsonObject) {
            
        namePassenger = iterator.Name.split(",")
        let tempData = {
            passengerInfo : {
                passengerId : parseInt(iterator.PassengerId),
                firstname : namePassenger[0],
                lastname : namePassenger[1],
                age : parseInt(iterator.Age),
                sex : iterator.Sex,
                sibSp : parseInt(iterator.sibSp),
                homeTown : iterator.Hometown,
                pclass : parseInt(iterator.Pclass),
                survived : Boolean(parseInt(iterator.Survived)),
            },
            ticketInfo : {
                num : parseInt(iterator.Ticket),
                fare : parseInt(Math.round(parseFloat(iterator.Fare) * 100)),
                cabin : iterator.Cabin,
                class : parseInt(iterator.Class)
            },
            boatInformation : {
                embarked : iterator.Embarked,
                startTown : iterator.Boarded,
                destination : iterator.Destination,
            },
            lifeboat : parseInt(iterator.Lifeboat),
            bodyId : parseInt(iterator.Body)
        }
        // console.log("tempdata" , tempData)
        promises.push(
            client.request({
                method: "POST",
                url: '/titanic_mathieu/_doc',
                data: tempData
            })
        )
    }
    
    let result = await Promise.all(promises)
    // for (const indexInfo of result) {
    //     console.log(indexInfo.index+" => "+ indexInfo.health)
    // }
    console.log("🎉 Exercice 0 is a sample on how to create a new file ".black.bgGreen);

}