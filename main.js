var isFull = false
var isMax = false
var gamediv = undefined
var background = undefined

try {
    jQuery()
} catch {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://code.jquery.com/jquery-3.6.1.min.js", false);
    xhttp.send();
    eval(xhttp.responseText);
}

if (window.location.host == "www.coolmathgames.com" && !window.location.pathname.endsWith("/play")) {
} else {
    throw new Error("Not on coolmathgames")
}

function newgamebar(image) {
    // Create the gamebar
    $(".field-game").prepend(
        $("<div>").css({
            "background-color": "rgb(42, 42, 42)",
            "height": "35px",
            "font-family": "Proxima-Soft-Bold",
            "font-size": "20px",
            "padding": "8px",
            "display": "flex"
        }).attr("class", "gamebar").append(
            $("<img>").attr("src", "https://www.coolmathgames.com/pwa/images/icon-128x128.png").css("margin-right", "8px")
        ).append(
            $("<p>").text("GAME NAME").attr("class", "gamebar-name").css({
                "position": "relative",
                "left": "50%",
                "transform": "translate(calc(-50% - 19px), 0px)"
            })
        ).append(
            $("<p>").click(togglemax).attr("class", "gamebar-toggle").css({
                "position": "sticky",
                "left": "100%",
                "cursor": "pointer"
            }).append(
                $("<svg>").html(
                    '<path fill="white" d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z"/>'
                ).attr("viewBox", "0 0 448 512").css({
                    "width": "20px",
                    "height": "20px"
                })
            )
        ))

    // Make svg show
    $("svg")[0].outerHTML=$("svg")[0].outerHTML+" "

    // Get the game name for the gamebar
    const arr = window.location.pathname.replace("/0-", "").replace("-", " ").split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    // Set the game name for the gamebar
    $(".gamebar-name").text(arr.join(" "))

    // Change gamediv display css property
    $(".field-game").css("display", "block")
    
    // Set gamebar width
    $(".gamebar").css("width", $("#html5game").prop("clientWidth"))

    // Make a copy of the gamediv
    gamediv = $(".field-game").clone()
    
    // Set global background varible
    background = image
}

function togglefull() {
    var iframe = $("#html5game")[0]
    
    if (!isFull) {
        var iframeWidth = parseInt(iframe.width);
        var iframeHeight = parseInt(iframe.height);
        var windowWidth = parseInt($(window).width()*0.9);
        var windowHeight = parseInt($(window).height()*0.9-$(".gamebar").prop("clientHeight"));

        if ($("body").hasClass("game-scalable")) {
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
        }
    } else {
        // Remove fullscreen size
        iframe.style.width = "";
        iframe.style.height = "";
    }
    
    // Set gamebar width
    $(".gamebar").css("width", $("#html5game").prop("clientWidth"))
    
    // Toggle isFull var
    isFull = !isFull
}

function togglemax() {
    if (!isMax) {
        // Empty body and add gamediv
        $("body").empty().append(gamediv)

        // Center the game
        $("body").css({
            "display": "flex",
            "justify-content": "center",
            "align-items": "center"
        })

        // Set background image
        $("body").css({
            "background-image": "url(" + background + ")",
            "background-size": "cover",
            "background-repeat": "no-repeat"
        })

        // Add event listener to toggle button
        $(".gamebar-toggle").click(togglefull)

        // Change iframe1 to iframe
        try {
            $("iframe1")[0].outerHTML=$("iframe1")[0].outerHTML.replaceAll($("iframe1")[0].localName, "iframe")
        } catch(err) {}
    } else {
        window.location=window.location
    }
    // Toggle isMax var
    isMax = !isMax
}
