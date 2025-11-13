// Types for OAuth authentication
export interface OAuthUserData {
  provider: string;
  providerId: string;
  email: string;
  username: string;
  avatar?: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
}
