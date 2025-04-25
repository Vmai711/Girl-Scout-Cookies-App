import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import { useUserRole } from '../../firebase/roleUtils';

import { Avatar, Dropdown, Navbar } from "flowbite-react";

const Header = ({ page }) => {
    const navigate = useNavigate();
    const { userLoggedIn, currentUser } = useAuth();
    const { currentRole } = useUserRole(); // Destructure both roles and mainRole

    return (
        <Navbar fluid rounded className='top-1 w-100 justify-right'>
            <Navbar.Brand>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white ml-auto">{page}</span>
            </Navbar.Brand>
            <div className="flex md:order-2 relative z-50">
                <div className="relative">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={<Avatar alt="User settings" img="" rounded />}
                        className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md z-[9999] overflow-visible"
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{currentUser?.displayName || 'User'}</span>
                            <span className="block truncate text-sm font-medium">{currentUser?.email}</span>
                            {/* Display the mainRole (current role) */}
                            <span className="block text-xs text-gray-500">{currentRole || 'Loading role...'}</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                            {
                                userLoggedIn
                                    ?
                                    <>
                                        {/* Logout option */}
                                        <Dropdown.Item
                                            onClick={() => {
                                                doSignOut().then(() => {
                                                    navigate('/login');
                                                });
                                            }}
                                            className='text-sm text-blue-600 underline'
                                        >
                                            Logout
                                        </Dropdown.Item>
                                    </>
                                    :
                                    <>
                                        {/* Login/Register options */}
                                        <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                                        <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
                                    </>
                            }
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
        </Navbar>
    );
};

export default Header;
