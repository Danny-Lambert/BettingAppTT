
const sendToMongo =  (result, endpointExt) => {
    console.log("I'm going to submit");
    console.log(result)
    const fetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"name": result}) 
    }
    fetch(`http://localhost:8080/create${endpointExt}`, fetchOptions)
        .then(res => res.json())
        .then(res => {
            console.log("WE GOT OUR RESPONSE BACK....")
    })
}
const sportData = () => {
fetch(`https://api.the-odds-api.com/v3/sports/?apiKey=a8c3c43277cb3421d02ab70bba310be8`)
    .then((response) => {
        if( !response.ok){
            throw Error ("Something went wrong")
        }
        return response.json();
    })
    .then ((jsonResponse) => {
        const sportsData = jsonResponse.data.map(sport => {
            console.log(sport.group)
            sendToMongo(sport.group, "Sports")
            return `
            <div class = "allSports"> 
            <li class= "listSports"> ${sport.group} - ${sport.details} </li>
            </div>
            `
        })
        document.querySelector(".sportsAvailable").innerHTML = sportsData;
    })
    .catch((error) => {
        throw Error ("error")
    })
    
}
sportData ();


const inPlay = () => {
    fetch(`https://api.the-odds-api.com/v3/odds/?sport=upcoming&region=uk&mkt=h2h&apiKey=a8c3c43277cb3421d02ab70bba310be8`)
        .then((response) => {
            if( !response.ok){
                throw Error ("Something went wrong")
            }   
            return response.json();
        })
            .then ((jsonResponse) => {
                const result = []
                const inPlayFixtures = jsonResponse.data.map(upcoming => {
                    console.log(upcoming.teams)
                    sendToMongo(upcoming.teams, "Fixtures")
                    return `
                    <div class = "inPlayGames"> 
                    <p class = "fixtures"> ${upcoming.sport_nice} fixture - ${upcoming.teams[0]} vs ${upcoming.teams[1]}  </p>
                    <p class = "upcomingOdds"> ${upcoming.sites[0].site_nice} Odds - Home win (${upcoming.sites[0].odds.h2h[0]}) Draw (${upcoming.sites[0].odds.h2h[2]}) Away win (${upcoming.sites[0].odds.h2h[1]}) <p/>
                    <p class = "upcomingOdds"> ${upcoming.sites[1].site_nice} Odds - Home win (${upcoming.sites[1].odds.h2h[0]}) Draw (${upcoming.sites[0].odds.h2h[2]}) Away win (${upcoming.sites[0].odds.h2h[1]}) <p/>
                    </div>
                    `                 
                
                })
                        document.querySelector(".upcomingFixtures").innerHTML = inPlayFixtures;
                })
                .catch((error) => {
                    throw Error ("error")
    })
}
    inPlay ();


    setInterval(sportData,3600000) // Refresh the Sports available every hour 
    // setInterval(inPlay, 100) // Would update the scores every second to give updated odds on inplay but would demand alot of API requests

    const premierLeagueOdds = () => {
        fetch(`https://api.the-odds-api.com/v3/odds/?apiKey=a8c3c43277cb3421d02ab70bba310be8&sport=soccer_epl&region=uk&mkt=h2h`)
        .then((response) => {
            if( !response.ok){
                throw Error ("Something went wrong")
            }   
            return response.json();
        })
        .then ((jsonResponse) => {
    
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
