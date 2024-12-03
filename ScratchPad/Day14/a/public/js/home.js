import {} from './darkMode.js';
import HTTPClient from './HTTPClient.js';

//Task a.4: Displaying Howls on the Frontend
const howlList = document.getElementById('howlList');
const howlTemplate = document.getElementById('howlTemplate');

function renderHowl( howl ) {
    const howlInstance = howlTemplate.content.cloneNode(true);
    const howlElement = howlInstance.querySelector('.howl.container');

    const userElement = howlElement.querySelector('.user');
    userElement.textContent = howl.user;
    
    const contentElement = howlElement.querySelector('.content');
    contentElement.textContent = howl.message;

    howlList.prepend(howlElement);
}

// GET the howls file
HTTPClient.get('/howls')
    // THEN when the promise successfully returns a list of howls
    .then(howls => {
        // Iterate through them
        howls.forEach(howl => {
            renderHowl( howl );
        });
});

//Task b.1: Posting New Howls

