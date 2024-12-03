const darkModeToggle = document.querySelector('.menu input');

const DARK_MODE_KEY = 'darkMode';

// Handle dark mode toggle
darkModeToggle.addEventListener('change', e => {
  if(e.target.checked) {
    document.body.classList.add('dark');
    localStorage.setItem(DARK_MODE_KEY, 1);
  }
  else {
    document.body.classList.remove('dark');
    localStorage.setItem(DARK_MODE_KEY, 0);
  }

});

// Restore dark mode setting
if(localStorage.getItem(DARK_MODE_KEY) === "1") {
  darkModeToggle.checked = true;
  document.body.classList.add('dark');
}




/*********************\
* SERVICE WORKER CODE *
\*********************/

function registerServiceWorker() {
  // Check if the browser supports service workers
  if ( !navigator.serviceWorker ) {
    return;
  }

  // Register the service worker
  navigator.serviceWorker.register( '/serviceWorker.js' ).then( registration => {
    if (registration.installing) {
      console.log('Service worker installing');
      // This is fired whenever registration.installing gets a new worker
      registration.addEventListener('updatefound', () => { 
        console.log("SW update found", registration, navigator.serviceWorker.controller);
        newServiceWorkerReady(registration.installing);
      });
    } else if (registration.waiting) {
      console.log('Service worker installed, but waiting');
      // Show prompt to user
      newServiceWorkerReady( registration.waiting );
    } else if (registration.active) {
      console.log('Service worker active');
    }
  }).catch( err => {
    console.error( `Registration failed with error: ${err}` );
  })

  navigator.serviceWorker.addEventListener( 'message', e => {
    console.log( 'Message from service worker:', e.data );
  });

  // Ensure refresh is only called once.
  // This works around a bug in "force update on reload" in dev tools.
  let refreshing = false;
  // Called when the service worker controlling the page changes, like when we skip waiting
  navigator.serviceWorker.addEventListener( 'controllerchange', () => {
    if ( refreshing ) return;
    window.location.reload();
    refreshing = true;
  });
};

registerServiceWorker();

// Shows a prompt asking the user if they want to activate the new service worker
function newServiceWorkerReady( worker ) {
  const popup =  document.createElement('div');
  popup.className = "popup";
  popup.innerHTML = '<div>New Version Available</div>';

  const buttonOk = document.createElement('button');
  buttonOk.innerHTML = 'Update';
  buttonOk.addEventListener('click', e => {
    worker.postMessage({action: 'skipWaiting'});
  });
  popup.appendChild(buttonOk);

  const buttonCancel = document.createElement('button');
  buttonCancel.innerHTML = 'Dismiss';
  buttonCancel.addEventListener('click', e => {
    document.body.removeChild(popup);
  });
  popup.appendChild(buttonCancel);

  document.body.appendChild(popup);
}