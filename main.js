const cssCode = `
.gamebar {
    background-color: rgb(42, 42, 42);
    height: 35px;
    font-family: Proxima-Soft-Bold;
    font-size: 20px;
    padding: 8px;
    display: flex;
}

.gamebar-name {
    position: absolute;
    left: 50%;
    translate: -50%;
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
    width: 20px;
    height: 20px;
}

.gamebar-fulltoggle > svg {
    width: 18px;
    height: 18px;
}

.field-game {
    display: block !important;
}

#html5game {
    transition-duration: 400ms;
    transition-timing-function: ease-in-out;
}

.gamebar-search-div {
    margin-top: -4px;
}

.gamebar-search-input {
    border: 0px;
    outline: 0px;
    font-size: 15px;
    width: 100px;
    padding: 3px;
    background: transparent;
    color: white;
}

.gamebar-search-results {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    font-size: 15px;
    font-family: 'Proxima-Soft-Regular';
    background-color: rgb(42, 42, 42);
    border-radius: 0px 0px 5px 5px;
    padding: 4px;
    padding-bottom: 0px;
    width: 162px;
}

.gamebar-search-results > a {
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
	<p onclick="togglefull()" class="gamebar-fulltoggle">
		<svg class="gamebar-fulltoggle-full" viewBox="0 0 512 512">
			<path fill="white" d="M512 160l-32 32-52-52L328 240l-56-56L372 84 320 32 352 0H512V160zM0 352l32-32 52 52L184 272l56 56L140 428l52 52-32 32H0V352z"></path>
		</svg>
		<svg class="gamebar-fulltoggle-unfull" viewBox="0 0 512 512" style="display: none;">
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
    
    var gamebarUnfull = document.querySelectorAll(".gamebar-fulltoggle-unfull")[0]
    var gamebarFull = document.querySelectorAll(".gamebar-fulltoggle-full")[0]
    
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
            
            // Set icon for full/unfull
            gamebarUnfull.style.display = ""
            gamebarFull.style.display = "none"
        }
    } else {
        // Remove fullscreen size
        iframe.style.width = "";
        iframe.style.height = "";
        
        // Set icon for full/unfull
        gamebarFull.style.display = ""
        gamebarUnfull.style.display = "none"
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

function onsearchbarchange() {
    let results = searchForGames(document.querySelectorAll(".gamebar-search-input")[0].value)
    
    let i = 0
    document.querySelectorAll(".gamebar-search-results")[0].innerText = ""
    results.forEach(e => {
        if (i > 10) {
            return
        }
	    
        document.querySelectorAll(".gamebar-search-results")[0].innerHTML += "<a href=" + "https://www.coolmathgames.com" + e.alias + ">" + e.title + "</a>" + "<br>"
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
