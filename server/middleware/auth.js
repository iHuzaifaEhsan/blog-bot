// middleware/auth.js
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    let token = null;

    // Prefer "Authorization: Bearer <token>"
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.headers.authorization) {
      // fallback: pure token (agar client Bearer nahi bhej raha)
      token = req.headers.authorization.trim();
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // optional: sirf admin allow karna ho to yahan check laga do
    // if (!decoded.role || decoded.role !== 'admin') return res.status(403)...
    req.admin = decoded; // downstream use
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default auth;
