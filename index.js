// implement your API here
const express = require('express');

const db = require('./data/db.js')
const server = express();

server.use(express.json());

// Handles GET requests to / on localhost:8000
server.get('/', (req, res) => {
    res.send('Hello API1 Project');
});

// Handles POST requests
server.post('/api/users', (req, res) => {
    const user = req.body;
    console.log('user information', user);

    if(!user.name || !user.bio ){
        return res.status(400).json({ errorMessage: "Please provide name and bio for the user."  })
    } else {
        db.insert(user)
     
    .then(user => {
          res.status(201).json(user)
      })
      .catch(err => {
          console.log('error', err);
          res.status(500).json({ error: 'There was an error while saving the user to the db' })
      })
    }
})

// GET to /users that returns a list of users
server.get('/api/users', (req, res) => {
    db.find()
      .then(users => {
          res.status(200).json(users)
      })
      .catch(err => {
          console.log('error', err);
          res.status(500).json({ error: 'The users info could not be retrieved' })
      })
})

// GET to return the user's id
server.get('/api/users/:id', (req, res) => {
    console.log("Line 50",req)
    const id = req.params.id
    db.findById(id)
      .then(userId => {
          res.status(200).json(userId)
      })
      .catch(err => {
          console.log('error', err);
          res.status(500).json({ error: 'The user info could not be retrieved' })
      })
})

// DELETE 
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    console.log("This is delete:id", id)

    db.remove(id)
      .then(user => {
          if(user) {
              res.status(201).json("User has been removed")
          } else {
              res.status(404).json({ message: "The user with the specified ID does not exist." })
          }
      })
      .catch(err => {
          console.log('error', err)
          res.status(500).json({ error: 'The user could not be removed' })
      })
})

// PUT
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    console.log('user id', id)

db.update(id, body)
  .then(userInfo => {
      res.status(200).json("User info has been updated")
  })
  .catch(err => {
      console.log('error', err)
      res.status(400).json({ error: "Please provide name and bio for the user." })
  })
})

const port = 8000;
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));

