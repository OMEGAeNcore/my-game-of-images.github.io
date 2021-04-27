var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

let loadImg = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let imgPath = (frameNumber, animation) => {
  return "../assets/images/" + animation + "/" + frameNumber + ".png";
};

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  backward: [1, 2, 3, 4, 5, 6],
  forward: [1, 2, 3, 4, 5, 6],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

let loadImages = (callback) => {
  // Calls back with an array of loaded images
  let images = {
    idle: [],
    kick: [],
    punch: [],
    backward: [],
    forward: [],
    block: [],
  };
  let imgToLoad = 0;

  ["idle", "kick", "punch", "backward", "forward", "block"].forEach(
    (animation) => {
      let animationFrames = frames[animation];
      imgToLoad = imgToLoad + animationFrames.length;

      animationFrames.forEach((frameNumber) => {
        let path = imgPath(frameNumber, animation);

        loadImg(path, (img) => {
          images[animation][frameNumber - 1] = img;
          imgToLoad = imgToLoad - 1;

          if (imgToLoad === 0) {
            callback(images);
          }
        });
      });
    }
  );
};

let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 500, 500);
      ctx.drawImage(image, 0, 0, 500, 500);
    }, index * 100);
  });
  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  let queueAnimations = [];

  let aux = () => {
    let selectedAnimation;

    if (queueAnimations.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queueAnimations.shift();
    }
    animate(ctx, images, selectedAnimation, aux);
  };

  aux();

  document.getElementById("kick").onclick = () => {
    queueAnimations.push("kick");
  };

  document.getElementById("punch").onclick = () => {
    queueAnimations.push("punch");
  };

  document.getElementById("backward").onclick = () => {
    queueAnimations.push("backward");
  };

  document.getElementById("forward").onclick = () => {
    queueAnimations.push("forward");
  };

  document.getElementById("block").onclick = () => {
    queueAnimations.push("block");
  };

  document.addEventListener("keyup", (event) => {
    const key = event.key;

    if (key === "ArrowLeft") {
      queueAnimations.push("kick");
    } else if (key === "ArrowRight") {
      queueAnimations.push("punch");
    } else if (key === "A" || key === "a") {
      queueAnimations.push("backward");
    } else if (key === "D" || key === "d") {
      queueAnimations.push("forward");
    } else if (key === "S" || key === "s") {
      queueAnimations.push("block");
    }
  });
});
