import {BsShieldFillCheck} from 'react-icons/bs'
import {BiSearchAlt} from 'react-icons/bi'
import {RiHeart2Fill } from 'react-icons/ri'
import useIntersectionObserver from '../hooks/useIntersectionObserver';




const ServiceCard=({color,title,icons,subtitle})=>(
 <div className='flex flex-row  justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl Onhidden '>
    
     <div  className={`w-10 h-10 flex rounded-full justify-center items-center ${color}`}>
     {icons} 
    </div>
    <div className="ml-5 flex- flex-col flex-1">

      <h1 className='mt-2 text-white text-lg '>{title}</h1>
       <p className='mt-2 text-white text-sm md:w-9/12  '>{subtitle}</p>
    </div>
 
 </div>
)








const Services = () => {

  useIntersectionObserver('.Onhidden');

  return (
    <div className='flex  flex-col md:flex-row w-full justify-center items-center gradient-bg-services services '>
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4 Onhidden">
       <div className='flex-1 flex flex-col items-start '>

        <h1 className='text-white text-3xl sm:text-5xl py-2 '>
           services that we
           <br/>
           continue to Imporove
        </h1>

       </div>
      </div>
      <div className='flex-1 flex-col flex justify-start items-center '> 
        <ServiceCard 
          color='bg-[#295283]'
          title="Security Guranteed"
          icons={<BsShieldFillCheck fontSize={25} className='text-white'/>}
          subtitle="Security is guranted . we alsways maintain privacy and maintain the quality of our product"     
        />
        <ServiceCard 
          color='bg-[#8945F8]'
          title="Best Exchange Rates"
          icons={<BiSearchAlt fontSize={25} className='text-white'/>}
          subtitle="Security is guranted . we alsways maintain privacy and maintain the quality of our product"     
        />
        <ServiceCard 
          color='bg-[#F84550]'
          title="Fastest Transaction"
          icons={<RiHeart2Fill fontSize={25} className='text-white'/>}
          subtitle="Security is guranted . we alsways maintain privacy and maintain the quality of our product"     
        />
      </div>
    </div>
  )
}

export default Services
