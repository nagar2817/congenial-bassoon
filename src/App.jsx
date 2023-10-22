import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Detail } from './components/Detail';
// import Login from './auth/Login';
import Login from './auth/GoogleLogin';
import Navbar from './components/Navbar'
import Container from './pages/Container'
import Favorite from './pages/Favoritepage';
import WantToWatch from './pages/WantToWatchPage';
import WatchedPage from './pages/WatchedPage';
import { MovieProvider } from "./Contextpage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";
import logo from "./assets/images/logo.png"
import API_URL from './constant';
// import Signup from './auth/signup';

function App() {

  return (
    <MovieProvider>
      <Helmet>
       <meta property="og:image" content={logo}/>
      </Helmet>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />

      <Navbar />
      <div className="md:ml-[15rem]">
        <Routes>
          <Route path='/' element={<Container />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/signup' element={<Signup />} /> */}
          <Route path='/moviedetail/:id' element={<Detail />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/watched" element={<WatchedPage />} />
          <Route path="/wantToWatch" element={<WantToWatch />} /> 
          <Route path="/search/:query" element={<Container/>}/>
          <Route path="/search/" element={<Container/>}/>
        </Routes> 
      </div>
    </MovieProvider> 
  ) 
}

export default App
