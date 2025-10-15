let secureAPI = (req, res, next)=> {
    console.log("secure", req.headers);

    if(req.headers.authorization === "123456abcd"){
        next();
    } else {
        res.status(401).send({error: "Invalid API"})
    }
}

module.exports = secureAPI;
