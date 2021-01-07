const remote = require("electron").remote;
const path = require("path");
let pageTitle;

function openModal(time) {
  const modal = new remote.BrowserWindow({
    center: true,
    transparent: true,
    frame: false,
    title: time.toString(),
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
    },
  });

  modal.loadFile(path.join(__dirname, "modal.html"));
  modal.setFullScreen(true);

  modal.on("close", () => {
    start();
  });

  modal.webContents.openDevTools();
}

function closeModal() {
  const win = remote.getCurrentWindow();
  win.close();
}

const opts = {
  each: 10,
  stop: 10,
};

function timeEach(amount) {
  const selector = document.querySelector(".time-each .selector");

  if (amount === 10) {
    selector.classList.remove("pos2");
    selector.classList.remove("pos3");
    selector.classList.remove("pos4");
    selector.classList.add("pos1");
  }
  if (amount === 20) {
    selector.classList.remove("pos1");
    selector.classList.remove("pos3");
    selector.classList.remove("pos4");
    selector.classList.add("pos2");
  }
  if (amount === 30) {
    selector.classList.remove("pos1");
    selector.classList.remove("pos2");
    selector.classList.remove("pos4");
    selector.classList.add("pos3");
  }
  if (amount === 40) {
    selector.classList.remove("pos1");
    selector.classList.remove("pos2");
    selector.classList.remove("pos3");
    selector.classList.add("pos4");
  }

  opts.each = amount;
}

function timeStop(amount) {
  const selector = document.querySelector(".time-stop .selector");

  if (amount === 10) {
    selector.classList.remove("pos2");
    selector.classList.remove("pos3");
    selector.classList.remove("pos4");
    selector.classList.add("pos1");
  }
  if (amount === 20) {
    selector.classList.remove("pos1");
    selector.classList.remove("pos3");
    selector.classList.remove("pos4");
    selector.classList.add("pos2");
  }
  if (amount === 30) {
    selector.classList.remove("pos1");
    selector.classList.remove("pos2");
    selector.classList.remove("pos4");
    selector.classList.add("pos3");
  }
  if (amount === 60) {
    selector.classList.remove("pos1");
    selector.classList.remove("pos2");
    selector.classList.remove("pos3");
    selector.classList.add("pos4");
  }

  opts.stop = amount;
}

function fancyTimeFormat(duration) {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

let interval;
let isOver = false;
const btn = document.querySelector("button");

function mouseIn() {
  isOver = true;
  btn.textContent = "PARAR";
}
function mouseOut(timeout) {
  isOver = false;
  btn.textContent = fancyTimeFormat(timeout);
}

function start() {
  const initial = "EMPEZAR";
  let timeout = opts.each; //* 60;

  if (interval) {
    clearInterval(interval);
    interval = null;
    btn.removeEventListener("mouseenter", mouseIn, false);
    btn.removeEventListener("mouseleave", mouseOut, false);
    btn.textContent = initial;

    setTimeout(() => {
      btn.textContent = initial;
    }, 1000);
  } else {
    btn.addEventListener("mouseenter", mouseIn, false);
    btn.addEventListener("mouseleave", mouseOut(timeout), false);

    interval = setInterval(() => {
      if (!isOver) btn.textContent = fancyTimeFormat(timeout);
      timeout -= 1;

      if (timeout <= 1) {
        clearInterval(interval);
        interval = null;
        btn.removeEventListener("mouseenter", mouseIn, false);
        btn.removeEventListener("mouseleave", mouseOut, false);
        btn.textContent = initial;

        setTimeout(() => {
          btn.textContent = initial;
          openModal(opts.stop);
        }, 1000);
      }
    }, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  pageTitle = document.querySelector("title").textContent;
  console.log(pageTitle);
});
