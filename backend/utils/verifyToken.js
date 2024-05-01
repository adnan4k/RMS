import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) =>  {
    const { access_token } = req.cookies;
    
    if (!access_token)
        return res.status(400).json('Page not found')
    jwt.verify(access_token, 'secret_key', (err, decoded) => {
        if (err)
            return res.status(401).json('Unauthorized access');
        req.user = decoded.id;
        req.role = decoded.role;
        next()
    });
}
export default verifyToken