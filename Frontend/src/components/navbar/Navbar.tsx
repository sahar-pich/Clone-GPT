import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <nav id="navbar">
            <span id="brand">Clone-GPT</span>
            <div id="nav-links">
                <NavLink to="/" className="nav-link">Chat</NavLink>
                <NavLink to="/about" className="nav-link">About</NavLink>
            </div>
        </nav>
    )
}

export default Navbar