//error message
const error = () => {
    document.getElementById('error').innerText = 'Loading Timeout player not found'
}

// load api
const allPlayers = () => {
    //display players clear
    document.getElementById('players').textContent = ''
    document.getElementById('details').textContent = ''
    document.getElementById("female-img").style.display = "none";
    document.getElementById("male-img").style.display = "none";
    // spinner starts
    document.getElementById('spinner').style.display = 'block'
    const searchValue = document.getElementById('search-box').value;
    if (searchValue == '') {
        alert('Search by player name')
        // spinner stops
        document.getElementById('spinner').style.display = 'none'
    }
    else {
        const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.player != null) {
                    return displayPlayers(data.player);
                } else {
                    setTimeout(error, 5000);
                }
            });
    }
    document.getElementById('search-box').value = ''
}
// display all players
const displayPlayers = players => {
    // spinner stops
    document.getElementById('spinner').style.display = 'none'
    // console.log(players)
    players.forEach(player => {
        const playersDiv = document.getElementById('players')
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card my-3">
        <img src="${player.strThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5>Name:${player.strPlayer}</h5>
            <h5>Country:${player.strNationality}</h5>
            <div class="all-btn py-3">
                <button type="button" class="btn btn-danger delete-btn">Delete</button>
                <button onclick="details('${player.idPlayer
            }')" type="button" class="btn btn-success">Details</button>
            </div>
        </div>
    </div>
        `
        playersDiv.appendChild(div)
        // for delete btn
        const deleteBtn = document.getElementsByClassName("delete-btn");
        // console.log(deleteBtn)
        for (const button of deleteBtn) {
            button.addEventListener("click", (e) => {
                // console.log(e.target.parentNode.parentNode.parentNode)
                e.target.parentNode.parentNode.parentNode.style.display = "none";
            });
        }
    });
}
// player details api 
const details = id => {
    // spinner starts
    document.getElementById('spinner').style.display = 'block'
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.players[0]))
}
const displayDetails = info => {
    // spinner stops
    document.getElementById('spinner').style.display = 'none'
    // console.log(info)
    if (info.strGender == "Male") {
        document.getElementById("female-img").style.display = "none";
        document.getElementById("male-img").style.display = "block";
    } else {
        document.getElementById("female-img").style.display = "block";
        document.getElementById("male-img").style.display = "none";
    }
    document.getElementById('details').innerHTML = `<div class="player-details">
        <div class="profile-pic w-50 m-auto rounded">
            <img class="w-75 mb-2" src="${info.strThumb}" alt="">
        </div>
        <h2>Name: ${info.strPlayer}</h2>
        <h3>Country:${info.strNationality} </h3>
        <h4>Gender: ${info.strGender}</h4>
        <p>${info.strDescriptionEN.slice(0, 200)}</p>
    </div>`

}