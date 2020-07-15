import React from "react";
import { data } from "../data";

import {connect} from 'react-redux';

import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
//import {storeContext,connect} from '../index'   //We have here used react-redux inbuilt connect functionn
import { addMovies,setShowFavourite} from "../actions";


class App extends React.Component {
  componentDidMount() {
   

    

    this.props.dispatch(addMovies(data));
  }


  isMovieFavourite = (movie)=>{

    const {movies} = this.props;

    const index = movies.favourites.indexOf(movie);

    if(index !== -1)
    {
      return true;
    }

    return false;
  }

  onChangeTab = (val) =>{

    this.props.dispatch(setShowFavourite(val));
  }

  render() {

    const {movies, search} = this.props;
    const { list, favourites, showFavourites } = movies;

    console.log('check',showFavourites);

    const displayMovies = showFavourites ?  favourites : list;

    //console.log('State', this.props.store.getState());


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
              dispatch={this.props.dispatch} 

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


//connect functtion is used is this place
// class AppWrapper extends React.Component{

//   render(){

//     return(
//       <storeContext.Consumer>
//         {(store) => 
//         <App store={store}/>
//         }
//       </storeContext.Consumer>
//     )
//   }
// }

function mapStateToProps(state){

  return {

    movies:state.movies,
    search:state.search
  }
}


const connectedAppComponent = connect(mapStateToProps)(App)

export default connectedAppComponent ;
