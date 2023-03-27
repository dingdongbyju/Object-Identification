img = "";
status1 = "";
room = "";
objects = [];

function preload() {
    img = loadImage("room1.webp");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "There are 7 main objects in this room. CocoSSD is still detecting objects. Please refresh if it is taking too long.";
}

function draw() {
    image(img, 0, 0, 640, 420);

    if(status1 != "") {
        for (i=0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "There are 7 main objects in this room. CocoSSD has detected "+objects.length+" out of the 7.";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("Model Loaded!");
    status1 = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }

    console.log(results);
    objects = results;
}

function back() {
    window.location = "index.html";
}