import React, { useState, useEffect ,useContext} from 'react'
import { Link } from 'react-router-dom'
import noimage from '../assets/images/no-image.jpg'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {  AiFillStar,AiOutlineStar,AiOutlineEyeInvisible} from 'react-icons/ai';
import { BiSelectMultiple, BiCameraMovie} from 'react-icons/bi';
import { ImStarEmpty, ImStarFull } from "react-icons/im";
import { FaRegEye } from "react-icons/fa";
import API_URL from '../constant';

import { toast } from 'react-toastify';
import Contextpage from '../Contextpage';
import axios from 'axios';

function Moviecard({ movie }) {
    // create logic so that user can bookmark an movie and it will store into d
        const { user,activeUserId } = useContext(Contextpage);

        const [isBookmarked, setIsBookmarked] = useState(null);
        const [isAddedToWatchList, setIsAddedToWatchList] = useState(null);
        const [isAddedToWatched,setIsAddedToWatched] = useState(null);

        useEffect(() => {
            // function to check if the movie is already bookmarked or not
            const res = async () => {
                const res = await axios.get(`${API_URL}/fetchMovieFromFavorites/${activeUserId}/${movie.movie_id}`);
                if(res.data!= -1){
                    setIsBookmarked(true);
                }else{
                    setIsBookmarked(false);
                }
            }

            const res1 = async (req, res) => {
                const result1 = await axios.get(`${API_URL}/fetchWantToWatchFromFavorites/${activeUserId}/${movie.movie_id}`);
                if(result1.data!= -1){
                    setIsAddedToWatchList(true);
                }else{
                    setIsAddedToWatchList(false);
                }
            }
            const res2 = async (req, res) => {
                const result1 = await axios.get(`${API_URL}/fetchMovieFromWatched/${activeUserId}/${movie.movie_id}`);
                if(result1.data!= -1){
                    setIsAddedToWatched(true);
                }else{
                    setIsAddedToWatched(false);
                }
            }

            res();
            res1();
            res2();
        }, [movie.movie_id]);

        const BookmarkMovie = async () => {
            if (activeUserId == -1) {
                toast.info("To bookmark this movie, please log in.");
            } else {
                if (isBookmarked) {
                   
                    try {
                        // /1/1034062/1
                        await axios.post(`${API_URL}/updatefavorites/${activeUserId}/${movie.movie_id}/0`);
                        setIsBookmarked(false);
                        // toast.success("Movie bookmark removed successfully.");
                    } catch (error) {
                        console.error(error);
                        toast.error("Failed to remove movie bookmark.");
                    }
                } else {
                  
                    try {
                        await axios.post(`${API_URL}/updatefavorites/${activeUserId}/${movie.movie_id}/1`);
                        setIsBookmarked(true);
                        // toast.success("Movie bookmarked successfully.");
                    } catch (error) {
                        console.error(error);
                        toast.error("Failed to bookmark the movie.");
                    }
                }
            }
        };

        // create same function as BookmarkMovie for wanttowatch
        const WantToWatchMovie = async () => {
            if (activeUserId == -1) {
                toast.info("To add this movie to your watch list, please log in.");
            } else {
                // setIsAddedToWatchList(!isAddedToWatchList);
                if (isAddedToWatchList) {
                    // localStorage.removeItem(movie.id);
                    // Make an API call to remove the movie from the watch list in the database
                    try {
                        // /1/1034062/0
                        await axios.post(`${API_URL}/updatewantToWatch/${activeUserId}/${movie.movie_id}/0`);
                        setIsAddedToWatchList(false);
                        // toast.success("Movie removed from watch list successfully.");
                    } catch (error) {
                        console.error(error);
                        toast.error("Failed to remove movie from watch list.");
                    }
                } else {
                    // localStorage.setItem(movie.id, JSON.stringify(movie));
                    // Make an API call to add the movie to the watch list in the database
                    try {
                        await axios.post(`${API_URL}/updatewantToWatch/${activeUserId}/${movie.movie_id}/1`);
                        setIsAddedToWatchList(true);
                        // toast.success("Movie added to watch list successfully.");
                    } catch (error) {
                        console.error(error);
                        toast.error("Failed to add movie to watch list.");
                    }
                }
            }
        };

        const WatchedMovie = async () => {
            if (activeUserId == -1) {
                toast.info("please login..");
            } else {
                // setIsAddedToWatchList(!isAddedToWatchList);
                if (isAddedToWatched) {
                    // Make an API call to remove the movie from the watch list in the database
                    try {
                        // /1/1034062/0
                        await axios.post(`${API_URL}/updateWatched/${activeUserId}/${movie.movie_id}/0`);
                        setIsAddedToWatched(false);
                        // toast.success("Movie removed from watch list successfully.");
                    } catch (error) {
                        console.error(error);
                        toast.error("Failed to remove movie from watch list.");
                    }
                } else {
                    // Make an API call to add the movie to the watch list in the database
                    try {
                        await axios.post(`${API_URL}/updateWatched/${activeUserId}/${movie.movie_id}/1`);
                        setIsAddedToWatched(true);
                        // toast.success("Movie added to watch list successfully.");
                    } catch (error) {
                        console.error(error);
                        toast.error("Failed to add movie to watch list.");
                    }
                }
            }
        };


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            layout
            className="card relative w-full md:w-60 h-[410px] md:h-[360px] my-3 mx-4 md:my-5 md:mx-0 cursor-pointer rounded-xl overflow-hidden">
         <button className="absolute bg-black text-white p-2 z-20 left rounded-br-lg" onClick={BookmarkMovie}> {isBookmarked ?  <AiFillStar /> : <AiOutlineStar/>}</button>
           <button className="absolute bg-black text-white p-2 z-20 left top-10 rounded-br-lg" onClick={WantToWatchMovie} >{isAddedToWatchList ? <BiSelectMultiple /> : <BiCameraMovie />} </button>
           <button  className="absolute bg-black text-white p-2 z-20 top-20 rounded-br-lg" onClick={WatchedMovie} >{isAddedToWatched ? <FaRegEye /> : <AiOutlineEyeInvisible />} </button>
            <div className='absolute bottom-0 w-full flex justify-between items-end p-3 z-20'>
                <h1 className='text-white text-xl font-semibold  break-normal break-words'>{movie.title || movie.name}</h1>

                {(movie.rating||0) > 7 ? <h1 className='font-bold text-green-500 p-2 bg-zinc-900 rounded-full'>{(movie.rating||0)}</h1> : (movie.rating||0) > 5.5 ? <h1 className='font-bold text-orange-400 p-2 bg-zinc-900 rounded-full'>{(movie.rating||0)}</h1> : <h1 className='font-bold text-red-600 p-2 bg-zinc-900 rounded-full'>{(movie.rating||0)}</h1>}
            </div>

            <Link to={`/moviedetail/${movie.movie_id}`} className='h-full w-full shadow absolute z-10'></Link>

            <div>
                {movie.poster_path === null ? <img className='img object-cover' src={noimage} /> :
                    <LazyLoadImage effect='blur' className='img object-cover' src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />}
            </div>
        </motion.div>
    )
}

export default Moviecard
