const mongoose = require('mongoose');
const { Schema } = mongoose;

const templateSchema = new Schema({
  fileName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  modifiedContent: {
    type: String,
    required: false,
  },

 }, {
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updatedTime'
  }
});

module.exports = mongoose.model('Document', templateSchema);
