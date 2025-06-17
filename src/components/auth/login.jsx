import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword,doSignInWithGoogle,doSignInWithFacebook } from '../../firebase/auth'
import { useAuth } from '../../contexts/authContext'
const Login = () => {
    const { userLoggedIn} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')
        if(!isSigningIn) {
            setIsSigningIn(true)
            await doSignInWithEmailAndPassword(email, password)
        }
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            // doSignInWithGoogle().catch(err => {
            doSignInWithGoogle().catch(_ => {
                setIsSigningIn(false)
                // console.log(err);
                
            })
        }
    }

     const onFacebookSignIn = async(e) => {
        e.preventDefault()
        setErrorMessage('')
        if (!isSigningIn) {
            setIsSigningIn(true)
            // navigate('/home')
            // doSignInWithGoogle().catch(err => {
            // await doSignInWithFacebook().catch(_=> {
            //     setIsSigningIn(false)
            //     // console.log(err);
                
            // })
            await doSignInWithFacebook(setErrorMessage)
            setIsSigningIn(false)
        }
    }

    // const onFacebookSignIn = (e) => {
    // e.preventDefault();
    // if (!isSigningIn) {
    //     setIsSigningIn(true);
    //     doSignInWithFacebook()
    //     .then(() => {
    //         // Optionally redirect manually if auth context doesn't pick up fast enough
    //         navigate('/home'); 
    //         // OR window.location.href = '/home';
    //     })
    //     .catch((err) => {
    //         console.error("Facebook login error", err);
    //         setIsSigningIn(false);
    //         setErrorMessage("Facebook login failed. Please try again.");
    //     });
    // }
    // };

    
    
    return (
        <div>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}


            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Welcome back</h3>
                        </div>
                    </div>
                    {errorMessage && (
                        <div className="mb-4 text-red-600 font-bold text-center">
                        {errorMessage}
                        </div>
                    )}
                    
                    <form
                        onSubmit={onSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>


                        <div>
                            <div className='flex items-center justify-between'>
                            <label className="text-sm text-gray-600 font-bold">
                                Password
                            </label>
                            <div className="text-sm">
                                <Link to={"/forgot-password"} className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                            </div>
                            </div>
                            <div className='mt-2'>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                            </div>
                        </div>

                        {/* {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )} */}

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="text-center text-sm">Don't have an account? <Link to={'/register'} className="hover:underline font-bold">Sign up</Link></p>
                    <div className='flex flex-row text-center w-full'>
                        <div className='border-b-2 mb-2.5 mr-2 w-full'></div><div className='text-sm font-bold w-fit'>OR</div><div className='border-b-2 mb-2.5 ml-2 w-full'></div>
                    </div>
                    <button
                        disabled={isSigningIn}
                        onClick={(e) => { onGoogleSignIn(e) }}
                        className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium  ${isSigningIn ? 'cursor-not-allowed' : 'hover:bg-gray-100 transition duration-300 active:bg-gray-100'}`}>
                        <i className="mdi mdi-google"></i>
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </button>
                     <button
                        disabled={isSigningIn}
                        onClick={(e) => { onFacebookSignIn(e) }}
                        className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium  ${isSigningIn ? 'cursor-not-allowed' : 'hover:bg-gray-100 transition duration-300 active:bg-gray-100 mt-2'}`}>
                        <i className="mdi mdi-facebook"></i>
                        {isSigningIn ? 'Signing In...' : 'Continue with Facebook'}
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Login