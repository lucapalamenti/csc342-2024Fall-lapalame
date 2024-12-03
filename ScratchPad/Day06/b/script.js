const howls = [
    {
        user: "@student",
        message: "This is a sample howl. #example"
    },
    {
        user: "@graduate",
        message: "Another sample howl for the feed!"
    },
    {
        user: "@student",
        message: "This is a sample howl. #example"
    },
    {
        user: "@faculty",
        message: "This is a sample howl. #example"
    },
    {
        user: "@student",
        message: "This is a sample howl. #example"
    },
    {
        user: "@graduate",
        message: "This is a sample howl. #example"
    },
    {
        user: "@graduate",
        message: "Yet another howl to showcase the feed layout."
    }
];

/* HTML to Create
<div class="howl container">
    <div class="user">@user3</div>
    <div class="content">Yet another howl to showcase the feed layout.</div>
    <div class="actions">
        <a href="#">Reply</a>
        <a href="#">Rehowl</a>
        <a href="#">Like</a>
    </div>
</div>
*/

const howlContainer = document.getElementById('howl-input');
const howlList = document.querySelector('#howl-list');

howls.forEach(howl => {
    const container = document.createElement( "div" );
    container.setAttribute( "class", "howl container" );
    
    const userText = document.createElement( "div" );
    userText.setAttribute( "class", "user" );
    userText.innerHTML = howl.user;

    container.appendChild( userText );

    const content = document.createElement( "div" );
    content.setAttribute( "class", "content" );
    content.innerHTML = howl.message;
    
    container.appendChild( content );

    const actions = document.createElement( "div" );
    actions.setAttribute( "class", "actions" );

    const buttons = [ "Reply", "Rehowl", "Like" ];

    buttons.forEach( text => {
        const button = document.createElement( "a" );
        button.setAttribute( "href", "#" );
        button.innerHTML = text;

        actions.appendChild( button );
    });

    container.appendChild( actions );
    
    howlList.appendChild( container );
});