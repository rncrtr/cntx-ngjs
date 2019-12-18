import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let CntxSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isSecret: {
    type: Boolean,
    default: true
  },
  ord: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Cntx', CntxSchema);