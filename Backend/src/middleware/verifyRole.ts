import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const verifyRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Get token from Authorization header

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if the user's role matches the required role
      if ((decoded as any).role !== requiredRole) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Attach the user data to the request object for further use
      (req as any).user = decoded;

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

export default verifyRole;
