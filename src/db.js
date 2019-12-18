import mongoose from 'mongoose';

export default callback => {
  let db = mongoose.connect('mongodb://localhost:27017/cntx-api',{useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.set('useCreateIndex', true);
  callback(db);
}
