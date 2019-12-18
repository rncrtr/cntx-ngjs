import express from 'express';
import config from '../config';
import middleware from '../middleware';
import initializeDb from '../db';
import cors from 'cors';

import note from '../controller/note';
import cntx from '../controller/cntx';
import account from '../controller/account';

let router = express();

// connect to db
initializeDb(db => {

  router.use(cors())
   
   // middleware
   router.use(middleware({config,db}));
   
   // api routes v1
   router.use('/account', account({config,db}));
   router.use('/notes', note({config,db}));
   router.use('/cntxs', cntx({config,db}));
});

export default router;