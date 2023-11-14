import React, { useState, useEffect } from 'react';
import { API_URL } from '../constants/Constants';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import SlackLogo from "../assets/img/slacklogo.png"
import { Navigate } from 'react-router-dom';

function SignIn({ handleToggle }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Error Message');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem('user') || null)
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setIsSignedIn(true);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError(true);
      setErrorMessage('Error: Please fill out all fields');
    }

    setLoading(true); //try 

    setTimeout(async () => {
      try {
        const loginCredentials = {
          email,
          password,
        };
        const response = await axios.post(`${API_URL}/auth/sign_in`, loginCredentials);
        const { data, headers } = response;
        if (data && headers) {
          const accessToken = headers["access-token"];
          const expiry = headers["expiry"];
          const client = headers["client"];
          const uid = headers["uid"];
  
          setUser({
            accessToken,
            expiry,
            client,
            uid,
            id: data.data.id,
            email: data.data.email,
            created_at: data.data.created_at,
          });
          setIsSignedIn(true);
        }
      } catch (error) {
        setError(true);
        setErrorMessage('Error: Invalid Credentials');
      }

  
      setLoading(false);
      window.location.reload();
    }, 3000); 
  }

  return (
    <>
      {loading ? ( 
        <div className="flex items-center justify-center h-auto w-full">
          <Loader />
        </div>
      ) : (
        <>
        <img src={SlackLogo} className="h-8 w-auto my-8 fill-white" alt="" />
        <div>
          <div className="flex flex-col items-center justify-center h-auto w-full">
            <h1 className="text-3xl font-bold m-2 text-gray-200">
              Sign in to Slack!
            </h1>
            <p className="text-center mt-2 text-indigo-300">
              We suggest using the email address you used to sign up.
            </p>
          </div>
  
          <div className="flex flex-col items-start justify-center h-auto w-full">
            <label className="text-sm font-bold m-2 text-gray-200">Email</label>
            <input
              className="border border-gray-400 rounded-md p-2 w-full"
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col items-start justify-center h-auto w-full">
            <button
              onClick={handleSubmit}
              className="text-sm w-full h-12 font-bold my-4 bg-indigo-400 text-indigo-100 rounded-md hover:bg-indigo-300 hover:text-indigo-600 cursor-pointer select-none "
            >
              Sign In
            </button>
            {error && (
              <p
                type="submit"
                className="flex flex-col items-center justify-center text-sm w-full h-12 font-bold bg-red-600 bg-opacity-70 outline-red-500 outline outline-2 text-indigo-100 rounded-md hover:brightness-110 select-none"
              >
                {errorMessage}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center justify-center h-auto w-full">
            <p className="text-center mt-2 mb-8 text-indigo-300">
              New to Slack?{' '}
              <button
                className="text-white underline underline-offset-4"
                onClick={handleToggle}
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
        </>
      )}
    </>
  );
}

function SignUp({handleToggle}) {
  const [newUser, setNewUser] = useState({email: "", password: "", passwordConfirmation: "",});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  
  async function handleSignUp(){
    if (isSubmitting) {
      return; 
    }

    if (!newUser.email || !newUser.password || !newUser.passwordConfirmation) {
      setErrorMessage("Error: Please fill out all fields");
      return;
    }
  
    if (newUser.password !== newUser.passwordConfirmation) {
      setErrorMessage("Error: Passwords do not match");
      return;
    }

    setIsSubmitting(true);
  
    const signUpData = {
      email: newUser.email,
      password: newUser.password,
      password_confirmation: newUser.passwordConfirmation,
    };
  
    try {
      const response = await axios.post(`${API_URL}/auth`, signUpData);
      setSuccessMessage("Sign-up successful. Please sign in.");
      setErrorMessage("");
      setIsSubmitting(false);
      if (response.data && response.data.errors && response.data.errors.full_messages) {
        setErrorMessage(response.data.errors.full_messages[0]);
      } else {
        setNewUser({
          email: "",
          password: "",
          passwordConfirmation: "",
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.full_messages) {
        const fullMessages = error.response.data.errors.full_messages;
        if (fullMessages.length > 0) {
          setErrorMessage(fullMessages[0]);
        } else {
          setErrorMessage("Error: Signup failed. Please try again.");
        }
      } else {
        setErrorMessage("Error: Signup failed. Please try again.");
      }
    }
  };
  
  return (
    <>
      <div className="flex flex-col items-center justify-center h-auto w-full">
        <h1 className=" text-3xl font-bold m-2 text-gray-200 text-center">
          Create an Account!
        </h1>
        <p className="text-center mt-2 text-indigo-300">We suggest using the email address you use at work.</p>
      </div>

      <div className="flex flex-col items-start justify-center h-auto w-full">
        <label className="text-sm font-bold m-2 text-gray-200">Email</label>
        <input
          className="border border-gray-400 rounded-md p-2 w-full"
          type="text"
          name="email"
          value={newUser.email}
          onChange={handleFormChange}
          placeholder="User@slack.com"
          onFocus={() => setErrorMessage('')}
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
          value={newUser.password}
          onChange={handleFormChange}
          placeholder="Enter your password"
          onFocus={() => setErrorMessage('')}
        />
      </div>

      <div className="flex flex-col items-start justify-center h-auto w-full">
        <label className="text-sm font-bold m-2 text-gray-200">
          Confirm Password
        </label>
        <input
          className="border border-gray-400 rounded-md p-2 w-full"
          type="password"
          name="passwordConfirmation"
          value={newUser.passwordConfirmation}
          onChange={handleFormChange}
          placeholder="Enter your password"
          onFocus={() => setErrorMessage('')}
        />
      </div>

      <div className="flex flex-col items-start justify-center h-auto w-full">
        <button onClick={handleSignUp} disabled={isSubmitting} className="text-sm w-full h-12 font-bold my-4 bg-indigo-400 text-indigo-100 rounded-md hover:bg-indigo-300 hover:text-indigo-600 cursor-pointer select-none ">
          Sign Up
        </button>

        {errorMessage && (
        <div className="flex flex-col items-center justify-center text-sm w-full h-12 font-bold bg-red-600 bg-opacity-70 outline-red-500 outline outline-2 text-indigo-100 rounded-md hover:brightness-110 select-none">
          {errorMessage}
          </div>
      )}
      {successMessage && (
        <div className="flex flex-col items-center justify-center text-sm w-full h-12 font-bold bg-blue-600 bg-opacity-70 outline-blue-500 outline outline-2 text-indigo-100 rounded-md hover:brightness-110 select-none">
          {successMessage}
          </div>
      )}

      </div>
      <div className="flex flex-col items-center justify-center h-auto w-full">
        <p className="text-center mt-2 mb-8 text-indigo-300">Already have an account? <button className="text-white underline underline-offset-4" onClick={handleToggle}>Sign In</button></p>
      </div>
    </>
  );
}

function Onboarding() {
  const [type, setType] = useState('signin');
  const user = JSON.parse(localStorage.getItem('user') || null)
  

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
    <>
      {user && (<Navigate to="/" />)}
      <div className="flex items-center justify-center h-full w-full ">
        <div className="flex items-center justify-center flex-col bg-indigo-600  w-3/12 h-auto px-12 py-8 rounded-3xl shadow-md shadow-indigo-400 ring-2 ring-offset-indigo-200">
          {/* For SignIn */}
          {type === "signin" && <SignIn handleToggle={handleToggle} />}   
          {/* For SignUp */}     
          {type === "signup" && <SignUp handleToggle={handleToggle} />}
        </div>
      </div>
    </>
  );
}


export default Onboarding;