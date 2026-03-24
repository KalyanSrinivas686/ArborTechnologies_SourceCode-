# Production Deployment Guide
## Arbor Technologies Website

This guide will help you deploy your website to production hosting platforms.

## ✅ Current Status
- Production build is working perfectly
- Files generated successfully in `dist/frontend/browser/`
- Ready for deployment

## 🚀 Recommended Deployment Options

### Option 1: Netlify (Recommended - Free & Easy)

#### Why Netlify?
- ✅ Free tier includes HTTPS
- ✅ Automatic deployments from Git
- ✅ CDN included
- ✅ Easy custom domain setup
- ✅ Perfect for Angular/React apps

#### Deployment Steps:

1. **Create `netlify.toml` in project root**
Already done! Check your project root for `netlify.toml`

2. **Push code to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

3. **Deploy to Netlify**
- Go to [netlify.com](https://netlify.com)
- Sign up with GitHub
- Click "New site from Git"
- Select your repository
- Netlify auto-detects Angular settings!
- Click "Deploy"

4. **Your site is live!**
- You'll get a URL like: `https://arbor-technologies.netlify.app`
- Can add custom domain in Netlify settings

---

### Option 2: Vercel (Also Great & Free)

#### Deployment Steps:

1. **Install Vercel CLI**
```powershell
npm install -g vercel
```

2. **Deploy**
```powershell
vercel --prod
```

3. **Follow the prompts**
- Vercel will auto-detect Angular
- Your site will be live immediately!
- You'll get a URL like: `https://arbor-technologies.vercel.app`

---

### Option 3: GitHub Pages (Free but requires configuration)

#### Deployment Steps:

1. **Install angular-cli-ghpages**
```powershell
npm install -g angular-cli-ghpages
```

2. **Build and Deploy**
```powershell
# Build with correct base href
ng build --configuration production --base-href "/repository-name/"

# Deploy
npx angular-cli-ghpages --dir=dist/frontend/browser
```

3. **Enable GitHub Pages**
- Go to repository Settings → Pages
- Select `gh-pages` branch
- Your site will be at: `https://yourusername.github.io/repository-name/`

---

### Option 4: AWS S3 + CloudFront (Professional)

#### Why AWS?
- ✅ Highly scalable
- ✅ Professional infrastructure
- ✅ Custom domain + SSL
- ⚠️ Requires AWS account
- ⚠️ Slightly more complex setup

#### Deployment Steps:

1. **Create S3 Bucket**
```powershell
# Install AWS CLI
choco install awscli
# or
pip install awscli

# Configure AWS
aws configure
```

2. **Build for Production**
```powershell
npm run build
```

3. **Upload to S3**
```powershell
aws s3 sync dist/frontend/browser/ s3://your-bucket-name --delete
```

4. **Configure S3 for Static Website Hosting**
- Enable static website hosting in S3 bucket settings
- Set index document: `index.html`
- Set error document: `index.html` (for Angular routing)

5. **Set up CloudFront (Optional but recommended for HTTPS)**

---

### Option 5: Traditional Web Hosting (cPanel/Shared Hosting)

#### Deployment Steps:

1. **Build for Production**
```powershell
npm run build
```

2. **Upload Files**
   - Navigate to `dist/frontend/browser/`
   - Upload ALL files to your web hosting via FTP/SFTP
   - Upload to `public_html` or `www` directory

3. **Configure .htaccess** (for Apache servers)
Create a `.htaccess` file in the root directory:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] Production build completes successfully (`npm run build`)
- [ ] All environment variables are set correctly
- [ ] Base href is correct (use `/` for root domain, `/subfolder/` for subdirectories)
- [ ] Custom domain DNS is pointed correctly (if using custom domain)
- [ ] SSL certificate is configured (most platforms do this automatically)

---

## 🔧 Build Commands for Different Platforms

### Standard Production Build
```powershell
npm run build
```

### Build with Custom Base Href
```powershell
ng build --configuration production --base-href "/your-path/"
```

### Build with Source Maps (for debugging)
```powershell
ng build --configuration production --source-map
```

---

## 🌐 Custom Domain Setup

### For Netlify/Vercel:
1. Go to site settings
2. Add custom domain
3. Update your DNS records as instructed
4. SSL certificate auto-provisioned

### DNS Records Example:
```
Type: A
Name: @
Value: (provided by your hosting platform)

Type: CNAME
Name: www
Value: (provided by your hosting platform)
```

---

## 📊 Post-Deployment Testing

After deployment, test:

1. **Homepage loads correctly**
   - Visit your domain
   - Check console for errors (F12)

2. **All routes work**
   - Test navigation
   - Try direct URL access to different pages
   - Refresh pages to test routing

3. **Assets load correctly**
   - Images display
   - Fonts load
   - CSS applies correctly

4. **Mobile responsive**
   - Test on mobile devices
   - Check different screen sizes

5. **Performance**
   - Use Google PageSpeed Insights
   - Check lighthouse scores

---

## 🚨 Common Deployment Issues & Fixes

### Issue: "404 Not Found" on page refresh
**Solution**: Configure server to redirect all requests to `index.html`

### Issue: Blank page after deployment
**Solutions**:
1. Check base href in `index.html`
2. Clear browser cache
3. Check console for errors
4. Verify all files uploaded correctly

### Issue: Assets not loading (404 errors)
**Solutions**:
1. Check base href configuration
2. Verify file paths are relative
3. Check server MIME types

### Issue: Routing doesn't work
**Solution**: Configure server redirect rules (see platform-specific guides above)

---

## 🎯 Quick Start Commands

### Local Testing of Production Build:
```powershell
# Build
npm run build

# Serve locally
.\serve-website.ps1
```

### Deploy to Netlify (after setup):
```powershell
git add .
git commit -m "Update"
git push
# Auto-deploys!
```

### Deploy to Vercel:
```powershell
vercel --prod
```

---

## 📞 Support

If you encounter issues:
1. Check build output for errors
2. Review console errors in browser (F12)
3. Verify DNS propagation (can take 24-48 hours)
4. Contact hosting platform support

---

## 🎉 Your Website is Production-Ready!

Your Arbor Technologies website is now ready to be deployed to production. Choose the platform that best fits yourneeds and follow the steps above.

**Recommended for beginners**: Start with **Netlify** - it's the easiest and includes everything you need!
