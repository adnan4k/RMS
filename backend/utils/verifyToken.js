import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();


const verifyToken = (...role) => (req, res, next) =>  {
    const access_token = req.headers.authorization.split(' ')[1];
    if (!access_token)
        return res.status(400).json('Page not found')
    jwt.verify(access_token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
        if (err)
            return res.status(401).json('Unauthenticated access');
        if (!role.includes(decoded.role))
            return res.status(403).json('Unauthorized access');
        
        req.user = decoded.user;
        req.role = decoded.role;
        next()
    });
}
export default verifyToken