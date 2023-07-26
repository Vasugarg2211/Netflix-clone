import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { API_KEY, TMDB_BASE_URL } from "../utils/constant";
import axios from "axios";

const initialState = {
    movies:[],
    genresLoaded:false,
    genres:[]
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
    const link = `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
    const {data:{genres}} = await axios.get(link);
    return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({id}) => id === genre);
            if(name) movieGenres.push(name.name);
        });
        if(movie.backdrop_path) 
            moviesArray.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image:movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
            });
        
    });
};

export const getUsersLikedMovies = createAsyncThunk(
    "netflix/getLiked",
    async (email) => {
      const {
        data: { movies },
      } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
      return movies;
    }
  );

const getRawData = async (api, genres, paging=false) => {
    const moviesArray=[];
    for(let i=1; moviesArray.length<60 && i<10; i++) {
        const {
            data: { results },
          } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
        // const {data:{results}} = await axios.get(
        //     `${api}${paging?`&page=${i}`:""}`
        //     );
        createArrayFromRawData(results, moviesArray, genres);
    }
    return moviesArray;
};

export const fetchMovies = createAsyncThunk("netflix/trending", async ({type}, thunkApi) => {
    const {netflix:{genres}} = thunkApi.getState();
    const rawLink = `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`;
    return getRawData(rawLink, genres, true);
    
});

const NetflixSlice = createSlice({
    name:"Netflix",
    initialState,
    extraReducers :(builder)=>{
        builder.addCase(getGenres.fulfilled, (state, action) =>{
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) =>{
            state.movies = action.payload;
        });
        builder.addCase(getUsersLikedMovies.fulfilled, (state, action) =>{
            state.movies = action.payload;
        });
    },
});

export const store = configureStore({
    reducer:{
        netflix:NetflixSlice.reducer,
    },
});