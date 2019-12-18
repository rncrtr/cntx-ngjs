'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _variable = require('../model/variable');

var _variable2 = _interopRequireDefault(_variable);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // '/v1/variable' - GET all test accts
  api.get('/', function (req, res) {
    _variable2.default.find({}, function (err, variables) {
      if (err) {
        res.send(err);
      }
      res.json(variables);
    });
  });

  // '/v1/variable/:id' - GET a specific test acct
  api.get('/:id', function (req, res) {
    _variable2.default.findById(req.params.id, function (err, variable) {
      if (err) {
        res.send(err);
      }
      res.json(variable);
    });
  });

  // '/v1/variable/add' - POST - add a test acct
  api.post('/add', function (req, res) {
    var newVariable = new _variable2.default();
    newVariable.name = req.body.name;
    newVariable.content = req.body.content;
    newVariable.contentType = req.body.contentType;
    newVariable.isSecret = req.body.isSecret;

    newVariable.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'Variable saved successfully' });
      }
    });
  });

  // '/v1/variable/:id' - DELETE - remove a test acct
  api.delete('/:id', function (req, res) {
    _variable2.default.remove({
      _id: req.params.id
    }, function (err, variable) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Variable Successfully Removed" });
    });
  });

  // '/v1/variable/:id' - PUT - update an existing record
  api.put('/:id', function (req, res) {
    _variable2.default.findById(req.params.id, function (err, variable) {
      if (err) {
        res.send(err);
      }
      variable.name = req.body.name;
      variable.content = req.body.content;
      variable.contentType = req.body.contentType;
      variable.isSecret = req.body.isSecret;

      variable.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Variable info updated' });
      });
    });
  });

  return api;
};
//# sourceMappingURL=variable.js.map