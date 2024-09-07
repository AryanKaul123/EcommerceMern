import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{
      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method : SummaryApi.current_user.method,
        credentials : 'include'
      })

      const dataApi = await dataResponse.json();

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data));
      }
  }

  const fetchUserDetails = async () => {
  try {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
    });

    // Check if the response is ok (status in the range 200-299)
    if (!dataResponse.ok) {
      throw new Error(`HTTP error! status: ${dataResponse.status}`);
    }

    // Safely parse JSON, catch any parsing errors
    const textResponse = await dataResponse.text();
    const dataApi = textResponse ? JSON.parse(textResponse) : null;

    if (dataApi && dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    } else {
      console.warn("Failed to fetch user details, response: ", dataApi);
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};


  useEffect(()=>{
    /**user Details */
    fetchUserDetails();
    /**user Details cart product */
    fetchUserAddToCart();

  },[])
  return (
    <>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart
      }}>
        <ToastContainer 
          position='top-center'
        />
        
        <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>
      </Context.Provider>
    </>
  );
}

export default App;
