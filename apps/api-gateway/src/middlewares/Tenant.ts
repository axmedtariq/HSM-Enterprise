import { Request, Response, NextFunction } from 'express';

export const tenantMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const hospitalId = req.headers['x-hospital-id'];

  if (!hospitalId) {
    return res.status(403).json({ error: "Unauthorized: Missing Hospital ID" });
  }

  // Attach hospitalId to the request object for use in controllers
  req.hospitalId = hospitalId as string;
  next();
};