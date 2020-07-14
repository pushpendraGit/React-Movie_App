import React from "react";
import { data } from "../data";

import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies,setShowFavourite} from "../actions";

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;

    store.subscribe(() => {
      console.log("Updating");

      this.forceUpdate();
    });

    store.dispatch(addMovies(data));

    console.log("State", this.props.store.getState());
  }


  isMovieFavourite = (movie)=>{

    const {movies} = this.props.store.getState();

    const index = movies.favourites.indexOf(movie);

    if(index !== -1)
    {
      return true;
    }

    return false;
  }

  onChangeTab = (val) =>{

    this.props.store.dispatch(setShowFavourite(val));
  }

  render() {

    const {movies} = this.props.store.getState();
    const { list, favourites, showFavourites } = movies;

    console.log('check',showFavourites);

    const displayMovies = showFavourites ?  favourites : list;

    console.log('State', this.props.store.getState());

    return (
      <div className="App">
        <Navbar />

        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '' :'active-tabs'}`} onClick={() =>this.onChangeTab(false)}>Movies</div>

            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() =>this.onChangeTab(true)}>Favorite</div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard movie={movie} 
              key={`movies-${index}`}  
              dispatch={this.props.store.dispatch} 

              isFavourite = {this.isMovieFavourite(movie)}
              
              />
            ))}
          </div>
          {displayMovies.length ===0 ? <div className="no-movies">No Movies To Display!</div> : null}
        </div>
      </div>
    );
  }
}

export default App;
