import React from 'react';
import './Home.css';
import beach from '../components/beach.jpg';


class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {link: '', location: 'Los Angeles, USA', isFavorite: false, showImage: false};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = name == 'link' ? target.link : 
        name == "isFavorite" ? target.isFavorite : 
        name == 'showImage' ? target.isFavorite : target.location;
       
        this.setState({
            [name]: value
        });    
    }

    handleSubmit(event){
        this.setState({
            link: this.state.link,
            location: this.state.location,
            isFavorite: this.state.isFavorite,
            showImage: true,
        });
        event.preventDefault();
    }
  
    render() {
      return (
            <div> 
                <h1> 
                    Enter a link and location to view
                </h1>
                <form onSubmit={this.handleSubmit}>
                        <input
                        name="link" 
                        type="text" 
                        //link={this.state.link} 
                        onChange={this.handleChange} 
                        placeholder="Search the world..." />
                    <br />
                        <select
                        name="location" 
                        location={this.state.location} 
                        onChange={this.handleChange} 
                        >
                        <option location="Los Angeles, USA">Los Angeles, USA</option>
                        <option location="Perth, AU">Perth, AU</option>
                        </select>
                    <br />
                    <label class="favorite">
                        Favorite
                        <input
                            name="isFavorite"
                            type="checkbox"
                            checked={this.state.isFavorite}
                            onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="submit" />
                </form>
                <div> 
                    { (this.state.showImage) ? <img src={beach} alt={"image"} /> : null} 
                </div> 
        </div>
      );
    }
  }

export default Home;