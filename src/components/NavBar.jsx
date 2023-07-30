import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <header>
        <div className="container">
            <Link to='/WorkOuts_MERN/'>
                <h1>Workout Buddy</h1>
            </Link>
        </div>
    </header>
  )
}

export default NavBar