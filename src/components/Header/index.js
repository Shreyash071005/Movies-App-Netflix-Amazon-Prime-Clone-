import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch, HiX} from 'react-icons/hi'
import './index.css'

const Header = props => {
  const {match} = props
  const [menuOpen, setMenuOpen] = useState(false)

  const close = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dactn5non/image/upload/v1781525514/movies-logo_zz30pd.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li>
              <Link
                to="/"
                className={
                  match.path === '/' ? 'nav-link active-nav-link' : 'nav-link'
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/popular"
                className={
                  match.path === '/popular'
                    ? 'nav-link active-nav-link'
                    : 'nav-link'
                }
              >
                Popular
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <ul className="header-actions">
        <li>
          <Link to="/search" className="search-link">
            <button
              type="button"
              className="search-icon-btn"
              data-testid="searchButton"
            >
              <HiOutlineSearch size={24} className="search-icon" />
            </button>
          </Link>
        </li>

        {/* Hamburger icon — mobile only */}
        <li className="mobile-menu-icon">
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <img
              src="https://res.cloudinary.com/dactn5non/image/upload/v1781536004/add-to-queue_1_bztuwp.png"
              alt="menu"
            />
          </button>
        </li>

        {/* Profile icon — desktop only */}
        <li className="desktop-profile-icon">
          <Link to="/account">
            <img
              src="https://res.cloudinary.com/dactn5non/image/upload/v1781679102/Avatar_etsgy9.png"
              alt="profile"
            />
          </Link>
        </li>
      </ul>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div className="mobile-nav-drawer">
          <ul className="mobile-nav-links">
            <li>
              <Link to="/" className="mobile-nav-link" onClick={close}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/popular" className="mobile-nav-link" onClick={close}>
                Popular
              </Link>
            </li>
            <li>
              <Link to="/account" className="mobile-nav-link" onClick={close}>
                Account
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="close-menu-btn"
            onClick={close}
            aria-label="Close menu"
          >
            <HiX size={28} />
          </button>
        </div>
      )}
    </header>
  )
}

export default withRouter(Header)
