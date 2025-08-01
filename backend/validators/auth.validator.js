const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Name is required / نام ضروری ہے",
    "string.min": "Name must be at least 2 characters / نام کم از کم 2 حروف کا ہونا چاہیے",
    "string.max": "Name must be less than 50 characters / نام 50 حروف سے کم ہونا چاہیے",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Enter a valid email / درست ای میل درج کریں",
    "string.empty": "Email is required / ای میل ضروری ہے",
  }),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({
    "string.pattern.base": "Phone must be 10–15 digits / فون نمبر 10 سے 15 ہندسوں پر مشتمل ہونا چاہیے",
    "string.empty": "Phone is required / فون نمبر ضروری ہے",
  }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.min": "Password must be at least 6 characters / پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے",
    "string.max": "Password must be less than 100 characters / پاس ورڈ 100 حروف سے کم ہونا چاہیے",
    "string.empty": "Password is required / پاس ورڈ ضروری ہے",
  }),
  isTractorOwner: Joi.boolean().optional(),
  isShopOwner: Joi.boolean().optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Enter a valid email / درست ای میل درج کریں",
    "string.empty": "Email is required / ای میل ضروری ہے",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters / پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے",
    "string.empty": "Password is required / پاس ورڈ ضروری ہے",
  }),
  isTractorOwner: Joi.boolean().optional(),
  isShopOwner: Joi.boolean().optional(),
});

module.exports = { signupSchema, loginSchema };
