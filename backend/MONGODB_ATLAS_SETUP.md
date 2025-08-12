# 🗄️ MongoDB Atlas Setup for Kisaan Bot

## 📋 Quick Setup Guide

### 1. **Create MongoDB Atlas Account**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free"
3. Create account or sign in

### 2. **Create Cluster**
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select cloud provider (AWS/Google Cloud/Azure)
4. Choose region (closest to your users)
5. Click "Create"

### 3. **Set Up Database Access**
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Create username and password
4. Select "Read and write to any database"
5. Click "Add User"

### 4. **Set Up Network Access**
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 5. **Get Connection String**
1. Go to "Database" in left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string

### 6. **Update Connection String**
Replace the connection string with your credentials:

```
mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/kisaan-bot
```

### 7. **Set in Vercel Environment Variables**
1. Go to your Vercel project dashboard
2. Go to "Settings" → "Environment Variables"
3. Add:
   - `MONGO_URI` = your connection string
   - `JWT_SECRET` = your secret key
   - `HF_TOKEN` = hf_demo

## 🔍 **Test Connection**

After deployment, test your database connection:

```bash
curl https://your-backend.vercel.app/
```

Should return: `{"message":"Kisaan Bot API is running! 🌾"}`

## 🛠 **Troubleshooting**

### Connection Issues:
- Check username/password in connection string
- Ensure IP whitelist includes 0.0.0.0/0
- Verify cluster is running

### Security Notes:
- Use strong passwords
- Consider IP restrictions for production
- Regularly rotate JWT secrets

---

**Your database is now ready for Vercel deployment! 🚀**
