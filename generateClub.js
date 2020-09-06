const face = require("./generateFace");
const Grid = require("./grid.js");
const { exec } = require("child_process");
const fs = require('fs');
const path = "/home/hamptonmoore/public_html/club";

const randomIntBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function rectangleCollison(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 &&
        x1 + w1 > w2 &&
        y1 < y2 + h2 &&
        y1 + h1 > y2;
}

function generateCords(club, centerAdjust, username) {

    let x, y;
    let found = false;
    let it = 0;

    while (!found) {
        x = randomIntBetween(Math.max(1, centerAdjust), club.width - face.width - 1);
        y = randomIntBetween(0, club.height - face.height - 1);

        if (!club.hasCollison(x + Math.min(centerAdjust, 0) - 2, y, username.length + 5 + Math.max(centerAdjust, 0), face.height + 1)) {
            found = true;
        }

        it++;

        if (it > 10000) {
            return [-100, -100];
        }
    }

    return [x, y];
}

function placeUser(club, username, taken) {

    let centerAdjust = Math.ceil((face.width - username.length) / 2);

    let [x, y] = generateCords(club, centerAdjust, username);
    club.place(face.gen(username), x, y);

    club.place(username, x + centerAdjust, y + face.height);
}

const repo = "https://github.com/hamptonmoore/tilde.club-viewer";

exec("/usr/bin/who", (error, stdout, stderr) => {
    let users = stdout.split("\n");
    users.pop();
    users = users.map((user) => user.match(/\S+/g)[0]);
    users = users.filter((el, i, arr) => arr.indexOf(el) === i);
    const club = new Grid(80, 60);

    let rawDate = new Date();
    let time = rawDate.toTimeString().split(" ")[0];
    let date = rawDate.toDateString();
    let message = `Last Updated: ${rawDate.toString()}
There are currently ${users.length} users online
Created with <3 by hamptonmoore`
    club.place(message, 0, 0);

    club.place(repo, club.width - repo.length, club.height - 1);

    let taken = [];

    for (let user of users) {
        placeUser(club, user, taken);
    }

    let raster = club.rasterize();

    fs.readFile(path + "/index.template.html", 'utf8', function (err, data) {
        if (err) {
            throw err;
        }

        data = data.replace("$CLUB$", raster);

        fs.writeFile("/home/hamptonmoore/public_html/club/index.html", data, (err) => { });
    });

});