'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _middleware = require('../middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _note = require('../controller/note');

var _note2 = _interopRequireDefault(_note);

var _cntx = require('../controller/cntx');

var _cntx2 = _interopRequireDefault(_cntx);

var _account = require('../controller/account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express2.default)();

// connect to db
(0, _db2.default)(function (db) {

  router.use((0, _cors2.default)());

  // middleware
  router.use((0, _middleware2.default)({ config: _config2.default, db: db }));

  // api routes v1
  router.use('/account', (0, _account2.default)({ config: _config2.default, db: db }));
  router.use('/notes', (0, _note2.default)({ config: _config2.default, db: db }));
  router.use('/cntxs', (0, _cntx2.default)({ config: _config2.default, db: db }));
});

exports.default = router;
//# sourceMappingURL=index.js.map