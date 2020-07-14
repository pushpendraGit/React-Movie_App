import React from 'react';
import {addMovieToList} from '../actions'

class Navbar extends React.Component {


    handleAddToMovies = (movie) => {

        this.props.dispatch(addMovieToList(movie));

        this.setState({
            showSearchResults:false
        })

        
    }



    render() {
        return (
            <div className="nav">

                <div className="search-container">
                    <input  />

                    <button id="search-btn">Search</button>

                </div>
                
            </div>
        );
    }
}

export default Navbar;