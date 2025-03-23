const express = require('express')
const app = express()
const port = 3000
const {connectToDB} = require('./db/database');
const { signUp } = require('./routes/authentication/signup');
const { logIn } = require('./routes/authentication/login');
const { authenticateUser } = require('./middleware/authorization');
const cookieParser = require('cookie-parser');
const { getProfile } = require('./routes/authentication/getProfile');
const { logOut } = require('./routes/authentication/logOut');
const captainRouter = require('./routes/captainRoutes/captainRoutes');
var cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(cookieParser())

connectToDB.then(()=>{
    console.log("connected to MONGODB succesfully")
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/signup',signUp)
app.post('/login',logIn)
app.get('/profile',authenticateUser,getProfile)
app.get('/redirect', (req,res)=>{
  res.redirect('/')
})
app.get('/logout',logOut)

app.use('/captain',captainRouter)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})