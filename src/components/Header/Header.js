import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';


const Header = () => {
	return (
		<div className="header">
			<Link to="/" style={{textDecoration:'none'}}>
                <p className="title">Co-Vax</p>
            </Link>
		</div>
	);
};

export default Header;