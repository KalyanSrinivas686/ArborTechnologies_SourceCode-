# Deployment Instructions for Arbor Technologies
**Target Server IP:** 98.81.173.59

Your production-ready build has been successfully generated in the `dist/frontend/browser` folder.

## How to Deploy to Your EC2 Instance

You need to copy the *contents* of the `dist/frontend/browser` folder to your web server's root directory (typically `/var/www/html` for Nginx/Apache).

### Option 1: Using SCP (Command Line)
Run this command from your local terminal (replace `your-key.pem` with your actual key file path):

```bash
scp -r -i "path/to/your-key.pem" dist/frontend/browser/* ubuntu@98.81.173.59:/var/www/html/
```

### Option 2: Using WinSCP / FileZilla (GUI)
1.  Connect to `98.81.173.59` using your EC2 username (usually `ubuntu` or `ec2-user`) and private key.
2.  Navigate to `/var/www/html` on the server.
3.  Upload all files and folders from `dist/frontend/browser/` on your local machine to that directory.

### Verify Deployment
Once uploaded, open your browser and visit:
**http://98.81.173.59**
