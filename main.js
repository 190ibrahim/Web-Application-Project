document.addEventListener('DOMContentLoaded', () => {
  let toggle = document.querySelector('.toggle');
  let sideBar = document.querySelector('.main-menu');

  toggle.addEventListener('click', () => {
    sideBar.classList.toggle('toggle-function');
  });
});



document.addEventListener('DOMContentLoaded', function() {
    let application;

    const btns = document.querySelectorAll('button');
    const target = document.getElementById('app');

    for (let btn of btns) {
        btn.addEventListener('click', function(evt) {
            if (application) {
                application.destroy();
            }

            const appName = btn.getAttribute('data-app');
            if (appName) {
                const appPath = `./app/${appName}/${appName}.js`;
                // import returns a promise => building block of async programming in JS
                import(appPath).then(function(appModule) {
                    // Success branch
                    const appObject = appModule.default;
                    application = new appObject({
                        statBarTarget: document.getElementById('status'),
                        target: target
                    });
                }, function(err) {
                    // Error branch
                    throw err;
                });
            } else {
                throw new Error(`No application was linked to button ${btn.textContent}`);
            }
        });
    }
});



// toast
function showToast(message, duration) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(function () {
    toast.classList.add('show');
  }, 100);

  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () {
      document.body.removeChild(toast);
    }, 300);
  }, duration);
}

// Usage example
const statusElement = document.getElementById('status');
statusElement.addEventListener('click', function () {
  showToast('This is a toast notification!', 2000);
});
