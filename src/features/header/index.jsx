import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'
import { DropdownMenu,Button } from '@radix-ui/themes'
import CustomAvatar from '../../components/ui/CustomAvatar'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn,currentUser } = useAuth()
    return (
        <nav className='flex flex-row gap-2 w-full z-20 fixed top-0 left-0 h-20 items-center justify-end'>
            {
                userLoggedIn
                    ?
                    <>
                    {/* set image based auth method : customavatar or if providers use photoUrl */}
                        {/* <img src={currentUser.photoURL} alt="photo-url" className="w-20 h-20 rounded-full mt-4" /> */}
                         <CustomAvatar name={currentUser.displayName || currentUser.email}/>
                         <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Button variant='soft'>
                                    {currentUser.displayName || currentUser.email}
                                <DropdownMenu.TriggerIcon/>
                                </Button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.Separator/>
                                <DropdownMenu.Item onClick={() => { doSignOut().then(() => { navigate('/login') }) }}>
                                    Logout
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>

                        </DropdownMenu.Root>
                        
                    </>
                    :
                    <>
                        <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                        <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
                    </>
            }

        </nav>
    )
}

export default Header