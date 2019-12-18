'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _cntx = require('../model/cntx');

var _cntx2 = _interopRequireDefault(_cntx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // '/v1/cntx' - GET all test accts
  api.get('/', function (req, res) {
    _cntx2.default.find({}, function (err, cntxs) {
      if (err) {
        res.send(err);
      }
      res.json(cntxs);
    });
  });

  // '/v1/cntx/:id' - GET a specific test acct
  api.get('/:id', function (req, res) {
    _cntx2.default.findById(req.params.id, function (err, cntx) {
      if (err) {
        res.send(err);
      }
      res.json(cntx);
    });
  });

  // '/v1/cntx/add' - POST - add a test acct
  api.post('/add', function (req, res) {
    var newCntx = new _cntx2.default();
    newCntx.name = req.body.name;
    newCntx.isSecret = req.body.isSecret;

    newCntx.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'Cntx saved successfully' });
      }
    });
  });

  // '/v1/cntx/:id' - DELETE - remove a test acct
  api.delete('/:id', function (req, res) {
    _cntx2.default.remove({
      _id: req.params.id
    }, function (err, cntx) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Cntx Successfully Removed" });
    });
  });

  // '/v1/cntx/:id' - PUT - update an existing record
  api.put('/:id', function (req, res) {
    _cntx2.default.findById(req.params.id, function (err, cntx) {
      if (err) {
        res.send(err);
      }
      cntx.name = req.body.name;
      cntx.isSecret = req.body.isSecret;

      cntx.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Cntx info updated' });
      });
    });
  });

  return api;
};
//# sourceMappingURL=cntx.js.map