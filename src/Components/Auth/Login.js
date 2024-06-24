import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../Redux/authSlice';
import { toast } from 'react-toastify';
import dance from '../../assets/dance.svg';
import { Link } from 'react-router-dom';
const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(signInUser({ email, password })).then((result) => {
        console.log(result)
        if (result.payload.email) {
          window.location.href="/" 
        } else {
          toast.error('Invalid credentials. Please try again.');
        }
      });
    } else {
      toast.error('Please enter email and password.');
    }
  };

  return (
    <div className="flex w-full p-[40px]">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
          <h1 className="text-5xl font-semibold">Welcome Back</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Welcome back! Please enter your details.
          </p>
          <div className="mt-8">
            <div className="flex flex-col">
              <label className="text-lg font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your password"
                type="password"
              />
            </div>

            <div className="mt-8 flex flex-col gap-y-4">
              <button
                onClick={handleLogin}
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-blue-500 rounded-xl text-white font-bold text-lg"
              >
                Sign in
              </button>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="font-medium text-base">Don't have an account?</p>
              <Link to="/signup" className="ml-2 font-medium text-base text-blue-500">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden relative w-1/2 h-inherit lg:flex items-center justify-center bg-gray-200">
        <div className="w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-blue-500 to-pink-500 animate-spin" />
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
        <img
          data-aos-once="true"
          src={dance}
          alt="dancer img"
          className="w-[200px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
        />
      </div>
    </div>
  );
};

export default Login;
