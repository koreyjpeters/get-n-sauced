<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/10fBy2UR5E0NoFeT4PFGv8X1uytAQWXSd

## Connect to GitHub

1. **Create a new repository** on [GitHub](https://github.com/new):
   - Name: `get-n-sauced` (or any name you prefer)
   - Choose **Private** or **Public**
   - Do **not** initialize with a README, .gitignore, or license (you already have these)

2. **Add the remote** (replace `YOUR_USERNAME` with your GitHub username):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/get-n-sauced.git
   ```

3. **Make your first commit and push**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git push -u origin main
   ```

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (if using Gemini).
3. **Firebase (backend):** Copy [.env.example](.env.example) vars into `.env.local` and add your Firebase project config from [Firebase Console](https://console.firebase.google.com) → Project settings → Your apps. The app uses **Firestore** (menu, gallery, messages, catering, subscribers) and **Firebase Auth** (admin login).
4. **Admin user:** In Firebase Console → Authentication → Users, add a user (email/password) to sign in at `/admin`.
5. **Firestore rules:** Deploy [firestore.rules](firestore.rules) so the app can read/write: `firebase deploy --only firestore:rules` (requires Firebase CLI and project linked).
6. Run the app:
   `npm run dev`

## Deploy (Firebase / Cloud Run)

The app listens on the `PORT` environment variable (default 8080) so it works on Cloud Run and Firebase App Hosting. Deploy flow:

1. **Build:** `npm run build` (outputs to `dist/`)
2. **Start:** `npm run start` (serves `dist/` on `PORT`)

Ensure your hosting config uses `npm run build` then `npm run start` (not `npm run dev` or `npm run preview`).
