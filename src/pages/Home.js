import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import beach from '../components/beach.jpg';


class LinkPair extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            link: this.props.link,
            location: this.props.location,
        };
    }

    render(){
        /*will pass link and location and return screenshot from backend
        if comparing location of first = current location
        temorarily hard coded
        */
        return (
<<<<<<< HEAD
        <div class="images">
            { ((this.props.compare) ?
                     <div class="sideBySide">
                        <img src="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg" alt={"image"} id="orig"/> 
                        <img src="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg" alt={"image"} id="new"/>
                    </div> 
                : 
                   <div class="single">
                    <img id="single" src="https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg" alt={"image"} /> 
                  </div>
=======
        <div>
            { ((this.props.compare) ?
                     <div class="sideBySide">
                        <img src={beach} alt={"image"} id="orig"/> 
                        <img src={beach} alt={"image"} id="new"/>
                    </div> 
                : 
                    <img id="single" src={beach} alt={"image"} /> 
>>>>>>> ceba585f06b4e92827dcd748f5e2f23338f41f8b
            ) } 
        </div>
        )
    }
}

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        link: '', 
        location: 'Los Angeles, USA', 
        isFavorite: false, 
        showImage: false, 
        compare: false,
        usrname: "julia", //usrname and favorites temporarily hard coded
        favorites: ["piazza.com", "googe.com", "apple.com", "ccle.edu", "ucla.edu",
        "amazon.com", "facebook.com", "instagram.com", "github.com", "julia"]
    }
      this.handleChange = this.handleChange.bind(this); //**TODO: clean up handle/on change functions
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onChangeFav =  this.onChangeFav.bind(this);
      this.onChangeComp = this.onChangeComp.bind(this);
      this.removeFavorite = this.removeFavorite.bind(this); 
      this.onChangeLink = this.onChangeLink.bind(this);
      this.selectFav = this.selectFav.bind(this); 
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

    selectFav(value) { //when favorite is selected, set that val as the link
        this.setState({
            link: value
        });
    }

    onChangeFav(event) { // toggles isFavorite state when checked/unchecked
        this.setState({
            link: this.state.link,
            location: this.state.location,
            isFavorite: event.target.checked,
            showImage: this.state.showImage,
            compare: this.state.compare,
            usrname: this.state.usrname,
            favorites: this.state.favorites,
        });
<<<<<<< HEAD
    }

    onChangeComp(event) { // toggles compare state when checked/unchecked
        this.setState({
            link: this.state.link,
            location: this.state.location,
            isFavorite: this.state.isFavorite,
            showImage: this.state.showImage,
            compare: event.target.checked,
            usr: this.state.usr,
            favorites: this.state.favorites,
        });
    }

    onChangeLink(event) { //sets link when inputted 
        this.setState({
            link: event.target.value,
            location: this.state.location,
            isFavorite: this.state.isFavorite,
            showImage: this.state.showImage,
            compare: this.state.checked,
            usr: this.state.usr,
            favorites: this.state.favorites,
        });
    }

=======
    }

    onChangeComp(event) { // toggles compare state when checked/unchecked
        this.setState({
            link: this.state.link,
            location: this.state.location,
            isFavorite: this.state.isFavorite,
            showImage: this.state.showImage,
            compare: event.target.checked,
            usr: this.state.usr,
            favorites: this.state.favorites,
        });
    }

    onChangeLink(event) { //sets link when inputted 
        this.setState({
            link: event.target.value,
            location: this.state.location,
            isFavorite: this.state.isFavorite,
            showImage: this.state.showImage,
            compare: this.state.checked,
            usr: this.state.usr,
            favorites: this.state.favorites,
        });
    }

>>>>>>> ceba585f06b4e92827dcd748f5e2f23338f41f8b

    removeFavorite(link) { //removes favorite, button for this not yet implemented
        let favoritesCopy = this.state.favorites;
        const index = favoritesCopy.indexOf(link);
        if (index > -1) {
            favoritesCopy.splice(index, 1);
          }
        this.setState({
            link: this.state.link,
            location: this.state.location,
            isFavorite: this.state.isFavorite,
            showImage: this.state.showImage,
            compare: this.state.compare,
            usrname: this.state.usrname,
            favorites: favoritesCopy
        })
    }

    handleSubmit(event){ // shows image once form is submitted
        const favoritesCopy  = this.state.favorites;
        if(this.state.isFavorite) {
            favoritesCopy.push(this.state.link); //add entered link to favorites
        }
        this.setState({
            link: this.state.link,
            location: this.state.location,
            isFavorite: this.state.isFavorite,
            showImage: true,
            compare: this.state.compare,
            favorites: favoritesCopy,
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
       const favorites = this.state.favorites; 
       const getFavorites = favorites.map((value) => { //list of favorites as buttons
        return (
          <li >
            <button onClick={(evt) => this.selectFav(value)}>{value}</button> 
          </li>
        );
      });
<<<<<<< HEAD


      const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }

      
=======
>>>>>>> ceba585f06b4e92827dcd748f5e2f23338f41f8b
      return (
        <div class="all"> 
            <div class="topBar">     
                <p id="name">
                    {this.state.usrname}
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
                    <ul>
                        {getFavorites}
                    </ul>
                  </div>
                    <button className="download">
                        Download
                    </button>
<<<<<<< HEAD
                    <button className="fullscreen" onClick={() => openInNewTab('https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg')}>
=======
                    <button className="fullscreen">
>>>>>>> ceba585f06b4e92827dcd748f5e2f23338f41f8b
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
                            value={this.state.link}
                            type="text"  
                            onChange={this.onChangeLink}
                            placeholder="Search the world..." />
                            <br/>
                            <select
                            name="location" 
                            location={this.state.location} 
                            onChange={(evt) => this.handleChange(evt)} 
                            >
                                <option location="Los Angeles, USA">Los Angeles, USA</option>
                                <option location="Perth, AU">Perth, AU</option>
                            </select>
                        </div>
<<<<<<< HEAD
                    
=======
>>>>>>> ceba585f06b4e92827dcd748f5e2f23338f41f8b
                    <div class="sub">
                        <input type="submit" value="submit"/>
                    </div>
                    <label class="favorite">
                        Add to Favorites? 
                        <input
                            name="isFavorite"
                            type="checkbox"
                            checked={this.state.isFavorite}
                            onChange={this.onChangeFav} />
<<<<<<< HEAD
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
                    
=======
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
>>>>>>> ceba585f06b4e92827dcd748f5e2f23338f41f8b
                </form>   
                <div class="screenshot">
                    { (this.state.showImage)  ?
                            <LinkPair compare={this.state.compare} link={this.state.link} location={this.state.location}/>
                            : null } 
                </div> 
            </div>
            </div>
        </div>
      );
    }
  }

export default Home;