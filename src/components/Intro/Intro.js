import React from 'react'
import {Link} from 'react-router-dom'
import './Intro.css'

function Intro() {
    return (
        <div className="intro">
            <div className="intro_home">
                <Link to ="/vaccines" style ={{textDecoration:'none', color:'black'}}>
                    <h3 className='intro_text'>Vaccine Availability</h3>
                </Link>
            </div>
        </div>
    )
}

export default Intro
