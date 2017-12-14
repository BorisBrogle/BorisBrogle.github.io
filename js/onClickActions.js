function speedUpDown(amount) {
  myImages.forEach(function(elem) {
    elem.incDecSpeed(amount);
  });
}

function changeRotation(amount) {
  myImages.forEach(function(elem) {
    elem.changeRotation(amount);
  });
}

//Below: "resize of the container" feature
(function(){
  let mouseUp = 0;
  let initialX = 0;
  let initialY = 0;
  let varX = 0;
  let varY = 0;
  let baseWidth = CONTAINER_WIDTH;
  let baseHeight = CONTAINER_HEIGHT;

  $("#container").on("mousedown", function(event) {
    mouseUp = 1;
    initialX = event.pageX;
    initialY = event.pageY;
  });
  $("#container").on("mouseup", function(event) {
    mouseUp = 0;
    CONTAINER_WIDTH = baseWidth+varX;
    CONTAINER_HEIGHT = baseHeight+varY;
    varX = 0;
    varY = 0;
    baseWidth = CONTAINER_WIDTH;
    baseHeight = CONTAINER_HEIGHT;

    $("#container").css("width",CONTAINER_WIDTH+"px");
    $("#container").css("height",CONTAINER_HEIGHT+"px");
  });

  $("#container").on("mousemove", function(event) {
    if (mouseUp == 1)
    {
      varX = event.pageX - initialX;
      varY = event.pageY - initialY;
      CONTAINER_WIDTH = baseWidth+varX;
      CONTAINER_HEIGHT = baseHeight+varY;
      $("#container").css("width",(baseWidth+varX)+"px");
      $("#container").css("height",(baseHeight+varY)+"px");
    }
  });
})();
