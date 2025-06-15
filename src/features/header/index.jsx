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
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-lg fixed top-0 left-0 w-full z-50 h-20 rounded-t-lg">
            {/* <div className="text-xl font-bold text-gray-800">
                <Link to="/login">YourAppName</Link>
            </div> */}

            {userLoggedIn ? (
                <div className="flex items-center gap-4 ml-auto">
                <CustomAvatar name={currentUser.displayName || currentUser.email} />

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                    <Button variant="soft">
                        {currentUser.displayName || currentUser.email}
                        <DropdownMenu.TriggerIcon />
                    </Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                    <DropdownMenu.Item
                        onClick={() =>
                        doSignOut().then(() => {
                            navigate("/login");
                        })
                        }
                    >
                        Logout
                    </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                <Link className="text-blue-600 hover:underline" to="/login">
                    Login
                </Link>
                <Link className="text-blue-600 hover:underline" to="/register">
                    Register
                </Link>
                </div>
            )}
            </nav>

    )
}

export default Header


