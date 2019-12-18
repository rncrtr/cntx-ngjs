'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var NoteSchema = new Schema({
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
  cntxId: {
    type: String,
    required: true
  },
  ts: {
    type: Date,
    required: true
  }
});

module.exports = _mongoose2.default.model('Note', NoteSchema);
//# sourceMappingURL=note.js.map