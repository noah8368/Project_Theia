import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import beach from '../components/beach.jpg';



class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {link: '', location: 'Los Angeles, USA', isFavorite: false, showImage: false, compare: false};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onChangeFav =  this.onChangeFav.bind(this);
      this.onChangeComp = this.onChangeComp.bind(this);
    }
  
    handleChange(event) { //updates state whenever user gives new input/value to something
        const target = event.target;
        const name = target.name;
        const value = name == 'link' ? target.link : 
        name == "isFavorite" ? target.isFavorite : 
        name == 'showImage' ? target.isFavorite :
        name == 'compare' ? target.compare : target.location;
       
        this.setState({
            [name]: value
        });    

        
    }

    onChangeFav(event) { // toggles isFavorite state when checked/unchecked
        this.setState({
            link: this.state.link,
            location: this.state.location,
            isFavorite: event.target.checked,
            showImage: this.state.showImage,
            compare: this.state.compare,
        });
    }

    onChangeComp(event) { // toggles compare state when checked/unchecked
        this.setState({
            link: this.state.link,
            location: this.state.location,
            isFavorite: this.state.isFavorite,
            showImage: this.state.showImage,
            compare: event.target.checked,
        });
    }

    handleSubmit(event){ // shows image once form is submitted
        
        this.setState({
            link: this.state.link,
            location: this.state.location,
            isFavorite: this.state.isFavorite,
            showImage: true,
            compare: this.state.compare,
        });
        console.log(this.state);
        event.preventDefault();
    }
  
    render() {
        /*
        all class: containes everyhting

        topBar class: the top display bar, has signout button and will display
                       user's name (temporarily word 'USERNAME')

        space class: **TO BE RENAMED** includes everything except top bar

        navBar class: side display bar, includes scrollable list of favorites
                      (currently hard coded), fullscreen button, and download
                      button (both of which do nothing at the moment)

        mainPage class: everything besides side and top bar

        form: includes location dropdown, link input box, favorite and comparison
              checkboxes

        options class: location dropdown, link input box

        sub class: submit button

        switch class: **TO BE RENAMED** checkbox toggle for comparison mode

        screenshot class: displays image, 1 if comparison is off, 2 images if on
                          currently hardcoded image from beach.jpg, to be changed
        */
      return (
        <div class="all"> 
            <div class="topBar">
                
                <p id="name">
                    USERNAME
                </p>
                <Link to = "/" class="signout">
                    <button  type="button" class="logout">
                        Sign out
                    </button>
                </Link>
                
                
            </div>
        <div class="space">
              <div class="navBar">
                <div class="favs">
                    My Favorites
                        <ul >
                            <li>Favorite 1</li>
                            <li>Favorite 2</li>
                            <li>Favorite 3</li>
                            <li>Favorite 4</li>
                            <li>Favorite 5</li>
                            <li>Favorite 6</li>
                            <li>Favorite 7</li>
                            <li>Favorite 8</li>
                            <li>Favorite 9</li>
                            <li>Favorite 10</li>
                            <li>Favorite 11</li>
                      <     li>Favorite 12</li>
                    </ul>
                  </div>
                    <button className="download">
                        Download
                    </button>
                    <button className="fullscreen">
                        Fullscreen
                    </button>
              </div>
              
            <div class="mainPage"> 
                <h1> 
                    Enter a link and location to view
                </h1>
                <form onSubmit={this.handleSubmit}>
                        <div class="options">
                            <input
                            name="link" 
                            type="text"  
                            onChange={this.handleChange} 
                            placeholder="Search the world..." />
                            <br/>
                            <select
                            name="location" 
                            location={this.state.location} 
                            onChange={this.handleChange} 
                            >
                                <option location="Los Angeles, USA">Los Angeles, USA</option>
                                <option location="Perth, AU">Perth, AU</option>
                            </select>
                        </div>
                    <div class="sub">
                        <input type="submit" value="submit"/>
                    </div>
                    <label class="favorite">
                        Add to Favorites? 
                        <input
                            name="isFavorite"
                            type="checkbox"
                            checked={!!(this.state.isFavorite)}
                            onChange={this.onChangeFav} />
                    </label>
                    <label class="switch">
                        <input 
                            name="compare"
                            type="checkbox"
                            checked={this.state.compare}
                            onChange={this.onChangeComp}
                        />
                        <span class="slider round"></span>
                    </label>
                </form>   
                <div class="screenshot"> 
                    { ((this.state.showImage) && (this.state.compare)) ?
                     <div class="sideBySide">
                        <img src={beach} alt={"image"} id="orig"/>
                        <img src={beach} alt={"image"} id="new"/>
                    </div> 
                    : (this.state.showImage) ?
                    <img id="single" src={beach} alt={"image"} /> : null } 
                </div> 
            </div>
            </div>
        </div>
      );
    }
  }

export default Home;