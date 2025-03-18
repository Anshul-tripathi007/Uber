import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div>
            <h2>UBER</h2>
            <Link to='/user/login'>Continue</Link>
        </div>
    </div>
  )
}

export default Home
