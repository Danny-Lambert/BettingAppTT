// import { response } from "express";

// import { response } from "express";

const sendToMongo =  (result) => {
    console.log("I'm going to submit");
    // 3. TODO!! Let's make POST request to our API...
    // *********************************
    const fetchOptions = {
      // This is a POST Request
        method: 'POST',
      // We are gonna send JSON
        headers: { 'Content-Type': 'application/json' },
      // Data goes in the body
      body: JSON.stringify({"name": result}) // this is the data which we are sending inside the post request 
    }
    fetch('http://localhost:8080/create', fetchOptions)// this is referring to line 35 where we dont want to fetch, we want to post 
        .then(res => res.json())
        .then(res => {
            console.log("YAY WE GOT OUR RESPONSE BACK....")
        // handleFetch(); /// dont think we need this as we dont need to bring anything back 
      })
}
const sportData = () => {
fetch("https://api.the-odds-api.com/v3/sports/?apiKey=a8c3c43277cb3421d02ab70bba310be8")
    .then((response) => {
        if( !response.ok){
            throw Error ("Something went wrong")
        }
        return response.json();
    })
    .then ((jsonResponse) => {
        const sportsData = jsonResponse.data.map(sport => {
            console.log(sport.group)
            sendToMongo(sport.group)
            return `<li> ${sport.group} - ${sport.details} </li>`
        })
        document.querySelector(".sportsAvailable").innerHTML = sportsData;
        // object.addEventListener("load", sendToMongo);
    })
    // .then ((jsonResponse) => {
    //     jsonResponse.data.map(sport => console.log(sport))
    // })
    .catch((error) => {
        throw Error ("error")
    })
    
}
sportData ();


const inPlay = () => {
    fetch("https://api.the-odds-api.com/v3/odds/?sport=upcoming&region=uk&mkt=h2h&apiKey=a8c3c43277cb3421d02ab70bba310be8")
        .then((response) => {
            if( !response.ok){
                throw Error ("Something went wrong")
            }   
            return response.json();
        })
            .then ((jsonResponse) => {
                // console.log(jsonResponse.data)
                const result = []
                const inPlayFixtures = jsonResponse.data.map(upcoming => {
                    console.log(upcoming.teams)
                    return `
                    <div class = "inPlayGames"> 
                    <p class = "fixtures"> ${upcoming.sport_nice} fixture - ${upcoming.teams[0]} vs ${upcoming.teams[1]}  </p>
                    <p class = "upcomingOdds"> ${upcoming.sites[0].site_nice} Odds - Home win (${upcoming.sites[0].odds.h2h[0]}) Draw (${upcoming.sites[0].odds.h2h[2]}) Away win (${upcoming.sites[0].odds.h2h[1]}) <p/>
                    <p class = "upcomingOdds"> ${upcoming.sites[1].site_nice} Odds - Home win (${upcoming.sites[1].odds.h2h[0]}) Draw (${upcoming.sites[0].odds.h2h[2]}) Away win (${upcoming.sites[0].odds.h2h[1]}) <p/>
                    </div>
                    `
                    // .then ((inPlayFixtures.sendToMongo))
                    
                
                })
                        document.querySelector(".upcomingFixtures").innerHTML = inPlayFixtures;
                        // console.log (result)
                })
                .catch((error) => {
                    throw Error ("error")
    })
}
    inPlay ();


    setInterval(sportData,3600000) // Refresh the Sports available every hour 
    // setInterval(inPlay, 100) // Would update the scores every second to give updated odds on inplay but would demand alot of API requests

    const premierLeagueOdds = () => {
        fetch("https://api.the-odds-api.com/v3/odds/?apiKey=a8c3c43277cb3421d02ab70bba310be8&sport=soccer_epl&region=uk&mkt=h2h")
        .then((response) => {
            if( !response.ok){
                throw Error ("Something went wrong")
            }   
            return response.json();
        })
        .then ((jsonResponse) => {
                // console.log(jsonResponse.data)
    
        const premLeagueFixt = jsonResponse.data.map(premierLeague => {
            return ` 
            <div class= "premierLeagueUpdatedOdds">
            <p class="fixtures2title"> ${premierLeague.teams[0]} vs ${premierLeague.teams[1]}</p>
            <p class="fixtures2"> ${premierLeague.sites[0].site_nice} - Home win (${premierLeague.sites[0].odds.h2h[0]}) Draw (${premierLeague.sites[0].odds.h2h[2]}) Away win (${premierLeague.sites[0].odds.h2h[2]})</p>
            <p class="fixtures2"> ${premierLeague.sites[1].site_nice} - Home win (${premierLeague.sites[1].odds.h2h[0]}) Draw (${premierLeague.sites[1].odds.h2h[2]}) Away win (${premierLeague.sites[1].odds.h2h[2]})</p>
            </div>
            `
        })

            document.querySelector(".premierLeagueFixtures").innerHTML = premLeagueFixt;
        })
            .catch((error) => {
                throw Error ("error")
})}
premierLeagueOdds ();

const testFetch = () => {
    console.log("working");
    fetch("http://localhost:8080")
    .then((response) => {
        return response.json()
        console.log (response)
})  .then ((response) => (console.log(response)
))
}
testFetch();