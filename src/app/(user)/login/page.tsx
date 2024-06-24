import React from 'react'
import LoginForm from './LoginForm'
// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'

const Login = () => {
  // const token= cookies().get('jwtToken')?.value
  // if (token) {
  //   redirect('/')
  // }
  return (
    <section className='fix-height container m-auto px-7 flex items-center justify-center'>
      <div className="m-auto bg-white rounded-lg p-5 w-full md:w-2/3">
        <h1 className='text-3xl font-bold text-gray-800 mb-5'>login in</h1>
        <LoginForm/>
      </div>
    </section>
  )
}

export default Login
