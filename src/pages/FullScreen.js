import React from 'react';
import {Link} from 'react-router-dom';
import screenshot from '../screenshots/screenshot.png';




class FullScreen extends React.Component{
    constructor(props) {
        super(props);

      }


    render() {
        return(
            <div>
            {/*<Link to = "/Home" class="goBack">
                    <button  type="button" class="logout">
                        Go Back
                    </button>
        </Link>  */}
            <img src={screenshot} alt="image"/>
            </div>

        );
    }
}

export default FullScreen