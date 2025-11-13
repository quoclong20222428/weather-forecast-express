import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as GitHubStrategy } from "passport-github2";
import { findOrCreateUser } from "../services/auth/index.js";

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:5001/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateUser({
          provider: "google",
          providerId: profile.id,
          email: profile.emails?.[0]?.value || "",
          username: profile.displayName || "Google User",
          avatar: profile.photos?.[0]?.value,
        });
        // Map user để có userId property theo Express.User interface
        done(null, { userId: user.id, email: user.email });
      } catch (error) {
        done(error as Error);
      }
    }
  )
);

// ==================== FACEBOOK OAUTH (COMMENTED - NOT READY) ====================
/* Facebook OAuth Strategy - Tạm thời disable
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
      callbackURL: process.env.FACEBOOK_CALLBACK_URL || "http://localhost:5001/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateUser({
          provider: "facebook",
          providerId: profile.id,
          email: profile.emails?.[0]?.value || "",
          username: profile.displayName || "Facebook User",
          avatar: profile.photos?.[0]?.value,
        });
        done(null, { userId: user.id, email: user.email });
      } catch (error) {
        done(error as Error);
      }
    }
  )
);
*/

// GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      callbackURL: process.env.GITHUB_CALLBACK_URL || "http://localhost:5001/api/auth/github/callback",
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        const user = await findOrCreateUser({
          provider: "github",
          providerId: profile.id,
          email: profile.emails?.[0]?.value || `${profile.username}@github.local`,
          username: profile.displayName || profile.username || "GitHub User",
          avatar: profile.photos?.[0]?.value,
        });
        done(null, { userId: user.id, email: user.email });
      } catch (error) {
        done(error as Error);
      }
    }
  )
);

export default passport;
