let secureAPI = (req, res, next)=> {
    console.log("secure", req.headers);

    if(req.headers.authorization == "ssds64efefef"){
        next();
    } else {
        res.send({error: "Invalid API"})
    }
}

module.exports = secureAPI;