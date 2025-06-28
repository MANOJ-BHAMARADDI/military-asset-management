import Log from "../models/Log.js";

export const apiLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", async () => {
    try {
      const logEntry = new Log({
        user: req.user ? req.user.id : null,
        method: req.method,
        endpoint: req.originalUrl,
        statusCode: res.statusCode,
        requestBody: req.body,
        responseTime: Date.now() - start,
      });

      await logEntry.save();
    } catch (err) {
      console.error("API logging error:", err.message);
    }
  });

  next();
};
