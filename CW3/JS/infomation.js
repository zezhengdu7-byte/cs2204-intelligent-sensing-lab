window.onload = function(){
  show();
  switchVideo() ;
}
const array = [
  "Optical Sensing Division has 8 openings for PhD researchers! Develop next-gen imaging systems.",
  "Bio-Sensing Group offers 5 internship positions in medical sensor development for researchers!",
  "Join the AI Vision Lab to build smart sensing platforms for autonomous systems!"
];
var random = Math.floor(Math.random()*3);
function show(){
  random++;
  if (random == 3){
    random = 0
  }
  var message = array[random]
  document.querySelector("#column1").innerHTML = "<h2>" + message + "</h2>";
  setInterval("show()",3000)
}
videos = [
    `
    <video autoplay muted controls>
    <source src="https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video1.mp4">
    <source src="https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video1.webm">
    </video>
    `,
    `<video autoplay muted controls>
     <source src="https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video2.mp4">
     <source src="https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video2.webm">
    </video>
    `
  ]
let index = 0;

function switchVideo() {
  document.querySelector("#column2").innerHTML = videos[index];
  index = (index + 1) % videos.length;
}





