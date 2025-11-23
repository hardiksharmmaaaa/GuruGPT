# Google Authentication Setup Guide

This guide explains how to set up Google Authentication for the AI Tutor application.

## 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Click on the project dropdown at the top and select **New Project**.
3. Give your project a name (e.g., "AI Tutor") and click **Create**.

## 2. Configure OAuth Consent Screen

1. In the left sidebar, navigate to **APIs & Services** > **OAuth consent screen**.
2. Select **External** (unless you have a Google Workspace organization) and click **Create**.
3. Fill in the required fields:
    - **App name**: AI Tutor
    - **User support email**: Your email
    - **Developer contact information**: Your email
4. Click **Save and Continue**.
5. You can skip the "Scopes" section for now by clicking **Save and Continue**.
6. Add yourself as a **Test User** so you can log in during development. Click **Save and Continue**.

## 3. Create OAuth Credentials

1. Navigate to **APIs & Services** > **Credentials**.
2. Click **Create Credentials** > **OAuth client ID**.
3. Select **Web application** as the Application type.
4. Name it "AI Tutor Web Client".
5. Under **Authorized JavaScript origins**, add:
    - `http://localhost:3000`
6. Under **Authorized redirect URIs**, you MUST add:
    - `http://localhost:3000`
    - `http://127.0.0.1:3000`
    > **Important:** This is the most common cause of the `redirect_uri_mismatch` error. Ensure these are added exactly as shown.
7. Click **Create**.

## 4. Get Your Client ID

1. Copy the **Client ID** from the popup (it looks like `123456789-abcdefg.apps.googleusercontent.com`).
2. You do not need the Client Secret for this frontend-only flow.

## 5. Configure the Application

1. Open the `.env` file in the root of the `frontend` directory.
2. Add your Client ID:
   ```env
   REACT_APP_GOOGLE_CLIENT_ID=your-client-id-goes-here
   ```
3. Restart the development server:
   ```bash
   npm start
   ```

## Troubleshooting

- **invalid_client**: This usually means the Client ID is incorrect or missing.
- **popup_closed_by_user**: The user closed the login popup before finishing.
- **access_denied**: The user denied the permissions.
