let secureAdminApi = (req, res, next)=> {
    console.log("secure", req.headers);

    if(req.headers.authorization == "123456abcd"){
        next();
    } else {
        res.status(401);
        res.send({error: "Invalid API"})
    }
}

module.exports = secureAdminApi;