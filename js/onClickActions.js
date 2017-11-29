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
