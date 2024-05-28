import logo from '../assets/images/logo.png'
import useIntersectionObserver from '../hooks/useIntersectionObserver';


import React from 'react'

const Footer = () => {

  useIntersectionObserver('.Onhidden');

  return (
    
      <div className='w-full flex md:justify-center justify-between items-center flex-col p-4  bottom-0 gradient-bg-footer .Onhidden'>
      <div className='w-full flex sm:flex-row flex-col justify-between items-center m-4'>
       <div className='flex flex-[0.5] justify-center items-center'>
       <img
        src={logo}
        alt='logo'
        className='w-32'/>
       </div>
       <div className='flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full'>
        <p className='text-white text-base text-center mx-2 cursor-pointer'><a href='https://buy.bitcoin.com/eth/'>Market</a></p>
        <p className='text-white text-base text-center mx-2 cursor-pointer'><a href='https://www.youtube.com/watch?v=4cRXEGduA-o&list=PL6gx4Cwl9DGBrtymuJUiv9Lq5CAYpN8Gl'>Tutorials</a></p>
        <p className='text-white text-base text-center mx-2 cursor-pointer'><a href='https://buy.bitcoin.com/eth/'>Exchange</a></p>
        <p className='text-white text-base text-center mx-2 cursor-pointer'><a href='https://ethereum.org/en/wallets/'>Wallets</a></p>

       </div>
      </div>

      <div className='flex justify-center items-center flex-col mt-5'>
       <p className='text-white text-sm text-center '>Come & join use</p>
       <p className='text-white text-sm text-center '>info-@cryptomastry.com</p>

      </div>
      <div className='sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5'></div>
      <div className='sm:w-[90%]  w-full justify-between items-center mt-3 '>
      <p className='text-white text-sm text-center '>@kryptomastry 2024</p>
      <p className='text-white text-sm text-center '>All rights reserved</p>

      </div>
    </div>
     
  )
}

export default Footer