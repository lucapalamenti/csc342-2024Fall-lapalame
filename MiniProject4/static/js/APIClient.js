import HTTPClient from './HTTPClient.js';

const BASE_API_PATH = './api';

const handleAuthError = (error) => {
    // if( error.status === 401 ) {
    //     document.location = './login';
    // }
    throw error;
};

const getUsers = () => {
    return HTTPClient.get(`${BASE_API_PATH}/users`)
        .catch( handleAuthError );
};

const getUserById = ( userId ) => {
    return HTTPClient.get(`${BASE_API_PATH}/users/${userId}`)
        .catch( handleAuthError );
}

const getFollowedUsersIds = ( userId ) => {
    return HTTPClient.get(`${BASE_API_PATH}/users/${userId}/following`)
        .catch( handleAuthError );
};

const getCurrentUser = () => {
    return HTTPClient.get(`${BASE_API_PATH}/users/current`)
        .catch( handleAuthError );
};
    
const logIn = ( username ) => {
    const data = {
        username: username
    };
    return HTTPClient.post(`${BASE_API_PATH}/login`, data)
        .catch( handleAuthError );
};
    
const logOut = () => {
    return HTTPClient.post(`${BASE_API_PATH}/logout`);
};
    
const getHowls = () => {
    return HTTPClient.get(`${BASE_API_PATH}/howls`)
        .catch( handleAuthError );
};

const getHowlsFromUserId = ( userId ) => {
    return HTTPClient.get(`${BASE_API_PATH}/howls/${userId}`)
        .catch( handleAuthError );
};

const getFollowedUsersHowls = ( userId ) => {
    return HTTPClient.get(`${BASE_API_PATH}/howls/${userId}/following`)
        .catch( handleAuthError );
};

const createHowl = ( userId, message ) => {
    const data = {
        userId: userId,
        message: message
    };
    return HTTPClient.post(`${BASE_API_PATH}/howls`, data)
        .catch( handleAuthError );
};

const addFollow = ( currentUserId, followUserId ) => {
    return HTTPClient.post(`${BASE_API_PATH}/users/${currentUserId}/following/${followUserId}`)
        .catch( handleAuthError );
}

const removeFollow = ( currentUserId, unfollowUserId ) => {
    return HTTPClient.delete(`${BASE_API_PATH}/users/${currentUserId}/following/${unfollowUserId}`)
        .catch( handleAuthError );
}

export default {
    getUsers,
    getUserById,
    getFollowedUsersIds,
    getCurrentUser,
    logIn,
    logOut,
    getHowls,
    getHowlsFromUserId,
    getFollowedUsersHowls,
    createHowl,
    addFollow,
    removeFollow
}