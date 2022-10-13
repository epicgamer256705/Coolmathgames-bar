var isFull = false

var $ = window.$

function newgamebar(background) {
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
            $("<p>").click(function() {togglefull(background)}).attr("class", "gamebar-toggle").css({
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
    $(".gamebar").css("width", $("#html5game").attr("width"))

    // Make a copy of the gamediv
    var gamediv = $(".field-game").clone()
}


function togglefull(background) {
    if (!isFull) {
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
    // Toggle isFull var
    isFull = !isFull
}
