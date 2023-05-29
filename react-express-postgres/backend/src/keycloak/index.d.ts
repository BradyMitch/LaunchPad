/* eslint-disable no-unused-vars */
import { Application, Router, Request, Response, NextFunction } from 'express';

// The token and user properties are not a part of the Request object by default.
declare global {
  namespace Express {
    interface Request {
      token?: string;
      user?: object;
    }
  }
}

export declare interface KeycloakUser {
  idir_user_guid?: string;
  identity_provider?: string;
  idir_username?: string;
  name?: string;
  preferred_username?: string;
  email?: string;
  given_name?: string;
  display_name?: string;
  family_name?: string;
  client_roles?: string[];
}

export declare interface KeycloakInitOptions {
  afterUserLogin?: (userInfo: KeycloakUser) => void;
}

declare function keycloakInit(app: Application, options?: KeycloakInitOptions): void;
declare async function login(req: Request, res: Response): void;
declare function loginCallback(options?: KeycloakInitOptions | undefined): Promise<void>;
declare async function loginCallbackRequest(req: Request, res: Response): void;
declare function logout(req: Request, res: Response): void;
declare function logoutCallback(req: Request, res: Response): void;
declare async function refreshToken(req: Request, res: Response): void;
declare async function keycloakMiddleware(req: Request, res: Response, next: NextFunction): void;
declare function oauthRouter(options?: KeycloakInitOptions | undefined): Router;
declare function encodeToBase64(string: string): string;
declare function decodeBase64ToJSON(base64String: string): object;
declare function parseJWT(token: string): object;
declare async function getTokens(code: unknown): Promise<any>;
declare async function getNewAccessToken(refresh_token: string): Promise<any>;
declare function getAuthorizationUrl(): string;
declare function getLogoutUrl(): string;
declare async function isJWTValid(jwt: string): Promise<boolean>;
declare function getUserInfo(access_token: string): any;
