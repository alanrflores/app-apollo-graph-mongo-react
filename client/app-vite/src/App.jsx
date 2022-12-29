
import '@fontsource/roboto/500.css';
import { BrowserRouter, Router, Route, Routes, Outlet } from 'react-router-dom';
import Home from './home/Home';
import ProductForm from './product/ProductForm';
import Landing from './landing/Landing';
import Navbar from './navbar/Navbar';
import Footer from './footer/Footer';
import './App.scss'

function App() {

  const routes = [
    {
      path: '/',
      component: Landing
    },
   {
     path: '/home',
     component: Home
   },
   {
    path: '/about',
    component: ProductForm
  }
  ];
   
  return (
   <>
     <Navbar />
     <Routes>
      {routes?.map(route => (
        // console.log('route', route)
        <Route 
         key={route.path}
         path={route.path}
         element={<route.component />}
        />
      ))}
      </Routes>
      <Footer />
   </>
  )
}

export default App
