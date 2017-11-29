class MovingImg {
    // Constructor
    constructor(name, x, y, speed, imgName, height, width) {
        this.container = document.getElementById("container");
        this.maxX = parseInt($('#container').css('width'))-width;
        this.maxY = parseInt($('#container').css('height'))-height;

        if (x <= 0 || x >= this.maxX) { x=this.maxX/2 }
        if (y <= 0 || y >= this.maxY) { y=this.maxY/2 }
        this.x = x;
        this.y = y;
        this.name = name;
        this.speedX = speed;
        this.speedY = speed;
        this.rotateInf = 1;
        this.rotationFactor = 1;
        this.height = height;
        this.width = width;


        this.newImg = document.createElement('img');

        this.newImg.src = 'images/'+imgName;
        this.newImg.width = width;
        this.newImg.height = height;
        this.newImg.id = name;

        this.container.appendChild(this.newImg);

        document.getElementById(name).style.position = "absolute";
        document.getElementById(name).style.left = x;
        document.getElementById(name).style.bottom = y;
    }

    // Methods
    launch() {
      this.borderDetection();
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotateInf += this.rotationFactor;

      document.getElementById(this.name).style.left = this.x;
      document.getElementById(this.name).style.bottom = this.y;
      document.getElementById(this.name).style.transform = "rotate("+this.rotateInf*2+"deg)";
    }

    borderDetection() {
      if (this.x >= this.maxX){
        this.container.style.backgroundColor = getRandColorRGB();
        this.speedX = -this.speedX;
      }
      else if (this.x <= 0) {
        this.container.style.backgroundColor = getRandColorRGB();
        this.speedX = -this.speedX;
      }

      if (this.y >= this.maxY){
        this.container.style.backgroundColor = getRandColorRGB();
        this.speedY = -this.speedY;
      }
      else if (this.y <= 0) {
        this.container.style.backgroundColor = getRandColorRGB();
        this.speedY = -this.speedY;
      }
    }

    /* TODO */
    collisionDetection() {
      var h = this.height;
      var w = this.width;
      myImages.forEach(function(elem) {
        
      });
    }

    incDecSpeed(amount) {
      this.speedX *= amount;
      this.speedY *= amount;
    }

    changeRotation(amount) {
      this.rotationFactor *= amount;
    }
};
