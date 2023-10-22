import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import Contextpage from '../Contextpage';
import { HiChevronLeft } from "react-icons/hi";
import noimage from '../assets/images/movies.jpg'
import { FaPlay } from "react-icons/fa";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import slugify from 'react-slugify';
import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../constant';




export const Detail = () => {

  const APIKEY = import.meta.env.VITE_API_KEY;

  const { loader, setLoader ,activeUserId} = useContext(Contextpage);

  const { id } = useParams()

  const [moviedet, setMoviedet] = useState([]);
  const[genresArray,setGenresArray] = useState([]);
  const [moviegenres, setMoviegenres] = useState([]);
  const [isAddedToWatched, setIsAddedToWatched] = useState(null);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const[userRating,setUserRating] = useState(0);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
    setError('');
  };
  const handleRatingSubmit =  async () => {
    if (rating < 0 || rating > 10) {
      toast.error('Rating should be between 0 and 10');
      return;
    }
    // crete post request for updateUserrating ot pass rating

    await axios.post(`${API_URL}/updateUserRating/${activeUserId}/${id}`,{rating});
    // console.log(updatedRating);
    setUserRating(rating);
    toast.success('Rating submitted');
  };

  const fetchMovie = async () => {
    let movieGenre = [];
    const data = await axios.get(`${API_URL}/getSinglemovie/${id}`);
    const res1 = await axios.get("${API_URL}/moviesgenres/genres");
    const user_rating = await axios.get(`${API_URL}/userrating/${activeUserId}/${id}`);
    console.log(user_rating.data.rating);
    setUserRating(user_rating.data.rating);
    setGenresArray(res1.data.data);
    setMoviedet(data.data);
    console.log(data.data);
    for(let i=0;i<data.data.genre_ids.length;i++) {
      for(let j=0;j<res1.data.data.length;j++) {
        if(data.data.genre_ids[i] == res1.data.data[j].id) {
         movieGenre.push(res1.data.data[j]);
        }
      }
    }
    const result1 = await axios.get(`${API_URL}/fetchMovieFromWatched/${activeUserId}/${moviedet.movie_id}`);
    if(result1.data!= -1){
        setIsAddedToWatched(true);
    }else{
        setIsAddedToWatched(false);
    }
    // console.log(moviedetail);
    setMoviegenres(movieGenre);
    setLoader(false);
  };

  useEffect(() => {
    fetchMovie();
  }, [activeUserId,userRating]); 



  return (

    <>
      {
        loader ? <div className='h-screen w-full flex justify-center items-center'><span className="loader m-10"></span></div> :
          <>

            <Link to="/" className='fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full'><HiChevronLeft /></Link>

            {/* poster */}
            <div className='relative h-auto md:h-[82vh] flex justify-center'>
              <div className='h-full w-full shadowbackdrop absolute'></div>
              <h1 className='text-white absolute bottom-0 p-10 text-2xl md:text-6xl font-bold text-center'>{moviedet.title}</h1>
              {moviedet.backdrop_path === null ? <img src={noimage} className='h-full w-full' /> : <img src={"https://image.tmdb.org/t/p/original/" + moviedet.backdrop_path} className='h-full w-full' />}
            </div>

            {/* overview */}
            <h2 className='text-white text-center pt-5 px-3 md:px-60 font-Roboto text-[18px]'>{moviedet.overview}</h2>

            <div className='text-blue-100 font-semibold my-3 flex gap-2 justify-center'>
              <h4 className='bg-blue-600/30 border-2 border-blue-700 py-2 px-3 rounded-full'>Release Date : {moviedet.release_date}</h4>
              <h4 className='bg-blue-600/30 border-2 border-blue-700 py-2 px-3 rounded-full'>Rating : {moviedet.rating} / 10  ({moviedet.vote_count})</h4>
          
              { userRating ? (<h4 className='bg-blue-600/30 border-2 border-blue-700 py-2 px-3 rounded-full'>  You give {userRating}/10</h4>) : ('') }
            </div>

            {isAddedToWatched && (
        <div className="text-blue-100 font-semibold my-3 flex justify-center">
          <div className="bg-blue-600/30 border-2 border-blue-700 py-2 px-3 rounded-full">
            <p className="mb-1">Rate this movie:</p>
            <div className="flex items-center">
              <input
                type="number"
                min="0"
                max="10"
                value={rating}
                onChange={handleRatingChange}
                className={`mr-2 appearance-none bg-transparent border-b-2 ${
                  error ? 'border-red-500' : 'border-blue-500'
                } text-blue-500 placeholder-blue-500 focus:outline-none`}
                placeholder="Enter rating"
              />
              <button onClick={handleRatingSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-full">
                Rate!
              </button>
            </div>
           
          </div>
        </div>
      )}

    

            {/* tag */}
            <div className='flex justify-center flex-wrap'>
              {moviegenres.map((tag,index) => (
                <>
                  <div key={index} className='text-white font-semibold bg-gray-800 rounded-full px-4 py-1 m-2'>{tag.name}</div>
                </>
              ))}
            </div>
         
         
          </>
      }
    </>
  )
}
