'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var VariableSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  contentType: {
    type: String
  },
  isSecret: {
    type: Boolean,
    default: false
  }
});

module.exports = _mongoose2.default.model('Variable', VariableSchema);
//# sourceMappingURL=variable.js.map