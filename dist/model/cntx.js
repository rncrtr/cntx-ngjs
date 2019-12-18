'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CntxSchema = new Schema({
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

module.exports = _mongoose2.default.model('Cntx', CntxSchema);
//# sourceMappingURL=cntx.js.map