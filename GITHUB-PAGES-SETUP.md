# 🚀 GitHub Pages Deployment Guide

## Setup Steps (One-Time Configuration)

### 1. Enable GitHub Pages
1. Go to your repository on GitHub: https://github.com/abiodunraji/Hof
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Source: **GitHub Actions** (not "Deploy from a branch")
5. Click **Save**

### 2. Push Your Code
```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### 3. Wait for Deployment
- Go to **Actions** tab in your repository
- You'll see the "Deploy to GitHub Pages" workflow running
- Wait for it to complete (usually 2-3 minutes)
- Your site will be live at: **https://abiodunraji.github.io/Hof/**

## 📦 What Was Configured

✅ **vite.config.ts** - Added `base: '/Hof/'` for correct asset paths  
✅ **package.json** - Added preview script  
✅ **.github/workflows/deploy.yml** - Automated deployment workflow  

## 🔄 How It Works

Every time you push to the `main` branch:
1. GitHub Actions automatically builds your project
2. Deploys the `build/` folder to GitHub Pages
3. Your live site updates in 2-3 minutes

## 🌐 Your Live URL

Once deployed, share this URL with clients:
```
https://abiodunraji.github.io/Hof/
```

## 🛠️ Manual Deployment (Optional)

If you want to manually trigger deployment:
1. Go to **Actions** tab
2. Click "Deploy to GitHub Pages" workflow
3. Click **Run workflow** button
4. Select `main` branch
5. Click **Run workflow**

## 📱 Testing Locally

To test the production build locally before deploying:
```bash
npm run build
npm run preview
```
Then open: http://localhost:4173/Hof/

## ❓ Troubleshooting

**Q: My site shows 404 errors**  
A: Make sure you selected "GitHub Actions" as the source in Settings → Pages

**Q: Images or assets not loading**  
A: The `base: '/Hof/'` in vite.config.ts ensures correct paths. If issues persist, check image paths start with `/portfolio/` not `./portfolio/`

**Q: Workflow failed**  
A: Check the Actions tab for error details. Common issues:
- npm dependencies not installing (check package.json)
- Build errors (run `npm run build` locally first)

## 🎯 Next Steps

1. Complete the setup steps above
2. Push your code to GitHub
3. Wait for deployment
4. Share the live URL with your clients!
