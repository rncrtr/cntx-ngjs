import { Router } from 'express';
import Cntx from '../model/cntx';

export default({ config, db }) => {
  let api = Router();

  // '/v1/cntx' - GET all test accts
  api.get('/', (req, res) => {
    Cntx.find({}, (err, cntxs) => {
      if (err) {
        res.send(err);
      }
      res.json(cntxs);
    });
  });

  // '/v1/cntx/:id' - GET a specific test acct
  api.get('/:id', (req, res) => {
    Cntx.findById(req.params.id, (err, cntx) => {
      if (err) {
        res.send(err);
      }
      res.json(cntx);
    });
  });

  // '/v1/cntx/add' - POST - add a test acct
  api.post('/add', (req, res) => {
    let newCntx = new Cntx();
    newCntx.name = req.body.name;
    newCntx.isSecret = req.body.isSecret;

    newCntx.save(function(err) {
      if (err) {
        res.send(err);
      }else{
        res.json({ message: 'Cntx saved successfully' });
      }
    });
  });

  // '/v1/cntx/:id' - DELETE - remove a test acct
  api.delete('/:id', (req, res) => {
    Cntx.remove({
      _id: req.params.id
    }, (err, cntx) => {
      if (err) {
        res.send(err);
      }
        res.json({message: "Cntx Successfully Removed"});
      });
  });

  // '/v1/cntx/:id' - PUT - update an existing record
  api.put('/:id', (req, res) => {
    Cntx.findById(req.params.id, (err, cntx) => {
      if (err) {
        res.send(err);
      }
      cntx.name = req.body.name;
      cntx.isSecret = req.body.isSecret;

      cntx.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Cntx info updated' });
      });
    });
  });

  return api;
}
