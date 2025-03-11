const express = require('express')
const app = express()
const port = 3000
const {connectToDB} = require('./db/database');
const { signUp } = require('./routes/authentication/signup');

app.use(express.json());

connectToDB.then(()=>{
    console.log("connected to MONGODB succesfully")
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/signup',signUp)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})