# Deployment Guide

Complete guide for deploying your AI Chatbot to various hosting platforms.

## Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Vercel Deployment](#vercel-deployment)
3. [Netlify Deployment](#netlify-deployment)
4. [GitHub Pages](#github-pages)
5. [Railway Deployment](#railway-deployment)
6. [Custom Server](#custom-server)
7. [Environment Variables](#environment-variables)
8. [Post-Deployment](#post-deployment)

---

## Pre-Deployment Checklist

Before deploying, ensure:

- ✅ Application builds successfully (`npm run build`)
- ✅ All tests pass (if applicable)
- ✅ Environment variables documented
- ✅ `.env` added to `.gitignore`
- ✅ API keys secured
- ✅ Dependencies updated
- ✅ No console errors in production build

**Test Production Build Locally:**
```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to test production build.

---

## Vercel Deployment

**Recommended** - Best for React/Vite applications.

### Method 1: Vercel CLI (Fastest)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow Prompts**
   - Set up and deploy: Y
   - Scope: Your account
   - Link to existing project: N
   - Project name: ai-chatbot
   - Directory: ./
   - Override settings: N

4. **Add Environment Variables**
   ```bash
   vercel env add VITE_GEMINI_API_KEY
   ```
   Paste your API key when prompted.

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Method 2: Vercel Dashboard

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/ai-chatbot.git
   git push -u origin main
   ```

2. **Import in Vercel**
   - Visit https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Add Environment Variables**
   - Go to Settings > Environment Variables
   - Add `VITE_GEMINI_API_KEY`
   - Add `VITE_SUPABASE_URL` (if using)
   - Add `VITE_SUPABASE_ANON_KEY` (if using)

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your app is live!

**Vercel Configuration (`vercel.json`):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Netlify Deployment

### Method 1: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize**
   ```bash
   netlify init
   ```

4. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Method 2: Netlify Dashboard

1. **Push to GitHub** (see Vercel method)

2. **Import in Netlify**
   - Visit https://app.netlify.com
   - Click "Add new site" > "Import an existing project"
   - Connect to GitHub
   - Select your repository

3. **Configure Build**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variables (see below)

4. **Deploy**

### Method 3: Drag & Drop

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Visit https://app.netlify.com/drop
   - Drag `dist` folder
   - Add environment variables in site settings

**Netlify Configuration (`netlify.toml`):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

## GitHub Pages

**Note:** GitHub Pages is static hosting only. Environment variables need special handling.

### Setup

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update `package.json`**
   ```json
   {
     "homepage": "https://yourusername.github.io/ai-chatbot",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update `vite.config.ts`**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/ai-chatbot/', // Your repo name
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Configure GitHub**
   - Go to repo Settings > Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Folder: / (root)

### Environment Variables on GitHub Pages

Since GitHub Pages is static, you can't use server-side env vars. Options:

**Option 1: Build-time Variables**
```bash
# Build with variables
VITE_GEMINI_API_KEY=your_key npm run build
npm run deploy
```

**Option 2: Configuration File (Not Recommended for Sensitive Keys)**
Create `src/config.ts`:
```typescript
export const config = {
  geminiApiKey: 'your_public_key', // Use with caution
}
```

**Option 3: Prompt User for Key**
Add UI to let users enter their own API key.

---

## Railway Deployment

Railway is great for full-stack apps with backend needs.

### Deploy with Railway

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login**
   ```bash
   railway login
   ```

3. **Initialize Project**
   ```bash
   railway init
   ```

4. **Add Environment Variables**
   ```bash
   railway variables set VITE_GEMINI_API_KEY=your_key
   ```

5. **Deploy**
   ```bash
   railway up
   ```

### Railway Configuration

Create `railway.json`:
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm run preview",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

---

## Custom Server

Deploy to your own server (VPS, AWS, etc.).

### Prerequisites

- Node.js 18+ installed
- Nginx or Apache
- Domain name (optional)
- SSL certificate (Let's Encrypt)

### Deployment Steps

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Upload `dist` Folder**
   ```bash
   scp -r dist/* user@yourserver.com:/var/www/ai-chatbot/
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       root /var/www/ai-chatbot;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # Gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript;
   }
   ```

4. **SSL with Certbot**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

5. **Restart Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

### Using Docker

**Dockerfile:**
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Deploy:**
```bash
docker build -t ai-chatbot .
docker run -p 80:80 ai-chatbot
```

---

## Environment Variables

### Required Variables

| Variable | Description | Where Used |
|----------|-------------|------------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key | All deployments |

### Optional Variables

| Variable | Description | Where Used |
|----------|-------------|------------|
| `VITE_SUPABASE_URL` | Supabase project URL | If using Supabase |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key | If using Supabase |

### Platform-Specific Setup

#### Vercel
```bash
vercel env add VITE_GEMINI_API_KEY production
```

#### Netlify
```bash
netlify env:set VITE_GEMINI_API_KEY your_key
```

#### Railway
```bash
railway variables set VITE_GEMINI_API_KEY=your_key
```

#### Environment File (.env.production)
```env
VITE_GEMINI_API_KEY=your_production_key
VITE_SUPABASE_URL=your_production_url
VITE_SUPABASE_ANON_KEY=your_production_key
```

---

## Post-Deployment

### 1. Verify Deployment

- ✅ Application loads
- ✅ Chat functionality works
- ✅ API calls succeed
- ✅ Styling correct
- ✅ Mobile responsive
- ✅ No console errors

### 2. Performance Check

Test with:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### 3. SEO Setup (Optional)

Update `index.html`:
```html
<head>
  <title>AI Chatbot - Powered by Gemini AI</title>
  <meta name="description" content="Modern AI chatbot powered by Google Gemini">
  <meta property="og:title" content="AI Chatbot">
  <meta property="og:description" content="Modern AI chatbot">
  <meta property="og:image" content="/preview.png">
</head>
```

### 4. Analytics (Optional)

Add Google Analytics or similar:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 5. Monitoring

Set up monitoring with:
- **Vercel Analytics** (built-in)
- **Sentry** (error tracking)
- **LogRocket** (session replay)

### 6. Custom Domain

#### Vercel
1. Go to Project Settings > Domains
2. Add your domain
3. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

#### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS to Netlify nameservers

---

## Troubleshooting

### Build Fails

**Error: "Cannot find module"**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error: "Out of memory"**
```bash
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Environment Variables Not Working

- Ensure variables start with `VITE_`
- Rebuild after adding variables
- Clear cache and redeploy
- Check platform-specific syntax

### 404 Errors on Refresh

Add rewrites/redirects (see platform configs above).

### Slow Loading

- Enable gzip compression
- Add CDN (Cloudflare)
- Optimize images
- Code splitting
- Lazy loading

---

## Deployment Comparison

| Platform | Difficulty | Speed | Cost | Best For |
|----------|-----------|-------|------|----------|
| Vercel | Easy | Fast | Free tier | Most projects |
| Netlify | Easy | Fast | Free tier | Static sites |
| GitHub Pages | Medium | Medium | Free | Open source |
| Railway | Medium | Fast | Paid | Full-stack apps |
| Custom Server | Hard | Varies | Variable | Full control |

---

## Security Checklist

Before going live:

- ✅ API keys in environment variables (not code)
- ✅ `.env` in `.gitignore`
- ✅ HTTPS enabled
- ✅ CORS configured properly
- ✅ Rate limiting (if applicable)
- ✅ Input validation
- ✅ Dependencies updated
- ✅ Security headers configured

---

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Build
      run: npm run build
      env:
        VITE_GEMINI_API_KEY: ${{ secrets.VITE_GEMINI_API_KEY }}

    - name: Deploy to Vercel
      run: vercel --prod
      env:
        VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

**Your AI Chatbot is ready for the world! Choose the platform that fits your needs and deploy with confidence.**
