

export const handleActionsResult = (data, error, callback, noResCB) => {
    if (data) {
        callback(data, null);
        return true;
    }
    else if (error) {
        if (error.response) {
            // Able to reach the server and server responds with a bad request code
            callback(null, error.response.data);
        }
        else {
            // Unable to get a response from server
            console.log(error);
            noResCB(error);
        }
    }
    return false;
};