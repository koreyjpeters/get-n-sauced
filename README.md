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
3. **Firebase (backend):** Copy [.env.example](.env.example) vars into `.env.local` and add your Firebase project config from [Firebase Console](https://console.firebase.google.com) → Project settings → Your apps.
4. Run the app:
   `npm run dev`
