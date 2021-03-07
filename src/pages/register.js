import React from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";


import "./index.css"
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          usrname: '', 
          password:'',
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onChangeUsr=this.onChangeUsr.bind(this);
      this.onChangePasswrd=this.onChangePasswrd.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        const Details={username: this.state.usrname, password: this.state.password};
        axios.post("http://localhost:8000/login",Details)
            .then(response=>console.log(response));
            
    
        return;
    }

    onChangeUsr(event){
        this.setState({usrname: event.target.value});
        return;
    }

    onChangePasswrd(event){
        this.setState({password: event.target.value});
        return;
    }
    render(){
        return(
            <div class="login">
                <h1>Project Theia Registration</h1>
                <form class="loginForm" onSubmit ={this.handleSubmit}>
                    <input class="loginInput"
                        name="usrname" 
                        value={this.state.usrname}
                        type="text"
                        onChange={this.onChangeUsr}
                        placeholder="Username" />
                    <input class="loginInput"
                        name="password" 
                        value={this.state.password}
                        type="password"
                        onChange={this.onChangePasswrd}
                        placeholder="Password" />
                    <Link className="loginButton" to ={{
                        pathname: "/Home",
                        state:[{username: this.state.usrname}]}}>
                        <button className="stockButton" type="submit">
                            Go to Home
                        </button> 
                    </Link>
                    <Link className="loginButton" to ="/">
                    <button className="stockButton">
                        Login
                    </button>    
                    </Link>
                </form>
            </div>
        );
    }
};

export default RegisterPage;






