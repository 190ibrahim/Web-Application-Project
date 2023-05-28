export default class Application {
  /**
   * @type {HTMLElement}
   * Target element of the application.
   */
  target;

  constructor(options) {
    options = options ?? {};

    this.validate(options);

    const start = Date.now();
    this.init();
    const elapsed = Date.now() - start;
    this.#updateStatus(elapsed);
  }

  validate(opts) {
    if (typeof opts !== "object") {
      throw new Error("Options must be an object.");
    }

    if (!(opts.target instanceof HTMLElement)) {
      throw new Error("Argument target must be a valid HTML element.");
    }

    this.target = opts.target;
  }

  init() {
    console.log("Initialization started");
  }

  #updateStatus(elapsedTime) {
    showToast(`Application started successfully in ${elapsedTime}ms.`, 2000);
  }

  destroy() {
    console.log("Destroying application");
    while (this.target.lastChild) {
      this.target.lastChild.remove();
    }
  }
}

// Toast function
function showToast(message, duration) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("show");
  }, 100);

  setTimeout(function () {
    toast.classList.remove("show");
    setTimeout(function () {
      document.body.removeChild(toast);
    }, 900);
  }, duration);
}
