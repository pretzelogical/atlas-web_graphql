const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.listen(4000, () => {
  console.log('now listening for request on port 4000');
});
