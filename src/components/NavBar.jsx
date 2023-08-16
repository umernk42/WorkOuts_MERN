import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <header>
        <div className="container">
            <Link to='/WorkOuts_MERN/'>
                <h1>Workout Buddy</h1>
            </Link>
            <nav>
              <div>
                <Link to='/WorkOuts_MERN/login'>Login</Link>
                <Link to='/WorkOuts_MERN/signup'>Sign Up</Link>
              </div>
            </nav>
        </div>
    </header>
  )
}

export default NavBar