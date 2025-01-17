import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import axios from "axios";
import screenshot from '../screenshots/screenshot.png';
import default_screenshot from '../screenshots/default_screenshot.png'


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
        filtered_fav: [],
        latitude: null,
        longitude: null,
        
    }
      this.onChangeLat = this.onChangeLat.bind(this);
      this.onChangeLong = this.onChangeLong.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onChangeFav =  this.onChangeFav.bind(this);
      this.removeFavorite = this.removeFavorite.bind(this); 
      this.onChangeLink = this.onChangeLink.bind(this);
      this.selectFav = this.selectFav.bind(this); 
      this.setCoords = this.setCoords.bind(this);  
      this.handleSearch = this.handleSearch.bind(this); 
    }
    
    handleSearch(e) {
		// Variable to hold the original version of the list
    let currentList = [];
		// Variable to hold the filtered list before putting into state
    let newList = [];

		// If the search bar isn't empty
    if (e.target.value !== "") {
			// Assign the original list to currentList
      currentList = this.state.favorites;

			// Use .filter() to determine which items should be displayed
			// based on the search terms
      newList = currentList.filter(item => {
				// change current item to lowercase
        const lc = item.toLowerCase();
				// change search term to lowercase
        const filter = e.target.value.toLowerCase();
				// check to see if the current list item includes the search term
				// If it does, it will be added to newList. Using lowercase eliminates
				// issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
			// If the search bar is empty, set newList to original task list
      newList = this.state.favorites;
    }
		// Set the filtered state based on what our rules added to newList
    this.setState({
      filtered_fav: newList
    });
    }

    getData(){
        axios

            .get("http://localhost:8000/user/".concat(this.props.location.state[0].username)) //taking input from login Page
            .then(response=>{
                console.log(response);
                    this.setState({
                        usrname: response.data.username,
                        isLoading: false,
                        favorites: response.data.favorites,
                        filtered_fav: response.data.favorites,
                    });
            })
            .catch(error=>this.setState({error, isLoading: false}));  
            
    }

    postData(list){
        axios.post('http://localhost:8000/push', {
            username: this.state.usrname,
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
                latitude: 34.05,
                longitude: -118.25
            });
            return;
        } else if (city === "Sydney"){
            this.setState({
                latitude: -33.8,
                longitude: 151.2
            });
            return;
        } else if (city === "London") {
            this.setState({
                latitude: 52.51,
                longitude: -0.128
            });
        } else if (city === "Delhi") {
            this.setState({
                latitude: 28.71,
                longitude: 77.11
            });
        } else if (city === "Shanghai") {
            this.setState({
                latitude: 31.23,
                longitude: 121.47
            });
        } else if (city === "Tokyo") {
            this.setState({
                latitude: 35.68,
                longitude: 139.65
            });
        } else if (city === "Cairo") {
            this.setState({
                latitude: 30.01,
                longitude: 31.24
            });
        } else if (city === "Dubai") {
            this.setState({
                latitude: 25.21,
                longitude: 55.27
            });
        } else if (city === "Moscow") {
            this.setState({
                latitude: 55.76,
                longitude: 37.62
            });
        } else if (city === "Istanbul") {
            this.setState({
                latitude: 41.01,
                longitude: 28.98
            });
        } else if (city === "Sao") {
            this.setState({
                latitude: -23.55,
                longitude: -46.63
            });
        } else if (city === "Beijing") {
            this.setState({
                latitude: 39.91,
                longitude: 116.41
            });
        } 

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
    
    onChangeLong(event) {
        this.setState({
            longitude: event.target.value,
        });
        console.log(this.state.longitude);
    }

    onChangeLat(event) {
        this.setState({
            latitude: event.target.value,
        });
        console.log(this.state.latitude);
    }



    removeFavorite(link) { //removes favorite, button for this IS implemented
        let favoritesCopy = this.state.favorites;
        const index = favoritesCopy.indexOf(link);
        if (index > -1) {
            favoritesCopy.splice(index, 1);
          }
        this.setState({
            favorites: favoritesCopy,
            filtered_fav: favoritesCopy
        })
        this.postData(this.state.favorites)
    }

    handleSubmit(event){ // shows image once form is submitted
        alert("Please wait a few seconds while your image gets pat down by the TSA")
        axios.post('http://localhost:8000/pyargs', {
            link: this.state.link,
            longitude: this.state.longitude,
            latitude: this.state.latitude
        })
        .then(res => {
            console.log(res);
        })
        const favoritesCopy  = this.state.favorites;
        if(this.state.isFavorite) {
            favoritesCopy.push(this.state.link); //add entered link to favorites
            this.postData(this.state.favorites);
        }
        this.postData(this.state.favorites);
        this.setState({
            showImage: true,
            favorites: favoritesCopy,
            filtered_fav: favoritesCopy
        });
        event.preventDefault();
    }

  
    render() {
        /* all classes below for only CSS styling purposes
        all class: containes everything

        topBar class: the top display bar, has signout button and will display
                       user's name 

        below class: **TO BE RENAMED** includes everything except top bar

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

        screenshot class: displays image
        */
       
       const favorites = this.state.filtered_fav;
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
                    <input type="text" className="input" placeholder="Search..." onChange={this.handleSearch} />

                    <ul>
                        {getFavorites}
                    </ul>
                  </div>
                  <div class="fullDown">
                    <Link to = "/FullScreen" class="full" >
                        <button className="fullscreen" >
                            Fullscreen
                        </button>
                    </Link>  
                
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
                        <input type="text" name="latitude" placeholder="Latitude" value={this.state.latitude} onChange={this.onChangeLat}/>
                        <input name="longitude" type="text" placeholder="Longitude" value={this.state.longitude} onChange={this.onChangeLong}/>
                    </label>
                        </form>   
                <div class="screenshot">
                    { <LinkPair link={this.state.link} longitude={this.state.longitude} latitude={this.state.latitude}/> } 
                </div> 
            </div>
            </div>
        </div>
      );
    }
  }




export default Home;
