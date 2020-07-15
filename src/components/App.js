import React from "react";
import { data } from "../data";

import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import {storeContext} from '../index'
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

    const {movies, search} = this.props.store.getState();
    const { list, favourites, showFavourites } = movies;

    console.log('check',showFavourites);

    const displayMovies = showFavourites ?  favourites : list;

    console.log('State', this.props.store.getState());


    return (
      <div className="App">
        <Navbar  search = {search} />

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

class AppWrapper extends React.Component{

  render(){

    return(
      <storeContext.Consumer>
        {(store) => 
        <App store={store}/>
        }
      </storeContext.Consumer>
    )
  }
}

export default AppWrapper;
