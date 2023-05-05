let currTimeAcc = 0;
let totalTimeAcc = 0;
let interval;

onmessage = (m) => {
  if (m.data[0] === "start-timer") {
    if (interval !== undefined) {
      return;
    }

    currTimeAcc = 0;

    interval = setInterval(() => {
      currTimeAcc++;
      postMessage(["tick", currTimeAcc]);
    }, 1000);
  } else if (m.data[0] === "stop-timer") {
    if (interval === undefined) {
      return;
    }

    totalTimeAcc += currTimeAcc;
    currTimeAcc = 0;
    clearInterval(interval);
    interval = undefined;
    postMessage(["reset-time", totalTimeAcc]);
  } else if (m.data[0] === "set-acc-time") {
    totalTimeAcc = m.data[1];
  } else {
    console.log("Worker: Unrecognized command.");
  }
};
