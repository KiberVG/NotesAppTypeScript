// Navbar component
export default function NavBar() {
    return (
      <nav>
        <div>
          <h1 className="logo">Notes</h1>
        </div>
        <ul className="nav-links">
          <li>
            Home
          </li>
          <li>
            About
          </li>
          <li>
            Contact
          </li>
          <li>
            Login
          </li>
        </ul>
      </nav>
    );
  }