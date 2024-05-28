import React, {useEffect} from "react";
import {ethers} from 'ethers';
import { useAuth0 } from "@auth0/auth0-react";


import {contractABI,contractAddress} from '../utils/constants'
import { useState } from "react";


export const TransactionContext=React.createContext();



const {ethereum}=window;

const getEthereumContract=()=>{
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer= provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI,signer)

    return transactionContract;
}


export const TransactionProvider=({children})=>{

    const [connectedAccount,setConnectedAccount]=useState("");
    const [formData,setFormData]=useState({addressTo:'',amount:"",keyword:"",message:""});

    const {loginWithRedirect,isAuthenticated}=useAuth0();


    const [transactions,setTransaction]=useState([]);

    const [isLoading,setIsLoading]=useState(false);

    const [transactionCount,setTransactionCount]=useState(localStorage.getItem('transactionCount'));

    const handleChange = (e,name) =>{

       setFormData((prevState)=>({ ...prevState,[name]:e.target.value}));
    }

    const getAllTransaction=async()=>{
        
        try {
            if(!ethereum) return alert("install Metamask first");
        
            const transactionContract=getEthereumContract();
            const availableTransactions=await transactionContract.getAllTransactions();

            const structuredTransacTions=availableTransactions.map((transaction)=>({
                addressTo:transaction.receiver,
                addressFrom:transaction.sender,
                timestamp:new Date(transaction.timestamp.toNumber()*1000).toLocaleString(),
                message:transaction.message,
                keyword:transaction.keyword,
                amount:parseInt(transaction.amount._hex)/(10 ** 18)

            }))


            console.log(structuredTransacTions)

            setTransaction(structuredTransacTions);

        
        } catch (error) {
            console.log(error)
        }
    }

    const checkIfWalletIsConnected= async()=>{

        

        try {
             
            if (!ethereum) return alert("please install Metamask");

            const accounts= await ethereum.request({method:'eth_accounts'});
    
    
            if(accounts.length) {
                setConnectedAccount(accounts[0]);
    
                getAllTransaction();
    
            }else{
                console.log("No accounts found");
            }
            
            console.log(accounts)
            
        } catch (error) {

            console.log(error)

            throw new Error("No ethereum object")
            
        }

    }

    const checkifTransactionExise= async()=>{

        try {

            const transactionContract=getEthereumContract();
            const transactionCount=await transactionContract.getTransactionCount();

            console.log(transactionCount)
            
            window.localStorage.setItem("transactionCount",transactionCount)
            
            
        } catch (error) {

            console.log(error)

            throw new Error("No ethereum object")
            
            
        }

    }

    const connectWallet=async()=>{
        try {

            if(!isAuthenticated){
                 alert("please login first before go further")
                 return loginWithRedirect();
            } 
            
            if (!ethereum) return alert("please install Metamask");

            const accounts= await ethereum.request({method:'eth_requestAccounts'});

            setConnectedAccount(accounts[0]);

            window.location.reload()

            checkifTransactionExise();

           

        } catch (error) {

            console.log(error)

            throw new Error("No ethereum object")
            
        }
    }

    const sendTransaction=async()=>{

        try {

            if(!ethereum) return alert("please install metamask");

            const {addressTo,amount,keyword,message}=formData;
            const transactionContract=getEthereumContract();
            const parsedAmount=ethers.utils.parseEther(amount);

            alert("please wait some time your transaction is in process.....")
            

            await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                    from:connectedAccount,
                    to:addressTo,
                    gas:"0x5208", //2100 gey
                    value:parsedAmount._hex, //0.000001
                }]
            });

        const transactionHash=await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword);
        

        setIsLoading(true)

        console.log(isLoading)
       

        console.log(`Loading - ${transactionHash.hash}`)

        

        

        await transactionHash.wait();

        setIsLoading(false)

       
        console.log(`Success - ${transactionHash.hash}`)


        const transactionCount=await transactionContract.getTransactionCount();

        setTransactionCount(transactionCount.toNumber())

        window.location.reload()  

        alert("transaction done Successfully")


        } catch (error) {

            
            console.log(error)

            throw new Error("No ethereum object")
            
        }

    }

    useEffect(()=>{
        checkIfWalletIsConnected();
        checkifTransactionExise();
    },[transactionCount])

    return(
        <TransactionContext.Provider value={{connectWallet,connectedAccount,formData,setFormData,handleChange,sendTransaction,transactions,isLoading}}>
            {children}
        </TransactionContext.Provider>
    )
}


