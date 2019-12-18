'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _note = require('../model/note');

var _note2 = _interopRequireDefault(_note);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // '/v1/notes' - GET all notes
  api.get('/', function (req, res) {
    _note2.default.find({}, function (err, notes) {
      if (err) {
        res.send(err);
      }
      res.json(notes);
    });
  });

  // '/v1/notes/:id' - GET a specific note
  api.get('/:id', function (req, res) {
    _note2.default.findById(req.params.id, function (err, note) {
      if (err) {
        res.send(err);
      }
      res.json(note);
    });
  });

  // '/v1/notes/cntx/:id' - GET a specific note
  api.get('/cntx/:id', function (req, res) {
    _note2.default.find({ cntxId: req.params.id }, function (err, note) {
      if (err) {
        res.send(err);
      }
      res.json(note);
    });
  });

  // '/v1/notes/add' - POST - add a note
  api.post('/add', function (req, res) {
    console.log(req.body.data);
    var newNote = new _note2.default();
    newNote.name = req.body.name;
    newNote.content = req.body.content;
    newNote.cntxId = req.body.cntxId;
    newNote.ts = req.body.ts;

    newNote.save(function (err) {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'Note saved successfully' });
      }
    });
  });

  // '/v1/notes/:id' - DELETE - remove a note
  api.delete('/:id', function (req, res) {
    _note2.default.remove({
      _id: req.params.id
    }, function (err, note) {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Note Successfully Removed" });
    });
  });

  // '/v1/notes/:id' - PUT - update an existing note
  api.put('/:id', function (req, res) {
    _note2.default.findById(req.params.id, function (err, note) {
      if (err) {
        res.send(err);
      }
      note.name = req.body.name;
      note.content = req.body.content;
      note.isSecret = req.body.isSecret;
      note.ts = req.body.ts;
      note.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Note info updated' });
      });
    });
  });

  return api;
};
//# sourceMappingURL=note.js.map