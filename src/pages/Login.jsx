import { useState } from "react";
import SlackLogo from "../assets/img/slacklogo.png"

function Login() {
  const [type, setType] = useState('signin');

  if( type === 'signin' ) {
    document.title = 'Login | Slack';
  }
  else if( type === 'signup' ) {
    document.title = 'Create an Account | Slack';
  }

  const handleToggle = (e) => {
    e.preventDefault();
    setType(type === 'signin' ? 'signup' : 'signin');
  }

  return (
    <div className="flex items-center justify-center h-full w-full">
      <form className="flex items-center justify-center flex-col bg-indigo-600 text-indigo-300 w-3/12 h-auto px-12 py-8 rounded-3xl shadow-md shadow-indigo-400 ring-2 ring-offset-indigo-200">
        <img src={SlackLogo} className="h-8 w-auto my-8 fill-white" alt="" />

        {/* For SignIn */}
        {type === "signin" && <>
          <div className="flex flex-col items-center justify-center h-auto w-full">
          <h1 className=" text-3xl font-bold m-2 text-gray-200">
            Sign in to Slack!
          </h1>
          <p className="text-center mt-2">We suggest using the email address you   used to sign up.</p>
        </div>

        <div className="flex flex-col items-start justify-center h-auto w-full">
          <label className="text-sm font-bold m-2 text-gray-200">Email</label>
          <input
            className="border border-gray-400 rounded-md p-2 w-full"
            type="text"
            name="email"
            placeholder="User@slack.com"
          />
        </div>

        <div className="flex flex-col items-start justify-center h-auto w-full">
          <label className="text-sm font-bold m-2 text-gray-200">
            Password
          </label>
          <input
            className="border border-gray-400 rounded-md p-2 w-full"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex flex-col items-start justify-center h-auto w-full">
          <button type="submit" className="text-sm w-full h-12 font-bold my-4 bg-indigo-400 text-indigo-100 rounded-md hover:bg-indigo-300 hover:text-indigo-600 cursor-pointer select-none ">
            Sign In
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-auto w-full">
          <p className="text-center mt-2 mb-8">New to Slack? <button className="text-white underline underline-offset-4" onClick={handleToggle}>Create an account</button></p>
        </div>
        </>}

        {/* For SignUp */}
        {type === "signup" && <>
          <div className="flex flex-col items-center justify-center h-auto w-full">
          <h1 className=" text-3xl font-bold m-2 text-gray-200">
            Create an Account!
          </h1>
          <p className="text-center mt-2">We suggest using the email address you use at work.</p>
        </div>

        <div className="flex flex-col items-start justify-center h-auto w-full">
          <label className="text-sm font-bold m-2 text-gray-200">Email</label>
          <input
            className="border border-gray-400 rounded-md p-2 w-full"
            type="text"
            name="email"
            placeholder="User@slack.com"
          />
        </div>

        <div className="flex flex-col items-start justify-center h-auto w-full">
          <label className="text-sm font-bold m-2 text-gray-200">
            Password
          </label>
          <input
            className="border border-gray-400 rounded-md p-2 w-full"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex flex-col items-start justify-center h-auto w-full">
          <label className="text-sm font-bold m-2 text-gray-200">
            Confirm Password
          </label>
          <input
            className="border border-gray-400 rounded-md p-2 w-full"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex flex-col items-start justify-center h-auto w-full">
          <button type="submit" className="text-sm w-full h-12 font-bold my-4 bg-indigo-400 text-indigo-100 rounded-md hover:bg-indigo-300 hover:text-indigo-600 cursor-pointer select-none ">
            Sign Up
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-auto w-full">
          <p className="text-center mt-2 mb-8">Already have an account? <button className="text-white underline underline-offset-4" onClick={handleToggle}>Sign In</button></p>
        </div>
        </>}

        
      </form>
    </div>
  );
}

export default Login;
{
  /* <button className="text-3xl font-bold m-4 bg-indigo-400 p-6 rounded-xl hover:bg-indigo-600 hover:text-indigo-200 cursor-pointer select-none ">Slack App! hehe</button> */
}
