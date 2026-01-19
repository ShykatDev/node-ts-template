/**
 Node Modules
 */
import { Router } from "express";

const router = Router();

// Root route
router.get("/", (_, res) => {
  res.status(200).json({
    status: 200,
    message: "API is live",
    timestamp: new Date().toISOString(),
  });
});

export default router;
