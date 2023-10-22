import React, { useEffect, useContext, useState } from 'react'
import Header from '../components/Header';
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import API_URL from '../constant';



function WantToWatch() {

    const { loader, GetWantToWatch,activeUserId } = useContext(Contextpage);
    const [WantToWatchMovies, setWantToWatchMovies] = useState([]);

    useEffect(() => {

        console.log(activeUserId);
        const res = async () => {
            const res = await axios.get(`${API_URL}/watch/${activeUserId}`);
            console.log(res.data);
            setWantToWatchMovies(res.data);
        }

        res();
        GetWantToWatch();

    }, [activeUserId]);

    return (
        <>
          <Helmet>
            <title> Movie Zone | Want to Watch Movies </title>
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
                                        WantToWatchMovies.length == 0
                                            ?
                                            <p className="text-xl text-white">No WatchList added Yet!</p>
                                            : 
                                            WantToWatchMovies.map((movie, index) => (<Moviecard key={index} movie={movie}/>))
                                    }
                                </>
                        }
                    </AnimatePresence>
                </motion.div>
            </div>
        </>
    )
}

export default WantToWatch;