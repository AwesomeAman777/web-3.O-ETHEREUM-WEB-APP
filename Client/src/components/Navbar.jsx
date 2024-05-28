import {HiMenuAlt4} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'
import logo from '../assets/images/logo.png'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'


const NavbarItem =({title,classProps,user,isAuthenticated}) => {



  let NavURL=undefined;

  switch (title) {
    case "Market":
      NavURL="https://buy.bitcoin.com/eth/"
      break;
    case "Exchange":
        NavURL="https://buy.bitcoin.com/eth/"
        break;
    case "Tutorials":
          NavURL="https://www.youtube.com/watch?v=4cRXEGduA-o&list=PL6gx4Cwl9DGBrtymuJUiv9Lq5CAYpN8Gl"
          break;
    case "Wallets":
          NavURL="https://ethereum.org/en/wallets/"
          break;  
    default:
          NavURL=undefined
         break;
  }

  return(
    <li className={`mx-4 cursor-pointer ${classProps}`}>
      <a href={NavURL} target='_blank'>{title}</a>
    </li>
  )

}

const Navbar = ({}) => {

  const { loginWithRedirect,logout, isAuthenticated, isLoading,user} = useAuth0();
  

  const [toggleMenu,setToggleMenu]=useState(false);

  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>
    <div className='md:flex-[0.5] flex-initial justify-center items-center'>
      <img src={logo} className='w-32 cursor-pointer ' />
    </div>
     <ul className='text-white md:flex hidden flex-row justify-between items-center flex-initial'>
       {["Market",'Exchange','Tutorials','Wallets'].map((item,index)=>(
        <NavbarItem key={item+index} title={item}/>
       ))}
      {!isAuthenticated ?(<button type='button'  
      className='bg-[#2952e3] py-1 px-6 my-2 rounded-full cursor-pointer hover:bg-[#2546bd] md:px-4'
      onClick={()=>loginWithRedirect()}>
         Login
     </button>):
     (<button type='button'  
      className='bg-[#0c31b8] py-1 px-6 my-2 rounded-full cursor-pointer hover:bg-[#2546bd] md:px-4'
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
         Log out
     </button>
      )}

      {
        isAuthenticated && (
          <h1 className='text-base text-sky-700 font-bold underline ml-4 '>{user.name}</h1>
        )
      }
    
     </ul>
      
     <div className='flex relative  '>
      {toggleMenu 
        ? <AiOutlineClose  fontSize={20} className='text-white md:hidden cursor-pointer 'onClick={()=>setToggleMenu(false)}/>
        : <HiMenuAlt4 fontSize={20} className='text-white md:hidden cursor-pointer 'onClick={()=>setToggleMenu(true)}/> }
      {toggleMenu && (
          <ul
           className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none 
           flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'
          >
          <li className='text-xl w-full my-2'>
              <AiOutlineClose onClick={()=>setToggleMenu(false)} className='cursor-pointer'/>
          </li>
          <li>{
            isAuthenticated && (
              <h1 className='text-base text-sky-700 font-bold underline ml-4 '>{user.name}</h1>
            )}</li>
            {["Market",'Exchange','Tutorials','Wallets'].map((item,index)=>(
             <NavbarItem key={item+index} title={item} classProps="my-2 text-lg"/>
        ))}
              {!isAuthenticated ?(<button type='button'  
          className='bg-[#2952e3] py-1 px-6 my-2 rounded-full cursor-pointer hover:bg-[#2546bd] md:px-4'
          onClick={()=>loginWithRedirect()}>
            Login
        </button>):
        (<button type='button'  
          className='bg-[#0c31b8] py-1 px-6 my-2 rounded-full cursor-pointer hover:bg-[#2546bd] md:px-4'
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log out
        </button>
          )}
           
          </ul>
        )
        }
     </div>
   </nav>
  )
}


export default Navbar
