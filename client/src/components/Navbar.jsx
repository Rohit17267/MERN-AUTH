import React from 'react'
import{useNavigate} from 'react-router-dom'
import {assets} from '../assets/assets'
import { useContext } from 'react'
import { AppContent } from '../context/AppContext'
import { toast } from 'react-toastify'


const Navbar = () => {
  const navigate = useNavigate()
  const {userData,setUserData,setIsLoggedin,axios} = useContext(AppContent); 
  
  const sendVerificationOtp =  async ()=>{
     try {
      
      const {data}  = await axios.post('/api/auth/send-verify-otp');

      if(data.success){
        navigate('/email-verify');
        toast.success(data.message)
      }else{
        toast.error(data.message);
      }

     } catch (error) {
      toast.error(error.message);
     }
  }

  const logout = async ()=>{
    try {
      const {data} = await axios.post('/api/auth/logout');
      data.success &&setIsLoggedin(false);
      data.success && setUserData(false);
      navigate('/');
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className=' w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
        <img src={assets.logo} alt="logo" className='w-28 sm:w-32' />
        { userData ? 
        <div className='w-15 h-12 flex justify-center items-center rounded-full bg-black text-white relative group '>
           <p>{userData.name}</p>
           <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                  
                  {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='px-2 py-1 hover:bg-gray-200 cursor-pointer'>Verify email</li>}
                  <li onClick={logout} className='px-2 py-1 hover:bg-gray-200 cursor-pointer pr-10'>Logout </li>
                </ul>
           </div>
        </div> : 
        <button onClick={()=>navigate('/login')}  className='flex items-center gap-2 border  border-gray-500 px-6 py-2 rounded-full text-gray-800 hover:bg-gray-300 transition-all'>login <img src={assets.arrow_icon} alt="" /></button>
        }
    </div>
  )
}

export default Navbar 