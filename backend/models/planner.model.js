const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['farming', 'irrigation', 'fertilization', 'pest_control', 'harvesting', 'maintenance', 'personal', 'business'],
    default: 'farming'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  dueDate: {
    type: Date
  },
  estimatedDuration: {
    type: Number, // in hours
    default: 1
  },
  actualDuration: {
    type: Number // in hours
  },
  location: {
    type: String,
    trim: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [{
    type: String,
    trim: true
  }],
  attachments: [{
    filename: String,
    path: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  notes: [{
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  reminders: [{
    time: Date,
    type: {
      type: String,
      enum: ['email', 'push', 'sms'],
      default: 'push'
    },
    sent: {
      type: Boolean,
      default: false
    }
  }],
  dependencies: [{
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    },
    type: {
      type: String,
      enum: ['blocks', 'required_by'],
      default: 'blocks'
    }
  }],
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  weatherDependent: {
    type: Boolean,
    default: false
  },
  weatherConditions: {
    temperature: {
      min: Number,
      max: Number
    },
    humidity: {
      min: Number,
      max: Number
    },
    rainfall: {
      min: Number,
      max: Number
    }
  }
}, {
  timestamps: true
});

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    enum: ['production', 'financial', 'sustainability', 'personal', 'business'],
    default: 'production'
  },
  targetValue: {
    type: Number
  },
  currentValue: {
    type: Number,
    default: 0
  },
  unit: {
    type: String,
    trim: true
  },
  deadline: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  milestones: [{
    title: String,
    targetValue: Number,
    currentValue: {
      type: Number,
      default: 0
    },
    completed: {
      type: Boolean,
      default: false
    },
    dueDate: Date
  }],
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
}, {
  timestamps: true
});

const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  allDay: {
    type: Boolean,
    default: false
  },
  recurring: {
    type: String,
    enum: ['none', 'daily', 'weekly', 'monthly', 'yearly'],
    default: 'none'
  },
  recurringEndDate: {
    type: Date
  },
  location: {
    type: String,
    trim: true
  },
  attendees: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'pending'
    }
  }],
  category: {
    type: String,
    enum: ['meeting', 'field_work', 'maintenance', 'harvesting', 'irrigation', 'personal'],
    default: 'meeting'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  reminders: [{
    time: Date,
    type: {
      type: String,
      enum: ['email', 'push', 'sms'],
      default: 'push'
    },
    sent: {
      type: Boolean,
      default: false
    }
  }],
  notes: String,
  color: {
    type: String,
    default: '#3B82F6'
  }
}, {
  timestamps: true
});

const plannerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tasks: [taskSchema],
  goals: [goalSchema],
  schedules: [scheduleSchema],
  settings: {
    defaultReminderTime: {
      type: Number, // minutes before event
      default: 15
    },
    workingHours: {
      start: {
        type: String,
        default: '08:00'
      },
      end: {
        type: String,
        default: '18:00'
      }
    },
    timezone: {
      type: String,
      default: 'UTC'
    },
    weatherIntegration: {
      type: Boolean,
      default: true
    },
    autoScheduling: {
      type: Boolean,
      default: false
    }
  },
  analytics: {
    tasksCompleted: {
      type: Number,
      default: 0
    },
    goalsAchieved: {
      type: Number,
      default: 0
    },
    productivityScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    averageTaskDuration: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
plannerSchema.index({ userId: 1 });
plannerSchema.index({ 'tasks.dueDate': 1 });
plannerSchema.index({ 'schedules.startTime': 1 });
plannerSchema.index({ 'goals.deadline': 1 });

// Virtual for getting overdue tasks
plannerSchema.virtual('overdueTasks').get(function() {
  return this.tasks.filter(task => 
    task.status !== 'completed' && 
    task.dueDate && 
    task.dueDate < new Date()
  );
});

// Virtual for getting today's tasks
plannerSchema.virtual('todayTasks').get(function() {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  
  return this.tasks.filter(task => 
    task.dueDate && 
    task.dueDate >= startOfDay && 
    task.dueDate < endOfDay
  );
});

// Virtual for getting upcoming schedules
plannerSchema.virtual('upcomingSchedules').get(function() {
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  return this.schedules.filter(schedule => 
    schedule.startTime >= now && 
    schedule.startTime <= nextWeek
  );
});

module.exports = mongoose.model('Planner', plannerSchema); 