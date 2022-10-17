const cssCode = `
.gamebar {
    background-color: rgb(42, 42, 42);
    height: 1em;
    display: flex;
}

.gamebar > img {
    height: 1em;
    padding: 0.15em;
}

.gamebar-name {
    position: absolute;
    left: 50%;
    translate: -50%;
    line-height: 1em;
    font-size: 0.85em;
    padding: 0.1em;
}

.gamebar-right {
    display: flex;
    flex-wrap: nowrap;
    gap: 8px;
    margin-left: auto;
}

.gamebar-right > p {
    cursor: pointer;
}

.gamebar-toggle > svg {
    height: 1em;
    width: 1em;
    padding: 0.15em;
}

.gamebar-fulltoggle > svg {
    height: 1em;
    width: 1em;
    padding: 0.15em;
}

.gamebar-fulltoggle[data-icon="full"] .gamebar-fulltoggle-full {
    display: block;
}

.gamebar-fulltoggle[data-icon="full"] .gamebar-fulltoggle-unfull {
    display: none;
}

.gamebar-fulltoggle[data-icon="unfull"] .gamebar-fulltoggle-unfull {
    display: block;
}

.gamebar-fulltoggle[data-icon="unfull"] .gamebar-fulltoggle-full {
    display: none;
}

.field-game {
    display: block !important;
    font-family: Proxima-Soft-Bold;
    font-size: 30px;
}

#html5game {
    transition-duration: 400ms;
    transition-timing-function: ease-in-out;
}

.gamebar-search-div {
    margin-top: -0.25em;
}

.gamebar-search-input {
    border: 0px;
    outline: 0px;
    font-size: 0.5em;
    width: 100px;
    padding: 3px;
    background: transparent;
    color: white;
}

.gamebar-search-results {
    margin-top: -0.25em;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    font-size: 0.5em;
    font-family: 'Proxima-Soft-Regular';
    background-color: rgb(42, 42, 42);
    border-radius: 0px 0px 5px 5px;
    padding: 4px;
    padding-bottom: 0px;
    width: calc(100px + 4em + 8px + 8px);
}

.gamebar-search-results > a {
    cursor: pointer;
    text-decoration: none;
    color: white;
}
`

const gamebarInnerHtmlCode = `
<img src="https://www.coolmathgames.com/pwa/images/icon-128x128.png">
<p class="gamebar-name">GAME NAME</p>
<div class="gamebar-right">
	<div class="gamebar-search-div">
		<input class="gamebar-search-input" oninput="onsearchbarchange()" placeholder="Search">
		<div class="gamebar-search-results"></div>
	</div>
	<p onclick="togglemax()" class="gamebar-toggle">
		<svg viewBox="0 0 448 512">
			<path fill="white" d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"></path>
		</svg>
	</p>
	<p onclick="togglefull()" class="gamebar-fulltoggle" data-icon="full">
		<svg class="gamebar-fulltoggle-full" viewBox="0 0 512 512">
			<path fill="white" d="M512 160l-32 32-52-52L328 240l-56-56L372 84 320 32 352 0H512V160zM0 352l32-32 52 52L184 272l56 56L140 428l52 52-32 32H0V352z"></path>
		</svg>
		<svg class="gamebar-fulltoggle-unfull" viewBox="0 0 512 512">
			<path fill="white" d="M272 80l32-32 52 52L456 0l56 56L412 156l52 52-32 32H272V80zM240 432l-32 32-52-52L56 512 0 456 100 356 48 304l32-32H240V432z"></path>
		</svg>
	</p>
</div>
`

var isFull = false
var isMax = false
var gamediv = undefined
var background = undefined

var gamesJson = "https://www.coolmathgames.com/sites/default/files/cmatgame_games_with_levels.json";

var gamesJsonRequest = new XMLHttpRequest();
gamesJsonRequest.open("GET", gamesJson, false);
gamesJsonRequest.send();

var games = JSON.parse(gamesJsonRequest.responseText);

if (window.location.host == "www.coolmathgames.com" && !window.location.pathname.endsWith("/play")) {
} else {
    throw new Error("Not on coolmathgames")
}

function newgamebar(image) {
    const fieldGame = document.querySelectorAll(".field-game")[0]

    // Create and add gamebar element to field-game
    var gamebarElem = document.createElement("div")
    gamebarElem.className = "gamebar"
    gamebarElem.innerHTML = gamebarInnerHtmlCode
    
    fieldGame.prepend(gamebarElem)
    
    // Create and add style element to field-game
    var cssElem = document.createElement("style")
    cssElem.innerHTML = cssCode
    
    fieldGame.appendChild(cssElem)

    // Get the game name for the gamebar
    const arr = window.location.pathname.replace("/0-", "").replaceAll("-", " ").split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    // Set the game name for the gamebar
    document.querySelectorAll(".gamebar-name")[0].innerText = arr.join(" ")
    
    // Change iframe1 to iframe
    try {
	const gameIframe = document.querySelectorAll("iframe1")[0]
        
	gameIframe.outerHTML = gameIframe.outerHTML.replaceAll(gameIframe.localName, "iframe")
    } catch(err) {}
    
    // Remove padding, margin and border from the game iframe
    setTimeout(function() {
        document.querySelectorAll("#html5game")[0].contentDocument.body.style=`
            padding: 0px;
            margin: 0px;
            border: 0px;
        `
    }, 300)

    // Make a copy of the gamediv
    gamediv = fieldGame
    
    // Set global background varible
    background = image
}

function togglefull() {
    var iframe = document.querySelectorAll("#html5game")[0]
    var gamebar = document.querySelectorAll(".gamebar")[0]
    
    var gamebarFullToggle = document.querySelectorAll(".gamebar-fulltoggle")[0]
    
    if (!isFull) {
        var iframeWidth = parseInt(iframe.width);
        var iframeHeight = parseInt(iframe.height);
        var windowWidth = parseInt(document.body.clientWidth*0.9);
        var windowHeight = parseInt(document.body.clientHeight*0.9-gamebar.clientHeight);

        if (document.body.classList.contains("game-scalable")) {
            if (iframeHeight > windowHeight) {
                var ratio = iframeHeight / windowHeight;
            } else {
                var ratio = windowHeight / iframeHeight;
            }

            // Calculating game width based on window height
            var gameWidth = iframeWidth * ratio;

            // Apply new width and height to iframe
            iframe.style.width = gameWidth + "px";
            iframe.style.height = windowHeight + "px";
            
            // Change icon for unfull
            gamebarFullToggle.setAttribute("data-icon", "unfull")
        }
    } else {
        // Remove fullscreen size
        iframe.style.width = "";
        iframe.style.height = "";
        
        // Set icon for full
        gamebarFullToggle.setAttribute("data-icon", "full")
    }
    
    // Toggle isFull var
    isFull = !isFull
}

function togglemax() {	
    if (!isMax) {
        // Empty body and add gamediv
        document.body.innerHTML = gamediv.outerHTML

        // Modify body css	    
        document.body.style = `
            background-image: url("` + background + `");
            background-size: cover;
            background-repeat: no-repeat;
	    
	    display: flex;
            justify-content: center;
            align-items: center;
        `
    } else {
        window.location = window.location
    }
    // Toggle isMax var
    isMax = !isMax
}

function onsearchitemclick(elem) {
    changegame(elem.getAttribute("data-url"))

    document.querySelectorAll(".gamebar-search-input")[0].value = ""

    document.querySelectorAll(".gamebar-search-results")[0].innerText = ""
}

function onsearchbarchange() {
    let results = searchForGames(document.querySelectorAll(".gamebar-search-input")[0].value)
    let searchResultsDiv = document.querySelectorAll(".gamebar-search-results")[0]
    
    let i = 0
    searchResultsDiv.innerText = ""
    results.forEach(e => {
        if (i > 10) {
            return
        }

	let linkElem = document.createElement("a")

        linkElem.innerHTML = e.title
	linkElem.setAttribute("data-url", e.alias)
	linkElem.setAttribute("onclick", "onsearchitemclick(this)")

	searchResultsDiv.appendChild(linkElem)

        searchResultsDiv.innerHTML += "<br>"

        i += 1
    })
}

function searchForGames(name) {
    if (games !== undefined && games.length > 1) {
        let regex = new RegExp(name, "i");
        let gamesFound = games.filter(game => {
            return regex.test(game.title);
        });

        if (gamesFound.length === games.length) {
            return [];
        };
        
        return gamesFound;
    };
};

function changegame(url) {
    let arr = url.replace("/0-", "").replaceAll("-", " ").split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    document.querySelectorAll(".gamebar-name")[0].innerText = arr.join(" ")

    document.querySelectorAll("#html5game")[0].src = "https://www.coolmathgames.com" + url + "/play"

    document.querySelectorAll("title")[0].text = arr.join(" ") + " - Play it Online at Coolmath Games"

    history.pushState({
        id: url.replace("/0-", ""),
        source: "web"
    }, arr.join(), "https://www.coolmathgames.com" + url)
}
