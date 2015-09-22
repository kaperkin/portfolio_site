// Problem: need to look at user badge count and JS point
// Solution: use nodejs to connect TH API to get profile info to print out
var http = require("http");


//print out message
function printMessage(username, badgeCount, points) {
    var message = username + " has " + badgeCount + " badge(s) and " + points + " points in JavaScript.";
    console.log(message);
}


// print error message
function printError(error) {
    console.error(error.message);
}

function get(username) {
// Connect to the API  URL (http://teamtreehouse.com/username.json)
    var request = http.get("http://teamtreehouse.com/" + username + ".json", function (response) {
        var body = "";
        var badgeDiv = document.getElementById("badgeDiv");
        // read the data
        response.on("data", function (chunk) {
            body += chunk;
        });
        // at the end of the request response
        response.on('end', function () {
            if (response.statusCode == 200) {
                try {
                    // parse the data
                    var profile = JSON.parse(body);
                    // print the data
                    printMessage(username, profile.badges.length, profile.points.JavaScript);
                    // get imgs and populate div
                    for(var i=profile.badges.length -1; i < 0; i --) {
                        var img = document.createElement("img");
                        var caption = document.createElement("p");
                        img.setAttribute("src", profile.badges[i].icon_url);
                        caption.innerHTML= profile.badges[i].name;
                        img.appendChild(caption);
                        badgeDiv.appendChild(img);
                    }



                } catch (error) {
                    //Parse error
                    printError(error);
                }
            } else {
                //statusCode error
                printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
            }
        });
    };


//request error
    request.on("error", printError);
}
module.exports.get = get;