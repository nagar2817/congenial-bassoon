import React, { useEffect, useContext, useState } from 'react'
import Header from '../components/Header';
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import API_URL from '../constant';

function Favoritepage() {

    const { loader, GetFavorite,activeUserId } = useContext(Contextpage);
    const [favMovies, setFavMovies] = useState([]);

    useEffect(() => {
// fecth fav movies using api
console.log(activeUserId);
        const res = async () => {
            const res = await axios.get(`${API_URL}/fav/${activeUserId}`);
            // console.log(res.data);
            setFavMovies(res.data);
        }
        res();
        GetFavorite();
        
    }, [activeUserId]);

    return (
        <>
          <Helmet>
            <title> Movie Zone | Favorite Movies </title>
          </Helmet>
            
            <div className='w-full bg-[#10141e] md:p-10 mb-20 md:mb-0'>
                <Header />
                <motion.div
                    layout
                    className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around">
                    <AnimatePresence>
                        {
                            loader ? <span className="loader m-10"></span> :
                                <>
                                    {
                                        favMovies.length == 0
                                            ?
                                            <p className="text-xl text-white">No Bookmark Yet!</p>
                                            : 
                                            favMovies.map((movie, index) => (<Moviecard key={index} movie={movie}/>))
                                    }
                                </>
                        }
                    </AnimatePresence>
                </motion.div>
            </div>
        </>
    )
}

export default Favoritepage