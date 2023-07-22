module.exports = function authResponse(data) {
    return {
        username: data.username,
        fullname: data.fullname,
        contact: data.contact,
    }
}