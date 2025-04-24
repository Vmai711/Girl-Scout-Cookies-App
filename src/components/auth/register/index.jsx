// Add new imports
import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';

const Register = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!name.trim()) {
            setErrorMessage('Name is required.');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password, ['parent-scout'], name, phone);
                navigate('/home');
            } catch (error) {
                setIsRegistering(false);
                if (error.code === 'auth/invalid-email') {
                    setErrorMessage('Invalid email address.');
                } else if (error.code === 'auth/email-already-in-use') {
                    setErrorMessage('Email already in use.');
                } else {
                    setErrorMessage('An unexpected error occurred. Please try again.');
                }
            }
        }
    };

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main className="w-full h-screen flex items-center justify-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center mb-6">
                        <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Create a New Account</h3>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-gray-600">Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-600">Phone (optional)</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-600">Email</label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-2 px-3 py-2 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-600">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                disabled={isRegistering}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-2 px-3 py-2 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-600">Confirm Password</label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                disabled={isRegistering}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full mt-2 px-3 py-2 border rounded-lg"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>

                        <div className="text-sm text-center">
                            Already have an account?{' '}
                            <Link to={'/login'} className="font-bold hover:underline">Continue</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Register;
