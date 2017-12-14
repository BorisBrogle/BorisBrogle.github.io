class MovingImg {
    // Constructor
    constructor(name, x, y, speed, imgName, height, width) {
        this.container = document.getElementById("container");
        this.context = container.getContext('2d');

        this.maxWidth = CONTAINER_WIDTH-width;
        this.maxHeight = CONTAINER_HEIGHT-height;

        if (x <= 0 || x >= this.maxWidth) { x=this.maxWidth/2 }
        if (y <= 0 || y >= this.maxHeight) { y=this.maxHeight/2 }
        this.x = x;
        this.y = y;
        this.name = name;
        this.speedX = speed;
        this.speedY = speed;
        this.rotateInf = 1;
        this.rotationFactor = 1;
        this.height = height;
        this.width = width;


        this.image = new Image(this.height, this.width);

        this.image.src = 'images/'+imgName;
        this.context.drawImage(this.image, 0, 0, 100, 100, this.x, this.y, this.width, this.height);
        //drawImage(image, xInImage, yInImage, widthToTake, heightToTake, x, y, width, height)


        /*
        this.newImg = document.createElement('img');

        this.newImg.src = 'images/'+imgName;
        this.newImg.width = width;
        this.newImg.height = height;

        this.container.appendChild(this.newImg);

        document.getElementById(name).style.position = "absolute";
        document.getElementById(name).style.left = x;
        document.getElementById(name).style.bottom = y; */
    }

    // Methods
    launch() {
      //in case of a change
      this.maxWidth = CONTAINER_WIDTH-this.width;
      this.maxHeight = CONTAINER_HEIGHT-this.height;

      if((this.x + this.speedX) > this.maxWidth) //if it is going to be outside, we prevent it
      {
        this.x = this.maxWidth;
      }
      else if((this.x + this.speedX) < 0)
      {
        this.x = 0;
      }

      if((this.y + this.speedY) > this.maxHeight) //if it is going to be outside, we prevent it
      {
        this.y = this.maxHeight;
      }
      else if((this.y + this.speedY) < 0)
      {
        this.y = 0;
      }

      this.borderDetection();

      this.x += this.speedX;
      this.y += this.speedY;

      this.rotateInf += this.rotationFactor;

      this.context.drawImage(this.image, 0, 0, 100, 100, this.x, this.y, this.width, this.height);
      //document.getElementById(this.name).style.transform = "rotate("+this.rotateInf*2+"deg)";
    }

    borderDetection() {

      if (this.x >= this.maxWidth || this.x <= 0){
        this.container.style.backgroundColor = getRandColorRGB();
        this.speedX = -this.speedX;
      }

      if (this.y >= this.maxHeight || this.y <= 0){
        this.container.style.backgroundColor = getRandColorRGB();
        this.speedY = -this.speedY;
      }
    }

    /* TODO */
    collisionDetection() {
      let h = this.height;
      let w = this.width;
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
