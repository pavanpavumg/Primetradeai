import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No Token Found" });

    // OFFLINE MODE MOCK TOKEN
    if (token === "mock-jwt-token-for-offline-mode") {
        req.user = "mock_user_id";
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch {
        res.status(403).json({ message: "Invalid Token" });
    }
}
