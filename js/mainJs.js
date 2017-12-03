var CONTAINER_HEIGHT = 700;
var CONTAINER_WIDTH = 1100;

$('#container').css('width', CONTAINER_WIDTH);
$('#container').css('height', CONTAINER_HEIGHT);
$('#container').css('backgroundColor', getRandColorRGB());


var intervalId = [];
function launchArray()
{
  myImages.forEach(function(elem) {
    intervalId.push(setInterval(function(){ elem.launch(); }, 10)); //setInterval is used to launch instructions every x (here 10) amount of time
  });
}

//can be used to cancel the movement 
function stopArray()
{
  intervalId.forEach(function(elem) {
    clearInterval(elem);
  });
}

function getRandColorRGB()
{
  return "rgb("+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+")";
}

var myImages = [];

myImages.push(new MovingImg("oeuil1", 100, 200, 1, "hihi.png", 70, 50));
myImages.push(new MovingImg("oeuil2", 600, 400, 2, "hihi.png", 70, 50));

launchArray(myImages);
