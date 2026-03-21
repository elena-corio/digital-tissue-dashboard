# Authentication Setup (Clerk JS)

This project uses Clerk JS (not the Vue plugin) and a custom composable to manage auth state and tokens.

## 1) Clerk account

- Create an app in the Clerk dashboard.
- Copy the **Publishable Key** (must start with `pk_test_` or `pk_live_`).

## 2) Frontend env

`frontend/.env` (local development)
```env
VITE_SPECKLE_SERVER=https://app.speckle.systems
VITE_API_URL=http://localhost:8000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
VITE_SKIP_AUTH=true  # Skip Clerk auth for local testing
```

`frontend/.env.production`
```env
VITE_API_URL=https://digital-tissue.onrender.com
VITE_CLERK_PUBLISHABLE_KEY=pk_live_YOUR_KEY_HERE
# No VITE_SKIP_AUTH - production requires authentication
```

## 3) Run locally

Frontend:
```bash
cd frontend
npm run dev
```

## 4) Authentication behavior

### Local Development (`VITE_SKIP_AUTH=true`)
- **Frontend**: No authentication required, direct access to all routes
- **Backend**: Missing auth headers are accepted by default in local dev (`RENDER` not set) and return a mock user payload
- **Purpose**: Easy testing without Clerk setup

Optional local backend override:
- Set `LOCAL_AUTH_OPTIONAL=false` to require auth headers even in local dev
- Set `SKIP_AUTH=true` to bypass all auth checks

### Common pitfall (local no data)

If frontend is running without Clerk tokens and backend is configured to require auth headers (for example `LOCAL_AUTH_OPTIONAL=false`), metrics endpoints return `401` and the frontend can look empty.

Quick fix for local testing:
- set `LOCAL_AUTH_OPTIONAL=true` (recommended), or
- set `SKIP_AUTH=true` (bypass all auth checks)
- restart backend after env changes

### Production (no `VITE_SKIP_AUTH`)
- **Frontend**: Clerk JS required, must sign in to access `/workspace`
- **Backend**: All `/api/metrics` endpoints require valid Clerk JWT
- **Restriction**: Emails must match `ALLOWED_EMAIL_DOMAIN` (`students.iaac.net` by default, comma-separated values supported)
- **Security**: Full JWT validation with audience/issuer checks

## 7) Authorization policy details

- Authorization is enforced in `backend/src/infrastructure/clerk_auth.py`.
- Domain checks are applied in both:
	- `verify_clerk_token` (required auth dependency)
	- `get_optional_user` (optional auth helper; invalid domains are treated as unauthenticated)
- Email is resolved from Clerk claims in this order:
	1. `email` / `email_address`
	2. `primary_email_address_id` lookup in `email_addresses`
	3. first valid email in `email_addresses`

## 8) Auth failure logging

The backend logs auth failures (without token contents) for:
- missing authorization header
- invalid auth scheme/header format
- JWT verification failures
- missing email claim
- disallowed email domain

Repeated failures from the same client IP are temporarily rate-limited and return `429`.

## 6) Key files

- `frontend/src/composables/useClerk.js` - Clerk initialization and session management
- `frontend/src/router.js` - Route protection with `VITE_SKIP_AUTH` check
- `frontend/src/views/SignIn.vue` - Sign in page
- `frontend/src/views/SignUp.vue` - Sign up page
