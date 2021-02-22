import React from 'react';
import {Link} from 'react-router-dom';

import "./index.css"
const MainPage = () => {

    return(
        <div>
        <h1>Stock Login Page</h1>
            
            <Link to = "/Home">
            <button className="stockButton" type="button">
                Go to Home
            </button>
            </Link>
        </div>

    );
};

export default MainPage;