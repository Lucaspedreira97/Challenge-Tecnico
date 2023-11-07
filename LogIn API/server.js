const express = require('express');
const app = express();
const port = 3001;
const routes = require('./routes/inde.routes');
const cors = require('cors')

app.use(cors());
app.use(express.json())

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);


  const corsOptions = {
    origin: 'http://localhost/3000', 
    methods: 'GET,PUT,POST,DELETE', 
  };
  
  app.use(cors(corsOptions));
  
});

app.use('/', routes);