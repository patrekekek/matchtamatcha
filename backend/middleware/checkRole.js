const checkRole = (roles) => {
    return (req, res, next) => {
        const { role } = req.user;

        if (roles.includes(role)) {
            next();
        } else {
            res.status(403).json({ message: 'Access Denied. Only the owner and admin is allowed' });
        }
    }
}

module.exports = checkRole;