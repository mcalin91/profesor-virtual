# 🔧 SETUP GUIDE - ProfesorApp

Ghid pas-cu-pas pentru setup local și deployment production.

---

## 1️⃣ LOCAL DEVELOPMENT SETUP

### Step 1: Prerequisites

```bash
# Check Node.js version (need 16+)
node -v    # Should be v16.0.0 or higher
npm -v     # Should be 7.0.0 or higher
```

If not installed:
- Download from [nodejs.org](https://nodejs.org)
- Install LTS version

### Step 2: Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/profesor-app.git
cd profesor-app
```

### Step 3: Install Dependencies

```bash
npm install

# If you get peer dependency warnings, use:
npm install --legacy-peer-deps
```

### Step 4: Create Environment File

```bash
# Copy template
cp .env.local.example .env.local

# Edit with your credentials
nano .env.local  # or use your editor
```

### Step 5: Get API Keys

#### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project" → "profesor-app"
3. Enable Analytics (optional)
4. Wait for creation
5. Click the gear icon → Project Settings
6. Scroll down → "Your apps"
7. Add Web app
8. Copy the config

```javascript
{
  "apiKey": "YOUR_API_KEY",
  "authDomain": "professor-app-XXXX.firebaseapp.com",
  "projectId": "professor-app-xxxx",
  "storageBucket": "professor-app-xxxx.appspot.com",
  "messagingSenderId": "1234567890",
  "appId": "1:1234567890:web:abc123def456"
}
```

9. Add these to `.env.local` as `REACT_APP_FIREBASE_*`

#### Claude API Setup

1. Go to [Anthropic Console](https://console.anthropic.com/account/keys)
2. Click "Create new secret key"
3. Copy the key (starts with `sk-ant-`)
4. Add to `.env.local` as `REACT_APP_CLAUDE_API_KEY`

#### Firebase Firestore Setup

1. In Firebase Console → Firestore Database
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Choose region: `europe-west1` (Belgium - closest to Romania)
5. Create

**⚠️ Security Note:** Test mode allows all reads/writes. For production, set proper security rules (see ARCHITECTURE.md).

### Step 6: Start Development Server

```bash
npm start
```

This will:
- Start React dev server on http://localhost:3000
- Auto-reload on file changes
- Show errors in browser console

### Step 7: Test the App

1. Open http://localhost:3000
2. Register new account
3. Select Class (e.g., VI)
4. Explore Dashboard
5. Try a Lesson
6. Chat with AI Tutor

---

## 2️⃣ FIREBASE SETUP IN DETAIL

### Enable Authentication

```
Firebase Console → Authentication
├─ Sign-in method
│  ├─ Email/Password → Enable
│  ├─ Google → Configure
│  └─ (Optional) GitHub, Apple, etc.
├─ Users → Manage users (admin)
└─ Settings → Authorized domains
```

Add your deployment domain:
- Development: `localhost:3000`
- Production: `profesor-app.vercel.app`
- Custom: `profesor-app.ro`

### Create Firestore Collections

```
Firestore Database → Create Collection

Collections to create:
├─ users          (Student profiles)
├─ student_progress (Scores, streak, badges)
├─ lessons        (Lesson content)
├─ exercises      (Exercise problems)
├─ quizzes        (Quiz questions)
├─ submissions    (Student answers)
├─ ai_feedback    (AI responses)
├─ study_groups   (Peer groups)
├─ leaderboard    (Rankings)
└─ parent_accounts (Parent data)
```

### Set Security Rules

In Firestore → Rules tab, paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /student_progress/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /curriculum/{document=**} {
      allow read: if request.auth != null;
    }
    match /leaderboard/{document=**} {
      allow read: if request.auth != null;
    }
    match /submissions/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Then click "Publish"

---

## 3️⃣ DEPLOYMENT TO VERCEL

### Prerequisites
- GitHub account (free)
- Vercel account (free)
- Repository pushed to GitHub

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: ProfesorApp v1.0"
git remote add origin https://github.com/YOUR_USERNAME/profesor-app.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

**Option A: Via Web (Easy)**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Find "profesor-app" → Click Import
5. Framework preset: React
6. Build command: `npm run build`
7. Output directory: `build`
8. Click "Configure" → Environment Variables
9. Add all variables from `.env.local`:
   ```
   REACT_APP_FIREBASE_API_KEY
   REACT_APP_FIREBASE_AUTH_DOMAIN
   REACT_APP_FIREBASE_PROJECT_ID
   REACT_APP_FIREBASE_STORAGE_BUCKET
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID
   REACT_APP_FIREBASE_APP_ID
   REACT_APP_CLAUDE_API_KEY
   ```
10. Click "Deploy"
11. Wait 2-3 minutes...
12. **LIVE!** 🎉

**Option B: Via CLI**

```bash
npm i -g vercel
vercel

# Follow prompts:
# - Link to GitHub? (yes)
# - Project name? (profesor-app)
# - Set build settings? (yes, defaults OK)
# - Add environment variables? (yes, paste them)
```

### Step 3: Add Custom Domain

```bash
# In Vercel dashboard:
# Project → Settings → Domains → Add Domain
# 
# Your domain (e.g. profesor-app.ro) will be routed to:
# profesor-app.vercel.app
#
# Update nameservers at your registrar (GoDaddy, Namecheap, etc.)
```

### Step 4: Update Firebase

In Firebase Console:
```
Authentication → Settings → Authorized domains
└─ Add: profesor-app.vercel.app
└─ Add: profesor-app.ro (if using custom domain)
```

---

## 4️⃣ CONTINUOUS DEPLOYMENT (Auto Deploy)

Every time you push to GitHub, Vercel automatically redeploys:

```bash
# Make changes
git add .
git commit -m "Fix: AI tutor response"
git push origin main

# Vercel sees the push, rebuilds, and deploys automatically
# Check deployment status: vercel.com/professor-app → Deployments
```

To disable auto-deploy:
```
Vercel → Project Settings → Git
└─ Uncheck "Deploy on Push"
```

---

## 5️⃣ ENVIRONMENT VARIABLES EXPLAINED

```bash
# Firebase credentials
REACT_APP_FIREBASE_API_KEY
  → Your API key for Firebase
  → DO NOT share publicly
  
REACT_APP_FIREBASE_AUTH_DOMAIN
  → Firebase auth domain (your-project.firebaseapp.com)
  
REACT_APP_FIREBASE_PROJECT_ID
  → Your Firebase project ID
  
# etc...

# Claude API
REACT_APP_CLAUDE_API_KEY
  → Your Anthropic API key
  → Starts with sk-ant-
  → Worth money - keep secret!
  → Set budget in Anthropic console

# Optional
REACT_APP_ENVIRONMENT=production
  → Set to 'production' on Vercel
  → Set to 'development' locally
```

---

## 6️⃣ TROUBLESHOOTING

### "Cannot find module 'firebase'"
```bash
npm install firebase
```

### "Claude API not working"
- Check `.env.local` has `REACT_APP_CLAUDE_API_KEY`
- Check key starts with `sk-ant-`
- Check key hasn't expired (Anthropic console)
- Check you have $5+ credit in Anthropic

### "Firestore says insufficient permissions"
- Check security rules are published
- Check user is authenticated
- Check rules match your queries
- Try Firebase Console → Firestore → Testing tab

### "Vercel deployment fails"
```bash
# Check build locally first
npm run build

# If it fails locally, fix issues before pushing
# Common issues:
# - Missing dependencies (npm install)
# - Syntax errors (run locally)
# - Missing .env variables (check Vercel settings)
```

### "Port 3000 already in use"
```bash
# Run on different port
npm start -- --port 3001
```

---

## 7️⃣ DATABASE BACKUP

### Backup Firestore

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Export database
firebase firestore:export backups/$(date +%Y%m%d_%H%M%S)

# List backups
firebase firestore:list-backups
```

### Manual Backup (Vercel)

1. Vercel → Project → Settings → Environment Variables
2. Export as .env file
3. Keep in safe location
4. Don't commit to Git!

---

## 8️⃣ SCALING & PRODUCTION CHECKLIST

- [ ] Enable Firestore backups
- [ ] Update security rules (from test mode)
- [ ] Configure email authentication
- [ ] Set up error monitoring (Sentry)
- [ ] Set up analytics (Google Analytics)
- [ ] Configure rate limiting
- [ ] Set budget alerts (Claude API)
- [ ] SSL certificate (automatic on Vercel)
- [ ] Domain configured and DNS updated
- [ ] Monitoring and alerts set up
- [ ] Disaster recovery plan
- [ ] Performance optimized
- [ ] SEO configured
- [ ] Privacy policy + Terms of Service

---

## 9️⃣ USEFUL COMMANDS

```bash
# Development
npm start              # Run dev server
npm test               # Run tests
npm run build          # Build for production

# Git
git status             # Check changes
git add .              # Stage changes
git commit -m "msg"    # Commit
git push               # Push to GitHub
git log                # View history

# Firebase
firebase login         # Login to Firebase
firebase firestore:export ./backup  # Backup data

# Vercel
vercel --prod          # Deploy to production
vercel preview         # Create preview URL
```

---

## 🔟 SECURITY CHECKLIST

**Local Development:**
- ✅ `.env.local` in `.gitignore` (never commit secrets)
- ✅ Use fake data for testing
- ✅ Don't share `.env.local` files

**Production (Vercel):**
- ✅ Environment variables set in Vercel dashboard
- ✅ Secrets NOT in repository
- ✅ Firestore rules configured properly
- ✅ Authentication enabled
- ✅ SSL/HTTPS (automatic)
- ✅ Regular backups
- ✅ Monitoring enabled

---

## 📞 SUPPORT

- **GitHub Issues:** https://github.com/YOUR_USERNAME/profesor-app/issues
- **Documentation:** See ARCHITECTURE.md
- **Firebase Support:** https://firebase.google.com/support
- **Claude API Support:** https://support.anthropic.com

---

## ✅ Next Steps

1. ✅ Complete this setup
2. ✅ Test app locally
3. ✅ Deploy to Vercel
4. ✅ Invite beta testers
5. ✅ Gather feedback
6. ✅ Iterate features

---

**Happy learning! 🎓**
