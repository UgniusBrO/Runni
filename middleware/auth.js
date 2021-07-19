
//Function for getting the token from fron-end
function auth(req, res, next){
    const token = req.header('x-auth-token');

    // Check for the token
    if(!token){
        console.log("tried");
        res.status(401).json({
            msg: 'No token, authorization denied' // If the user is not authorized
        })
    }
    try {
    // Verify token
    const decoded = process.env.JWT_SECRET.verify(token, process.env.DATABASE_ACCESS);

    // Add user 
    req.user = decoded;
    next();
    }
    catch(e)
    {
        res.status(400).json({
            msg: 'Token is invalid'
        });
    }
}

module.exports = auth;