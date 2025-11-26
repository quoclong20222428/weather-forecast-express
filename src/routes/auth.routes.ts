import { Router } from "express";
import passport from "../config/passport.js";
import { 
  googleCallbackController,
  githubCallbackController,
  refreshTokenController,
  logoutController,
  getMeController,
  deleteAccountController
} from "../controllers/auth/index.js";
import { authMiddleware } from "../middleware/auth/authMiddleware.js";

const router = Router();

// ==================== GOOGLE OAUTH ====================
// GET /api/auth/google - Bắt đầu Google OAuth flow
router.get(
  "/google",
  passport.authenticate("google", { 
    scope: ["profile", "email"],
    session: false 
  })
);

// GET /api/auth/google/callback - Callback sau khi Google xác thực
router.get(
  "/google/callback",
  passport.authenticate("google", { 
    session: false,
    failureRedirect: "/login?error=google_auth_failed"
  }),
  googleCallbackController
);

// ==================== GITHUB OAUTH ====================
// GET /api/auth/github - Bắt đầu GitHub OAuth flow
router.get(
  "/github",
  passport.authenticate("github", { 
    scope: ["user:email"],
    session: false 
  })
);

// GET /api/auth/github/callback - Callback sau khi GitHub xác thực
router.get(
  "/github/callback",
  passport.authenticate("github", { 
    session: false,
    failureRedirect: "/login?error=github_auth_failed"
  }),
  githubCallbackController
);

// ==================== REFRESH TOKEN ====================
// POST /api/auth/refresh - Lấy access token mới từ refresh token
router.post("/refresh", refreshTokenController);

// ==================== LOGOUT ====================
// POST /api/auth/logout - Logout và xóa cookie
router.post("/logout", logoutController);

// ==================== GET ME ====================
// GET /api/auth/me - Lấy thông tin user hiện tại (yêu cầu authentication)
router.get("/me", authMiddleware, getMeController);

// ==================== DELETE ACCOUNT ====================
// DELETE /api/auth/delete-account - Xóa tài khoản user (yêu cầu authentication)
router.delete("/delete-account", authMiddleware, deleteAccountController);

export default router;
