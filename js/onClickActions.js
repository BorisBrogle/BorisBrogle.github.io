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


{
  var mouseUp = 0;
  var initialX = 0;
  var initialY = 0;
  var varX = 0;
  var varY = 0;

  $("#container").on("mousedown", function(event) {
    mouseUp = 1;
    initialX = event.pageX;
    initialY = event.pageY;
  });
  $("#container").on("mouseup", function(event) {
    mouseUp = 0;
    CONTAINER_WIDTH += varX;
    CONTAINER_HEIGHT += varY;
    varX = 0;
    varY = 0;

    $("#container").css("width",CONTAINER_WIDTH+"px");
    $("#container").css("height",CONTAINER_HEIGHT+"px");
  });

  $("#container").on("mousemove", function(event) {
    if (mouseUp == 1)
    {
      varX = event.pageX - initialX;
      varY = event.pageY - initialY;
      //$('#plus').html(varX);
    }
  });
}
