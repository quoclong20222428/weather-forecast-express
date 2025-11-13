import { Router, Request, Response } from "express";

const router = Router();

// Facebook Data Deletion Callback
// Facebook sẽ gọi URL này khi user yêu cầu xóa dữ liệu
router.post("/facebook/deletion", async (req: Request, res: Response) => {
  try {
    const signedRequest = req.body.signed_request;
    
    // TODO: Parse signed_request từ Facebook
    // TODO: Lấy user_id từ signed_request
    // TODO: Xóa dữ liệu user trong database
    
    // Trả về confirmation
    const confirmationCode = `deletion_${Date.now()}`;
    
    res.json({
      url: `${process.env.CLIENT_URL || "http://localhost:5173"}/deletion-status?id=${confirmationCode}`,
      confirmation_code: confirmationCode
    });
  } catch (error) {
    console.error("Facebook data deletion error:", error);
    res.status(500).json({ error: "Failed to process deletion request" });
  }
});

// Trang HTML đơn giản cho user check deletion status
router.get("/deletion-status", (_req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Data Deletion Status</title>
      <style>
        body { font-family: Arial; max-width: 600px; margin: 50px auto; padding: 20px; }
        h1 { color: #333; }
      </style>
    </head>
    <body>
      <h1>Data Deletion Request</h1>
      <p>Your data deletion request has been received and will be processed within 30 days.</p>
      <p>If you have any questions, please contact: <a href="mailto:longtranquoc173@gmail.com">longtranquoc173@gmail.com</a></p>
    </body>
    </html>
  `);
});

export default router;
