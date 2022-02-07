song="";
lefthandwrist_x=0;
lefthandwrist_y=0;
righthandwrist_x=0;
righthandwrist_y=0;
score_leftWrist=0;
score_rightWrist=0;



function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.position(450,200);
    video = createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video, modelloaded);
    posenet.on('pose', gotposes);

    

}


function modelloaded(){
    console.log("Model Is Loaded");


}

function gotposes(results){
    if(results.length > 0){
      console.log(results);

      righthandwrist_x=results[0].pose.rightWrist.x;
      righthandwrist_y=results[0].pose.rightWrist.y;
      lefthandwrist_x=results[0].pose.leftWrist.x;
      lefthandwrist_y=results[0].pose.leftWrist.y;
      score_rightWrist=results[0].pose.keypoints[10].score;
      score_leftWrist=results[0].pose.keypoints[9].score;
      
    }
}
function draw(){
 image(video,0,0,600,500);
 fill("#FF0000");
 stroke("#FF0000");
 if(score_rightWrist > 0.2){
     circle(righthandwrist_x,righthandwrist_y,20);
     if(righthandwrist_y > 0 && righthandwrist_y <= 100 ){
         document.getElementById("speed").innerHTML = "speed : 0.5";
         song.rate(0.5);
     }
     if(righthandwrist_y >100 && righthandwrist_x <= 200){
         document.getElementById("speed").innerHTML = "speed : 1";
         song.rate(1);
     }
     if(righthandwrist_y >200 && righthandwrist_x <= 300){
        document.getElementById("speed").innerHTML = "speed : 1.5";
        song.rate(1.5);
    }
    if(righthandwrist_y >300 && righthandwrist_x <= 400){
        document.getElementById("speed").innerHTML = "speed : 2";
        song.rate(2);
    }
    if(righthandwrist_y >400 && righthandwrist_x <= 500){
        document.getElementById("speed").innerHTML = "speed : 2.5";
        song.rate(2.5);
    }
 }
 if(score_leftWrist >0.2){
     circle(lefthandwrist_x,lefthandwrist_y,20);
     in_number_leftWrist_y=Number(lefthandwrist_y);
     new_leftWrist_y=floor(in_number_leftWrist_y * 2);
     leftWrist_y_divide_1000=new_leftWrist_y/1000;
     document.getElementById("volume").innerHTML = "volume : " + leftWrist_y_divide_1000;
     song.setVolume(leftWrist_y_divide_1000);
 }
 
}

function startsong(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

