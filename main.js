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
  
        // Loop through each button
        for (let btn of btns) {
            btn.addEventListener('click', function(evt) {
            // Destroy the existing application if it exists
            if (application) {
                application.destroy();
            }

            const appName = btn.getAttribute('data-app'); // Get the 'data-app' attribute value of the clicked button
            if (appName) {
                const appPath = `./app/${appName}/${appName}.js`; // Construct the path to the JavaScript file of the selected application

                // Dynamically import the JavaScript module
                import(appPath).then(function(appModule) {
                const appObject = appModule.default; // Retrieve the default exported object from the module
                // Instantiate the application object with the target elements
                application = new appObject({
                    statBarTarget: document.getElementById('status'),
                    target: target
                });
                }, function(err) {
                throw err;
                });
            } else {
                throw new Error(`No application was linked to button ${btn.textContent}`);
            }
            });
        }
  });
  