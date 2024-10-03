/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthSignupPost200Response } from '../models/AuthSignupPost200Response';
import type { JwtToken } from '../models/JwtToken';
import type { LoginRequest } from '../models/LoginRequest';
import type { SignupRequest } from '../models/SignupRequest';
import type { TokenRefreshRequest } from '../models/TokenRefreshRequest';
import type { ValidateToken200Response } from '../models/ValidateToken200Response';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Register a new user
     * Create a new user account with email and password.
     * @param requestBody
     * @returns AuthSignupPost200Response User registered successfully
     * @throws ApiError
     */
    public static authSignupPost(
        requestBody: SignupRequest,
    ): CancelablePromise<AuthSignupPost200Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                500: `Server error`,
            },
        });
    }
    /**
     * Refresh Access Token
     * Refresh the access token using a valid refresh token.
     * @param requestBody
     * @returns JwtToken Token refreshed successfully
     * @throws ApiError
     */
    public static authRefreshPost(
        requestBody: TokenRefreshRequest,
    ): CancelablePromise<JwtToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/refresh',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid or expired refresh token`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns JwtToken Login successful
     * @throws ApiError
     */
    public static authLoginPost(
        requestBody?: LoginRequest,
    ): CancelablePromise<JwtToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Validate JWT token
     * Validates the provided JWT token to check if it's valid and not expired.
     * @param authorization Bearer token to be validated.
     * @returns ValidateToken200Response Token is valid
     * @throws ApiError
     */
    public static validateToken(
        authorization: string,
    ): CancelablePromise<ValidateToken200Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/validateToken',
            headers: {
                'Authorization': authorization,
            },
            errors: {
                401: `Invalid or expired token`,
            },
        });
    }
}
