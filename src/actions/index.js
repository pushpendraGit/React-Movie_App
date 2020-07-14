export const ADD_MOVIES = 'ADD_MOVIES'

//these function are called action creater
export function addMovies(movies){

    return{

        type:ADD_MOVIES,
        movies
    }
}