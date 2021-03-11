import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import axios from "axios";
import screenshot from '../screenshots/screenshot.png';


class LinkPair extends React.Component {  //Link pair will be used to communicate to backend
    constructor(props) {
        super(props);
        this.state = {
            link: this.props.link,
            longitude: this.props.longitude,
            latitude: this.props.latitude,
        };
    }

    render(){
        console.log("Home.js render()")
        console.log(this.state.longitude)
        console.log(this.state.latitude)
        axios.post('http://localhost:8000/pyargs', {
            link: this.state.link,
            longitude: this.state.longitude,
            latitude: this.state.latitude
        })
        .then(res => {
            console.log(res)
        })
        return (        
                    <img id="single" src={screenshot} alt={"image"} /> 
        )
    }
}

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        link: '', 
        isFavorite: false, 
        showImage: false, 
        compare: false,
        errors: null,
        isLoading: true,
        usrname: "example", //usrname and favorites temporarily hard coded
        favorites: ["Loading..."],
        latitude: null,
        longitude: null,
        
    }
      this.handleChange = this.handleChange.bind(this); //**TODO: clean up handle/on change functions
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onChangeFav =  this.onChangeFav.bind(this);
      this.removeFavorite = this.removeFavorite.bind(this); 
      this.onChangeLink = this.onChangeLink.bind(this);
      this.selectFav = this.selectFav.bind(this); 
      this.setCoords = this.setCoords.bind(this);   
    }
    
    getData(){
        axios

            .get("http://localhost:8000/".concat(this.props.location.state[0].username)) //taking input from login Page
            .then(response=>{
                console.log(response);
                    this.setState({
                        usrname: response.data.username,
                        isLoading: false,
                        favorites: response.data.favorites,
                    });
            })
            .catch(error=>this.setState({error, isLoading: false}));  
            
    }

    postData(list){
        axios.post('http://localhost:8000/push', {
            favorites: list
        })
        .then(res => {
            console.log(res)
        })
    }

    componentDidMount(){
        
        this.getData()

    }


    setCoords(city) { // sets coordinates if location is selected
        if(city === "LA"){
            this.setState({
                longitude: 34.05,
                latitude: -118.25
            });
            return;
        } else if (city === "Sydney"){
            this.setState({
                longitude: -33.8,
                latitude: 151.2
            });
            return;
        } else if (city === "London") {
            this.setState({
                longitude: 52.51,
                latitude: -0.128
            });
        } else if (city === "Delhi") {
            this.setState({
                longitude: 28.71,
                latitude: 77.11
            });
        } else if (city === "Shanghai") {
            this.setState({
                longitude: 31.23,
                latitude: 121.47
            });
        } else if (city === "Tokyo") {
            this.setState({
                longitude: 35.68,
                latitude: 139.65
            });
        } else if (city === "Cairo") {
            this.setState({
                longitude: 30.01,
                latitude: 31.24
            });
        } else if (city === "Dubai") {
            this.setState({
                longitude: 25.21,
                latitude: 55.27
            });
        } else if (city === "Moscow") {
            this.setState({
                longitude: 55.76,
                latitude: 37.62
            });
        } else if (city === "Istanbul") {
            this.setState({
                longitude: 41.01,
                latitude: 28.98
            });
        } else if (city === "Sao") {
            this.setState({
                longitude: -23.55,
                latitude: -46.63
            });
        } else if (city === "Beijing") {
            this.setState({
                longitude: 39.91,
                latitude: 116.41
            });
        } 

    }
  
    handleChange(event) { //updates state whenever user gives new input/value to something 
        const target = event.target;
        const name = target.name;
        const value = name === 'link' ? target.link : 
        name === "isFavorite" ? target.isFavorite : 
        name === 'showImage' ? target.isFavorite :
        name === "longitude" ? event.target.longitude :
        name === "latitude" ? event.target.latitude :
        target.location;
       
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
            isFavorite: event.target.checked,
        });
    }


    onChangeLink(event) { //sets link when inputted 
        this.setState({
            link: event.target.value,
            location: this.state.location,
            isFavorite: this.state.isFavorite,
            showImage: this.state.showImage,
            compare: this.state.checked,
            usrname: this.state.usrname,
            favorites: this.state.favorites,
        });
    }


    removeFavorite(link) { //removes favorite, button for this not yet implemented
        let favoritesCopy = this.state.favorites;
        const index = favoritesCopy.indexOf(link);
        if (index > -1) {
            favoritesCopy.splice(index, 1);
          }
        this.setState({
            favorites: favoritesCopy
        })
    }

    handleSubmit(event){ // shows image once form is submitted
        const favoritesCopy  = this.state.favorites;
        if(this.state.isFavorite) {
            favoritesCopy.push(this.state.link); //add entered link to favorites
            this.postData(this.state.favorites);
        }
        this.setState({
            showImage: true,
            favorites: favoritesCopy,
        });
        event.preventDefault();
    }

  
    render() {
        /* all classes below for only CSS styling purposes
        all class: containes everything

        topBar class: the top display bar, has signout button and will display
                       user's name (temporarily word 'USERNAME')

        space class: **TO BE RENAMED** includes everything except top bar

        navBar class: side display bar, includes scrollable list of favorites
                      (currently hard coded), fullscreen button, and download
                      button (both of which do nothing at the moment)

        mainPage class: everything besides side and top bar

        form: includes location dropdown, link input box, favorite and comparison
              checkboxes

        fullDown: inclused fullscreen and download buttons

        options class: location dropdown, link input box

        sub class: submit button

        coords: has longitude and laditude boxes

        screenshot class: displays image, 1 if comparison is off, 2 images if on
                          currently hardcoded image from beach.jpg, to be changed
        */
       
       const favorites = this.state.favorites;
       const getFavorites = favorites.map((value) => { //list of favorites as buttons
        return (
          <li>
              <div class="favslist">
            <button onClick={(evt) => this.selectFav(value)}>{value}</button> 
            <div class="delete">
            <button onClick={(evt) => this.removeFavorite(value)}>Delete</button>
            </div>
            </div>
          </li>
        );
      });


      const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }
      return (
        <div class="all"> 
            <div class="topBar">     
                <p id="name">
                    {!this.state.isLoading ? this.state.usrname : "Loading..."}
                </p>
                <Link to = "/" class="signout">
                    <button  type="button" class="logout">
                        Sign out
                    </button>
                </Link>  
            </div>
        <div class="below">
            <div class="sideBar">
              <div class="navBar">
                <div class="favs">
                    My Favorites
                    <ul>
                        {getFavorites}
                    </ul>
                  </div>
                  <div class="fullDown">
                    <button className="download">
                        Download
                    </button>
                    <button className="fullscreen" onClick={() => openInNewTab('https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg')}>
                        Fullscreen
                    </button>
                    </div>
              </div>
                <div class="locations">
                    Locations
                     <ul>
                        <li><button onClick={(evt) => this.setCoords("LA")}>Los Angeles, US</button> </li>
                        <li><button onClick={(evt) => this.setCoords("Sydney")}>Sydney, AU</button></li>
                        <li><button onClick={(evt) => this.setCoords("London")}>London, UK</button></li>
                        <li><button onClick={(evt) => this.setCoords("Delhi")}>New Delhi, IN</button></li>
                        <li><button onClick={(evt) => this.setCoords("Shanghai")}>Shanghai, CN</button></li>
                        <li><button onClick={(evt) => this.setCoords("Tokyo")}>Tokyo, JP</button></li>
                        <li><button onClick={(evt) => this.setCoords("Cairo")}>Cairo, EG</button></li>
                        <li><button onClick={(evt) => this.setCoords("Dubai")}>Dubai, UAE</button></li>
                        <li><button onClick={(evt) => this.setCoords("Moscow")}>Moscow, RU</button></li>
                        <li><button onClick={(evt) => this.setCoords("Istanbul")}>Istanbul, TR</button></li>
                        <li><button onClick={(evt) => this.setCoords("Sao")}>Sao Paulo, BR</button></li>
                        <li><button onClick={(evt) => this.setCoords("Beijing")}>Beijing, CN</button></li>
                    </ul>
                </div>
              </div>
            <div class="mainPage"> 
                {/*<h1> 
                    Enter a link and location to view
                </h1>*/}
                <form onSubmit={this.handleSubmit} class="frm">
                        <div class="options">
                            <input
                            name="link" 
                            value={this.state.link}
                            type="text"  
                            onChange={this.onChangeLink}
                            placeholder="Search the world..."/>
                            <br/>
                            <label class="favorite">
                                Add to Favorites?
                                <input
                                    name="isFavorite"
                                    type="checkbox"
                                    checked={this.state.isFavorite}
                                    onChange={this.onChangeFav} />
                    </label>
                        </div>                   
                    <div class="sub">
                        <input type="submit" value="submit"/>
                    </div>
                    <label class="coords">
                        <input name="longitude" type="text" placeholder="Longitude" value={this.state.longitude} onChange={(evt) => this.handleChange(evt)}/>
                        <input type="text" name="latitude" placeholder="Latitude" value={this.state.latitude} onChange={(evt) => this.handleChange(evt)}/>
                    </label>
                        </form>   
                <div class="screenshot">
                    { (this.state.showImage)  ?
                            <LinkPair link={this.state.link} longitude={this.state.longitude} laditude={this.state.latitude}/>
                            : null } 
                </div> 
            </div>
            </div>
        </div>
      );
    }
  }




export default Home;