import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let NoteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  isSecret: {
    type: Boolean,
    default: true
  },
  cntxId:{
    type: String,
    required: true
  },
  ts:{
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Note', NoteSchema);