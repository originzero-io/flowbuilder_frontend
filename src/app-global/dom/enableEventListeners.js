const enableEventListeners = () => {
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey === true && e.key === "a") {
      console.log("CTRL+" + e.key);
    }
    if (e.shiftKey === true) {
      //console.log("SHIFT+"+e.key)
    }
    if (e.altKey === true) {
      //console.log("ALT+"+e.key)
    } else {
      //console.log(e.key);
    }
  });
};

export default enableEventListeners;
