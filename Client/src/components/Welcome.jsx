import {AiFillPlayCircle} from 'react-icons/ai'
import {SiEthereum} from 'react-icons/si'
import {BsInfoCircle} from 'react-icons/bs'
import { TransactionContext } from '../context/TransactionContext'

import { Loader} from '../components'
import { shortenAddress } from '../utils/shoertenAddress'
import { useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver';



const commonStyles='min-h-[70px] sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-500 text-white';


export const Input=({placeholder,name,type,value,handleChange})=>(
      
     <input

     placeholder={placeholder}
     type={type}
     step="0.0001"
     value={value}
     onChange={(e)=>handleChange(e,name)}
     className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white  border-none border-[0.5px] text-sm white-glassmorphism'
     
     />

)



const Welcome = () => {

   useIntersectionObserver('.Onhidden');

  const {connectWallet,connectedAccount,formData,handleChange,sendTransaction,isLoading}=useContext(TransactionContext);

  const { loginWithRedirect, isAuthenticated} = useAuth0();

  
  
  const handleSubmit=(e)=>{

      const {addressTo,amount,keyword,message}=formData;

      e.preventDefault();

      if(!addressTo || !keyword || !amount || !message) return;

      if(isAuthenticated){
            sendTransaction();
      }
      else{
            alert("for forword action  please login first");
            loginWithRedirect();

      }

  }


  return (
    <div className='flex w-full justify-center items-center Onhidden '>
    <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
      <div className='flex flex-1 justify-start flex-col mf:mr-10 part-1 '>
       <h1 className='text-3xl sm:text-5xl text-white py-1 text-gradient'>
        Send Crypto <br/> across the World
       </h1>
       <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base text-gradient'>
        Explore the crypto world. Buy and sell crypto currencies easily on krypto.
       </p>
       {!connectedAccount && (<button
        type='button'
        onClick={connectWallet}
        className='flex flex-row justify-center items-center Onhidden my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]'>
          <p className='text-white text-base font-semibold '>Connect Wallet</p>         
       </button>)}

       <div className="grid sm:grid-cols-3  grid-cols-2 w-full mt-10 Onhidden">

        <div className={`rounded-tl-2xl ${commonStyles}`}>
              Reliability
        </div>
        <div className={`${commonStyles}`}>
              Security
        </div>
        <div className={`rounded-tr-2xl ${commonStyles}`}>
              Ethereum
        </div>
        <div className={`rounded-bl-2xl ${commonStyles}`}>
              Web 3.0
        </div>
        <div className={`${commonStyles}`}>
              Low fees
        </div>
        <div className={`rounded-br-2xl ${commonStyles}`}>
              Blockchain
        </div>
       </div>
      </div>

      <div className="flex flex-col flex-1 justify-start items-center w-full mf:mt-0  mt-10  Onhidden part-2">
           <div className='p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism part-1'>
            <div className='flex justify-between flex-col w-full h-full '>
                  <div className='flex  justify-between items-start'>
                        <div className='w-10 h-10 rounded-full border-2 border-white flex justify-center items-center'>
                              <SiEthereum fontSize={21} color='#fff'/>

                        </div>
                        <BsInfoCircle fontSize={17} color='#fff'/>
                  </div>

                  <div>
                        <p className='text-white font-light text-sm'>
                              {shortenAddress(connectedAccount)}
                        </p>
                        <p className='text-white font-semibold text-sm mt-1'>
                             Ethereum
                        </p>
                  </div>
                  
            </div>
            </div>  

            <div className="p-5 sm:w-full w-full flex flex-col justify-start items-center blue-glassmorphism Onhidden part2">
                 <Input placeholder='Address To' name='addressTo' type="text" handleChange={handleChange}
                 />
                 <Input placeholder='Amount (ETH)' name='amount' type="number" handleChange={handleChange}
                 />
                 <Input placeholder='Keyword (GIF)' name='keyword' type="text" handleChange={handleChange}
                 />
                 <Input placeholder='Enter Message' name='message' type="text" handleChange={handleChange}
                 />

                 <div className='h-[1px] w-full bg-gray-400 my-2'></div>

                 {isLoading ? (
                  <Loader/>
                 ): (
                   <button
                     type="button"
                     onClick={handleSubmit}
                     className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer'
                   >
                     Send Now
                   </button>     )
                 }
            </div>
      </div>

      
    </div>
    </div>
  )
}

export default Welcome
