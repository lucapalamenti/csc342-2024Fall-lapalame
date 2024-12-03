const express = require('express');

const CountyDAO = require( './db/CountyDAO' );
const ParkDAO = require( './db/ParkDAO' );

const router = express.Router();

// Append '/counties' to the URL
router.get( '/counties', (req, res) => {
    // getCounties returns an array of county objects
    CountyDAO.getCounties()
    // Then take the returned array of counties
    .then( counties => {
        // And convert it to json
        res.json( counties );
    });
});

// Append '/counties/[countyId]' to the URL where countyId is a variable that can
// be accessed with req.params.countyId
router.get( '/counties/:countyId', (req, res) => {
    // getCountyById returns a single county with the id if it exists
    CountyDAO.getCountyById( req.params.countyId )
    // The promise is returned
    .then( county => {
        res.json( county );
    })
    // The promise is rejected
    .catch( () => {
        res.status( 404 ).json({ error: "ERROR COUNTY NOT FOUND"});
    });
});

// Append '/counties/[countyId]/parks' to the URL where countyId is a variable that can
// be accessed with req.params.countyId
router.get( '/counties/:countyId/parks', (req, res) => {
    // Will return an array of parks in the given county
    ParkDAO.getParksByCountyId( req.params.countyId )
    // The promise is returned
    .then( parks => {
        res.json( parks );
    })
    // The promise is rejected
    .catch( () => {
        res.status( 404 ).json({ error: "ERROR COUNTY NOT FOUND"});
    });
});

// Append '/parks to the URL
router.get( '/parks', (req, res) => {
    // Since 'all' is the ID for the 'All Counties' tab, this will return
    // an array of all counties
    ParkDAO.getParksByCountyId( 'all' )
    // The promise is returned
    .then( parks => {
        res.json( parks );
    });
});

// Append '/parks/[parkId]' to the URL where parkId is a variable that can
// be accessed with req.params.parkId
router.get( '/parks/:parkId', (req, res) => {
    // Returns a park object with the given route parameter in the URL
    ParkDAO.getParkById( req.params.parkId )
    // The promise is returned
    .then( park => {
        res.json( park );
    })
    // The promise is rejected
    .catch( () => {
        res.status( 404 ).json({ error: "ERROR PARK NOT FOUND"});
    });
});

module.exports = router;