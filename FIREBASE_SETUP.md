# Firebase Backend Setup

This portfolio uses Firebase in a cost-effective way:

- One Firestore document stores the editable portfolio content.
- Firebase Auth protects the admin page.
- Static project screenshots stay in the app, so Firebase Storage is not needed yet.

## 1. Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Create a project.
3. Disable Google Analytics if you want the simplest setup.

## 2. Create Web App

1. In Firebase project settings, add a Web app.
2. Copy the Firebase config values.
3. Create a local `.env` file from `.env.example`.
4. Fill these values:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## 3. Enable Authentication

1. Open Authentication.
2. Click Get started.
3. Enable Email/Password sign-in.
4. Add your admin user email and password.

Use that email/password at `/admin`.

## 4. Create Firestore Database

1. Open Firestore Database.
2. Create database.
3. Start in production mode.
4. Choose the nearest region.

## 5. Add Security Rules

In Firestore Rules, paste the contents of `firestore.rules`.

These rules allow public reads but require login for writes:

```js
allow read: if true;
allow write: if request.auth != null;
```

## 6. First Save

1. Start the app.
2. Visit `/admin`.
3. Sign in with Firebase Auth.
4. Click Save.

That creates this Firestore document:

```txt
portfolio/content
```

The public homepage reads that document.

## 7. Deployment

On Vercel or Netlify, add the same `VITE_FIREBASE_*` environment variables.

Then deploy the frontend normally.

## 8. Contact Form Email Delivery

The contact form uses Web3Forms for direct email delivery from a static frontend.

1. Go to https://web3forms.com/
2. Create an access key for `abdulmalikmuze@gmail.com`.
3. Add it to `.env`:

```bash
VITE_WEB3FORMS_ACCESS_KEY=your_access_key
```

4. Restart the dev server.

Without this key, the form falls back to opening the visitor's email app with a prepared message.
