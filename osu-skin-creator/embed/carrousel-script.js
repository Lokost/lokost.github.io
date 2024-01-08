let images = Array.from(JSON.parse(sessionStorage.getItem("carrousel-images")));
let actualImage = 0;

let imageView = document.querySelector(".carrousel_img");
imageView.src = images[0];
document.querySelector(".next").onclick = () => next();
document.querySelector(".previous").onclick = () => previous();

function showAnimation() {
  imageView.onanimationend = () => {
    imageView.style.animation = "none";
  };
  imageView.style.animation = "1s fade ease backwards";
}

function hideAnimation() {
  imageView.onanimationend = () => {
    imageView.style.animation = "none";
  };
  imageView.style.animation = "1s fade ease backwards reverse";
}

function previous() {
  hideAnimation();
  console.log(images.length - 1);
  if (actualImage <= 0 || actualImage == NaN) {
    actualImage = images.length - 1;
    imageView.src = images[actualImage];
  } else {
    actualImage--;
    imageView.src = images[actualImage];
  }
  showAnimation();
  console.log(actualImage);
}

function next() {
  hideAnimation();
  console.log(images.length - 1);
  if (actualImage >= images.length - 1) {
    actualImage = 0;
    imageView.src = images[actualImage];
  } else {
    actualImage++;
    imageView.src = images[actualImage];
  }
  console.log(actualImage);
  showAnimation();
}

setInterval(() => next(), 4000);
