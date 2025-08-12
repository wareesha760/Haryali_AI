# 🚀 Kisaan Bot Backend - Vercel Deployment Guide

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Free cloud database (recommended)
3. **GitHub Repository**: Your code should be on GitHub

## 🔧 Setup Steps

### 1. **MongoDB Atlas Setup** (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace `MONGO_URI` in environment variables

### 2. **Environment Variables**

Set these in Vercel dashboard:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/kisaan-bot
JWT_SECRET=your_super_secret_jwt_key_here
HF_TOKEN=hf_demo
NODE_ENV=production
```

### 3. **Deploy to Vercel**

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to backend directory
cd frontend/backend

# Deploy
vercel

# Follow the prompts
# - Link to existing project or create new
# - Set environment variables
```

#### Option B: GitHub Integration
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Set root directory to `frontend/backend`
6. Configure environment variables
7. Deploy

### 4. **Update Frontend API URLs**

After deployment, update your frontend API calls to use the Vercel URL:

```javascript
// Replace localhost:5001 with your Vercel URL
const API_BASE_URL = 'https://your-backend.vercel.app/api';
```

## 🔍 **Testing Your Deployment**

### Health Check
```
GET https://your-backend.vercel.app/
```

### Test API Endpoints
```
GET https://your-backend.vercel.app/api/weather
POST https://your-backend.vercel.app/api/auth/login
```

## 🛠 **Troubleshooting**

### Common Issues:

1. **MongoDB Connection Error**
   - Check MONGO_URI in Vercel environment variables
   - Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0`

2. **CORS Issues**
   - Update frontend URL in CORS configuration
   - Add your frontend domain to allowed origins

3. **Environment Variables**
   - Double-check all variables are set in Vercel dashboard
   - Redeploy after changing environment variables

4. **File Upload Issues**
   - Vercel serverless functions have limitations
   - Consider using cloud storage (AWS S3, Cloudinary)

## 📊 **Monitoring**

- **Vercel Dashboard**: Monitor function execution
- **MongoDB Atlas**: Monitor database performance
- **Logs**: Check Vercel function logs for errors

## 🔄 **Continuous Deployment**

Once set up, every push to your main branch will automatically deploy to Vercel.

## 🎯 **Next Steps**

1. Set up custom domain (optional)
2. Configure monitoring and alerts
3. Set up database backups
4. Implement rate limiting
5. Add API documentation

## 📞 **Support**

If you encounter issues:
1. Check Vercel function logs
2. Verify environment variables
3. Test locally first
4. Check MongoDB Atlas connection

---

**Happy Deploying! 🌾**
