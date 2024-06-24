"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

const LogoutButton = () => {
    const router=useRouter()
    const logoutHandler = async () => {
        try {
            await axios.get('https://next-six-fawn.vercel.app/api/users/logout')
            router.push('/')
            router.refresh()
        } catch (error) {
            toast.warning("Something went wrong")
            console.log(error)
        }
    }
  return (
    <button className='bg-gray-700 text-gray-200 px-4 py-2 rounded' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutButton