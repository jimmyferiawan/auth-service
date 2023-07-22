const generalResponse = (res, status, error, message) => {
    return res.status(status).send({
        error: error,
        message: message
    })
}

module.exports=generalResponse