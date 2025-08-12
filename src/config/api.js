// API Configuration for Kisaan Bot
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://kisaan-bot-webapp.vercel.app/api'
  : 'http://localhost:5001/api';

export default API_BASE_URL;
