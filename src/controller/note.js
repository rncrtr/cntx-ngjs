import { Router } from 'express';
import Note from '../model/note';

export default({ config, db }) => {
  let api = Router();

  // '/v1/notes' - GET all notes
  api.get('/', (req, res) => {
    Note.find({}, (err, notes) => {
      if (err) {
        res.send(err);
      }
      res.json(notes);
    });
  });

  // '/v1/notes/:id' - GET a specific note
  api.get('/:id', (req, res) => {
    Note.findById(req.params.id, (err, note) => {
      if (err) {
        res.send(err);
      }
      res.json(note);
    });
  });

  // '/v1/notes/cntx/:id' - GET a specific note
  api.get('/cntx/:id', (req, res) => {
    Note.find({cntxId: req.params.id}, (err, note) => {
      if (err) {
        res.send(err);
      }
      res.json(note);
    });
  });


  // '/v1/notes/add' - POST - add a note
  api.post('/add', (req, res) => {
    console.log(req.body.data);
    let newNote = new Note();
    newNote.name = req.body.name;
    newNote.content = req.body.content;
    newNote.cntxId = req.body.cntxId;
    newNote.ts = req.body.ts;

    newNote.save(function(err) {
      if (err) {
        res.send(err);
      }else{
        res.json({ message: 'Note saved successfully' });
      }
    });
  });

  // '/v1/notes/:id' - DELETE - remove a note
  api.delete('/:id', (req, res) => {
    Note.remove({
      _id: req.params.id
    }, (err, note) => {
      if (err) {
        res.send(err);
      }
        res.json({message: "Note Successfully Removed"});
      });
  });

  // '/v1/notes/:id' - PUT - update an existing note
  api.put('/:id', (req, res) => {
    Note.findById(req.params.id, (err, note) => {
      if (err) {
        res.send(err);
      }
      note.name = req.body.name;
      note.content = req.body.content;
      note.isSecret = req.body.isSecret;
      note.ts = req.body.ts;
      note.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Note info updated' });
      });
    });
  });

  return api;
}
