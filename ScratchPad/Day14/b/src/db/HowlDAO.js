const howls = require('./howls.json');

module.exports = {
    getHowls: () => {
        return new Promise((resolve, reject) => {
            resolve(howls);
        });
    },

    createHowl: ( howlMessage ) => {
        return new Promise((resolve, reject) => {
            const newHowl = {
                user: '@student',
                message: howlMessage
            };
            howls.push( newHowl );
            resolve( newHowl );
        });
    }
};
