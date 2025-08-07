const Joi = require('joi');

// Task validation schema
const taskSchema = Joi.object({
  title: Joi.string().required().min(1).max(200).messages({
    'string.empty': 'Task title is required',
    'string.min': 'Task title must be at least 1 character long',
    'string.max': 'Task title cannot exceed 200 characters'
  }),
  description: Joi.string().max(1000).optional().messages({
    'string.max': 'Task description cannot exceed 1000 characters'
  }),
  category: Joi.string().valid(
    'farming', 'irrigation', 'fertilization', 'pest_control', 
    'harvesting', 'maintenance', 'personal', 'business'
  ).default('farming').messages({
    'any.only': 'Invalid task category'
  }),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent').default('medium').messages({
    'any.only': 'Invalid priority level'
  }),
  status: Joi.string().valid('pending', 'in_progress', 'completed', 'cancelled').default('pending').messages({
    'any.only': 'Invalid task status'
  }),
  dueDate: Joi.date().min('now').optional().messages({
    'date.min': 'Due date cannot be in the past'
  }),
  estimatedDuration: Joi.number().min(0.1).max(24).default(1).messages({
    'number.min': 'Estimated duration must be at least 0.1 hours',
    'number.max': 'Estimated duration cannot exceed 24 hours'
  }),
  actualDuration: Joi.number().min(0).max(24).optional().messages({
    'number.min': 'Actual duration cannot be negative',
    'number.max': 'Actual duration cannot exceed 24 hours'
  }),
  location: Joi.string().max(200).optional().messages({
    'string.max': 'Location cannot exceed 200 characters'
  }),
  assignedTo: Joi.string().hex().length(24).optional().messages({
    'string.hex': 'Invalid user ID format',
    'string.length': 'Invalid user ID length'
  }),
  tags: Joi.array().items(Joi.string().max(50)).max(10).optional().messages({
    'array.max': 'Cannot have more than 10 tags',
    'string.max': 'Tag cannot exceed 50 characters'
  }),
  weatherDependent: Joi.boolean().default(false),
  weatherConditions: Joi.object({
    temperature: Joi.object({
      min: Joi.number().min(-50).max(60),
      max: Joi.number().min(-50).max(60)
    }).optional(),
    humidity: Joi.object({
      min: Joi.number().min(0).max(100),
      max: Joi.number().min(0).max(100)
    }).optional(),
    rainfall: Joi.object({
      min: Joi.number().min(0),
      max: Joi.number().min(0)
    }).optional()
  }).optional(),
  progress: Joi.number().min(0).max(100).default(0).messages({
    'number.min': 'Progress cannot be negative',
    'number.max': 'Progress cannot exceed 100%'
  })
});

// Goal validation schema
const goalSchema = Joi.object({
  title: Joi.string().required().min(1).max(200).messages({
    'string.empty': 'Goal title is required',
    'string.min': 'Goal title must be at least 1 character long',
    'string.max': 'Goal title cannot exceed 200 characters'
  }),
  description: Joi.string().max(1000).optional().messages({
    'string.max': 'Goal description cannot exceed 1000 characters'
  }),
  category: Joi.string().valid(
    'production', 'financial', 'sustainability', 'personal', 'business'
  ).default('production').messages({
    'any.only': 'Invalid goal category'
  }),
  targetValue: Joi.number().positive().optional().messages({
    'number.positive': 'Target value must be positive'
  }),
  currentValue: Joi.number().min(0).default(0).messages({
    'number.min': 'Current value cannot be negative'
  }),
  unit: Joi.string().max(50).optional().messages({
    'string.max': 'Unit cannot exceed 50 characters'
  }),
  deadline: Joi.date().min('now').optional().messages({
    'date.min': 'Deadline cannot be in the past'
  }),
  status: Joi.string().valid('active', 'completed', 'cancelled').default('active').messages({
    'any.only': 'Invalid goal status'
  }),
  milestones: Joi.array().items(
    Joi.object({
      title: Joi.string().required().max(200),
      targetValue: Joi.number().positive().required(),
      currentValue: Joi.number().min(0).default(0),
      completed: Joi.boolean().default(false),
      dueDate: Joi.date().min('now').optional()
    })
  ).max(20).optional().messages({
    'array.max': 'Cannot have more than 20 milestones'
  }),
  progress: Joi.number().min(0).max(100).default(0).messages({
    'number.min': 'Progress cannot be negative',
    'number.max': 'Progress cannot exceed 100%'
  })
});

// Schedule validation schema
const scheduleSchema = Joi.object({
  title: Joi.string().required().min(1).max(200).messages({
    'string.empty': 'Schedule title is required',
    'string.min': 'Schedule title must be at least 1 character long',
    'string.max': 'Schedule title cannot exceed 200 characters'
  }),
  description: Joi.string().max(1000).optional().messages({
    'string.max': 'Schedule description cannot exceed 1000 characters'
  }),
  startTime: Joi.date().required().messages({
    'any.required': 'Start time is required'
  }),
  endTime: Joi.date().greater(Joi.ref('startTime')).required().messages({
    'any.required': 'End time is required',
    'date.greater': 'End time must be after start time'
  }),
  allDay: Joi.boolean().default(false),
  recurring: Joi.string().valid('none', 'daily', 'weekly', 'monthly', 'yearly').default('none').messages({
    'any.only': 'Invalid recurring pattern'
  }),
  recurringEndDate: Joi.date().min(Joi.ref('startTime')).optional().messages({
    'date.min': 'Recurring end date must be after start time'
  }),
  location: Joi.string().max(200).optional().messages({
    'string.max': 'Location cannot exceed 200 characters'
  }),
  attendees: Joi.array().items(
    Joi.object({
      userId: Joi.string().hex().length(24).required(),
      status: Joi.string().valid('pending', 'accepted', 'declined').default('pending')
    })
  ).max(50).optional().messages({
    'array.max': 'Cannot have more than 50 attendees'
  }),
  category: Joi.string().valid(
    'meeting', 'field_work', 'maintenance', 'harvesting', 'irrigation', 'personal'
  ).default('meeting').messages({
    'any.only': 'Invalid schedule category'
  }),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent').default('medium').messages({
    'any.only': 'Invalid priority level'
  }),
  notes: Joi.string().max(1000).optional().messages({
    'string.max': 'Notes cannot exceed 1000 characters'
  }),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i).default('#3B82F6').messages({
    'string.pattern.base': 'Color must be a valid hex color code'
  })
});

// Settings validation schema
const settingsSchema = Joi.object({
  defaultReminderTime: Joi.number().min(0).max(1440).default(15).messages({
    'number.min': 'Reminder time cannot be negative',
    'number.max': 'Reminder time cannot exceed 1440 minutes (24 hours)'
  }),
  workingHours: Joi.object({
    start: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).default('08:00').messages({
      'string.pattern.base': 'Start time must be in HH:MM format'
    }),
    end: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).default('18:00').messages({
      'string.pattern.base': 'End time must be in HH:MM format'
    })
  }).optional(),
  timezone: Joi.string().max(50).default('UTC').messages({
    'string.max': 'Timezone cannot exceed 50 characters'
  }),
  weatherIntegration: Joi.boolean().default(true),
  autoScheduling: Joi.boolean().default(false)
});

// Validation middleware functions
const validateTask = (req, res, next) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validateGoal = (req, res, next) => {
  const { error } = goalSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validateSchedule = (req, res, next) => {
  const { error } = scheduleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validateSettings = (req, res, next) => {
  const { error } = settingsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

// Partial validation for updates
const validateTaskUpdate = (req, res, next) => {
  const { error } = taskSchema.validate(req.body, { allowUnknown: true });
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validateGoalUpdate = (req, res, next) => {
  const { error } = goalSchema.validate(req.body, { allowUnknown: true });
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validateScheduleUpdate = (req, res, next) => {
  const { error } = scheduleSchema.validate(req.body, { allowUnknown: true });
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: error.details.map(detail => detail.message)
    });
  }
  next();
};

module.exports = {
  validateTask,
  validateGoal,
  validateSchedule,
  validateSettings,
  validateTaskUpdate,
  validateGoalUpdate,
  validateScheduleUpdate
}; 