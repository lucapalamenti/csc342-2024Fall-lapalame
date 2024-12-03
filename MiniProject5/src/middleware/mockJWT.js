const { Buffer } = require('buffer');
const crypto = require('crypto');

function base64urlEncode(string) {
    return Buffer.from(string, 'utf-8').toString('base64url');
}
function base64urlDecode(string) {
    return Buffer.from(string, 'base64url').toString('utf-8');
}

exports.sign = ( payload, secret ) => {
    const header = {
        "alg": "HS256",
        "typ": "JWT"
    };
	
	const encodedHeader = base64urlEncode( JSON.stringify( header ) );
	const encodedPayload = base64urlEncode( JSON.stringify( payload ) );
	const combinedHeaderPayload = `${encodedHeader}.${encodedPayload}`;

    const signature = crypto.createHmac( 'sha256', secret ).update( combinedHeaderPayload ).digest('base64url');

    return `${combinedHeaderPayload}.${signature}`;
}

/*
 * Does two things:
 * 1) Validates that the signature of the JWT corresponds to the provided header and payload
 * 2) Makes sure the token is not expired
 * @Returns the payload
 */
exports.verify = ( token, secret ) => {
    /* 'decoded' will look like this:

    { // THIS IS THE HEADER
        "alg":"HS256",
        "typ":"JWT"
    }
    { // THIS IS THE PAYLOAD
        "user":{
            "id":1,
            "first_name":"Stu",
            "last_name":"Dent",
            "username":"student",
            "avatar":"https://robohash.org/veniamdoloresenim.png?size=64x64&set=set1",
            "following":[24,6,7]
        },
        "exp":1731002830.734,
        "iat":1730999230
              1731002723.749
    }-�∟�↓→)�h%�i���)*�1{��6>�dOA�

    */
	
	const splitToken = token.split( "." );
    const header = base64urlDecode( splitToken[0] );
	const payload = base64urlDecode( splitToken[1] );
	const signature = splitToken[2];

    // If the token is expired
    if ( payload.exp * 1000 < new Date().getTime() ) {
		console.error({error: "EXPIRED TOKEN"});
        return;
    }

	const encodedHeader = base64urlEncode( header );
	const encodedPayload = base64urlEncode( payload );
	const combinedHeaderPayload = `${encodedHeader}.${encodedPayload}`;

	const checkSignature = crypto.createHmac( 'sha256', secret ).update( combinedHeaderPayload ).digest('base64url');

    // Make sure the signature is the actual signature for the given header and payload
	if ( signature != checkSignature ) {
		console.error({error: "INVALID TOKEN"});
        return;
	}

    return JSON.parse( payload );
}
