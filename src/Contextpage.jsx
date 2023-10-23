import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth"
import { toast } from 'react-toastify';
import axios from 'axios';
const Contextpage = createContext();
import API_URL from "./constant";

export function MovieProvider({ children }) {

  const [header, setHeader] = useState("Movies");
  const [totalPage, setTotalPage] = useState(null)
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [activegenre, setActiveGenre] = useState(28);
  const [genres, setGenres] = useState([])
  const [loader, setLoader] = useState(true);
  const [backgenre, setBackGenre] = useState(false);
  const [limit,setLimit] = useState(20);
  const [activeUserId,setActiveUserId] = useState(-1);
  // const [user,setUser] = useState('');
  const [user, setUser] = useAuthState(auth)
  const navigate = useNavigate();

  useEffect(() => {
    if (page < 1) {
      setPage(1)  // Increment page to 1 if it is less than 1.
    }
    // console.log(user);
    const res = async ()=>{

    console.log("line 43",user);
    const email =  user?.email;
    const password = user?.uid;
    const username = email?.substring(0, email.indexOf("@"))
    const res = await axios.get(`${API_URL}/signin/${email}/${password}`);
    console.log("activeId",res.data) 
    setActiveUserId(res.data);
    }
    res();

  }, [page,user]);


  const filteredGenre = async () => {
    // alert('dsd');
    setHeader("Genres");
    const res = await axios.get(`${API_URL}/filteredgenres/${activegenre}/${limit}`)
    const filteredGenre = res.data;
    setMovies(movies.concat(filteredGenre));  // Concat new movies with previous movies, on genre change movies are reset to [] so that only movies of new genre will appear, check out useEffect on top for more information.
    setTotalPage(filteredGenre.length);
    setLoader(false);
  };


  const fetchSearch = async (query) => {
    const data = await axios.get(`${API_URL}/filteredMovies/${query}`)
    setSearchedMovies(data.data); 
    setLoader(false);
    setHeader(`Results for "${query}"`);
  }

  const fetchGenre = async () => {
    const res = await axios.get(`${API_URL}/moviesgenres/genres`)
    const gen = await res.data.data;
    // console.log(gen);
    setGenres(gen);
  }

  // creat local storage
  const GetFavorite = () => {
    setHeader("Favorite Movies");
    setLoader(false);
  }

  const GetWantToWatch = () => {
    setHeader("Want to Watch Movies");

    setLoader(false);
  }
  const GetWatched = () => {
    setHeader("Watched Movies");
    setLoader(false);
  }


  //<========= firebase Google Authentication ========>
  const googleProvider = new GoogleAuthProvider();// =====> google auth provide

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
    
      // console.log("result", result);
      // setUser(result.user);
      const email = result.user.email;
      const password = result.user.uid;
      const username = email.substring(0, email.indexOf("@"))
      const res = await axios.get(`${API_URL}/signin/${email}/${password}`);
      
      console.log(res) 
      setActiveUserId(res.data);
      // console.log(email, password, username);
       navigate("/")
       toast.success("Login successfully");
    
    } catch (err) {
      console.log(err)
      toast.error("Login failed");
      navigate("/")
    }
  }

const CreateUser = async (email,password)=>{
  // use createUserWithEmailAndPassword
  try {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    console.log("result", result);
    navigate("/")
    toast.success("Login successfully");
  } catch (err) {
    console.log(err)
    navigate("/")
  }
}
  // <==========================================================>

  return (
    <Contextpage.Provider
      value={{
        fetchGenre,
        genres,
        setGenres,
        filteredGenre,
        header,
        setHeader,
        movies,
        setMovies,
        page,
        setPage,
        activegenre,
        setActiveGenre,
        fetchSearch,
        loader,
        setBackGenre,
        backgenre,
        setLoader,
        GetFavorite,
        totalPage,
        searchedMovies,
        GoogleLogin,
        user,
        activeUserId,
        GetWantToWatch,
        GetWatched,
        setActiveUserId
      }}
    >
      {children}
    </Contextpage.Provider>
  );

}

export default Contextpage
