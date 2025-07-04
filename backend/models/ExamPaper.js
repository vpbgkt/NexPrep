//This represents a specific full paper (e.g. “GATE CS 2021”, “NEET 2023”) tied to one stream.

const mongoose = require('mongoose');
const { Schema } = mongoose;

const examPaperSchema = new Schema({
  family: {
    type: Schema.Types.ObjectId,
    ref: 'ExamFamily',
    required: true,
    index: true
  },
  stream: {
    type: Schema.Types.ObjectId,
    ref: 'ExamStream',
    required: true,
    index: true
  },code: {
    type: String,
    required: false,  // Make optional since we'll auto-generate
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },  year: {
    type: Number,
    default: null
  },
  durationMinutes: {
    type: Number,
    default: null,
    min: 0
  },
  passingCriteria: {
    type: String,
    trim: true,
    default: null
  },
  examDate: {
    type: Date,
    default: null
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

// Prevent duplicate code per stream
examPaperSchema.index({ stream: 1, code: 1 }, { unique: true });

module.exports =
  mongoose.models.ExamPaper ||
  mongoose.model('ExamPaper', examPaperSchema);