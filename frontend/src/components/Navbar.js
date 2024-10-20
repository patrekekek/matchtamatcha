import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

import logoLight from '../images/main-logo-light.jpeg'

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();


    const handleLogout = () => {
        logout();
    }


    return (
        <header>
            <div className="nav-container">
                <Link to="/">
                    <img src={logoLight} alt="logo" className="navbar-logo" />
                </Link>

                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleLogout}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;