import { Router } from "express";
import passport from "../config/passport.js";
import { 
  googleCallbackController, 
  // facebookCallbackController, 
  githubCallbackController,
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

// ==================== FACEBOOK OAUTH (DISABLED - NOT READY) ====================
/* Facebook OAuth - Tạm thời disable
// GET /api/auth/facebook - Bắt đầu Facebook OAuth flow
router.get(
  "/facebook",
  passport.authenticate("facebook", { 
    scope: ["email"],
    session: false 
  })
);

// GET /api/auth/facebook/callback - Callback sau khi Facebook xác thực
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { 
    session: false,
    failureRedirect: "/login?error=facebook_auth_failed"
  }),
  facebookCallbackController
);
*/

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
