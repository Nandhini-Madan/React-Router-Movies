import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link ,Switch} from 'react-router-dom';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
          console.log("mov",response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <nav>
        <Link to="/MovieList">MovieList</Link>
      </nav>
      {console.log("movieList",movieList)}
      <SavedList list={savedList} />
      <Switch>
      <Route path="/MovieList">
        <MovieList movies={movieList}/>
       </Route>
       <Route path="/MovieList/:id">
         <Movie />
       </Route>
      </Switch>
      
      
    </div>
  );
};

export default App;
