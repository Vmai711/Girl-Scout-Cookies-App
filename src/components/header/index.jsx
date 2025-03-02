import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'

import { Avatar, Dropdown, Navbar } from "flowbite-react";

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <Navbar fluid rounded className='fixed top-0 w-[calc(100%-16rem)]'>
        <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Cookie</span>
        </Navbar.Brand>
        <div className="flex md:order-2">
        <Dropdown
            arrowIcon={false}
            inline
            label={
            <Avatar alt="User settings" img="" rounded />
            }
        >
            <Dropdown.Header>
            <span className="block text-sm">John Doe</span>
            <span className="block truncate text-sm font-medium">email@gmail.com</span>
            </Dropdown.Header>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            {/* <Dropdown.Item>Sign out</Dropdown.Item> */}
            {/* Might have to find an alternative way to do this. Could cause potential issues */}
            <Dropdown.Item>
            {
                userLoggedIn
                    ?
                    <>
                        {/* <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-sm text-blue-600 underline'>Logout</button> */}
                        <Dropdown.Item onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-sm text-blue-600 underline'>Logout</Dropdown.Item>
                    </>
                    :
                    <>
                        <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                        <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
                    </>
            }
            </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
        </div>
    </Navbar>
    )
}

export default Header