status = "";
objects = [];
 
 function preload() {
     sound = loadSound("alarm.mp3");
 }
 
 function setup() {
     canvas = createCanvas(380, 380);
     canvas.center();

     video = createCapture(VIDEO);
     video.size(380,380);
     video.hide();
 }

 function modelLoaded() {
     console.log("Model Loaded!");
     status = true;
 }

 function gotResult(error, results){
     if(error) {
         console.log(error);
     }
     else{
         console.log(results);
         objects = results;
     }
 }

 function draw() {
     image(video, 0, 0, 380, 380);

     if(status != ""){
         r = random(255);
         g = random(255);
         b = random(255);

        objectDetector.detect(video, gotResult);
        document.getElementById("status").innerHTML = "Status : Detected Objects";

         for(i=0;i<objects.length;i++){
            fill(r,g,b);
            stroke(r,g,b);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" "+percent+"%", objects[i].x+15, objects[i].y+15);

            if(objects[i].label == "person"){
                document.getElementById("baby").innerHTML = "Baby Found!";
                sound.stop();
            }
            else{
                document.getElementById("baby").innerHTML = "Baby Not Found!";
                sound.play();
            }
         }
         if(objects.length == 0){
            document.getElementById("baby").innerHTML = "Baby Not Found!";
            sound.play();
        }
     }
 }

 function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    status = true;
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
 }