const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.role) return res.status(401);

        const rolesArray = [...allowedRoles];
        if (!rolesArray.includes(req.role)) {
            return res.status(401).json({ message: `${req.role} not allowed` });
        }
        next();
    };
};

module.exports = verifyRoles;
