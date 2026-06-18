import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const Header = props => {
  const {match} = props
  const isSearchPage = match.path === '/search'

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

        <nav>
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
          {isSearchPage ? (
            <input
              type="search"
              placeholder="Search"
              className="search-input"
            />
          ) : (
            <Link to="/search" className="search-link">
              <HiOutlineSearch size={24} className="search-icon" />
            </Link>
          )}
        </li>

        <li className="mobile-menu-icon">
          <img
            src="https://res.cloudinary.com/dactn5non/image/upload/v1781536004/add-to-queue_1_bztuwp.png"
            alt="menu"
          />
        </li>

        <li className="desktop-profile-icon">
          <Link to="/account">
            <img
              src="https://res.cloudinary.com/dactn5non/image/upload/v1781679102/Avatar_etsgy9.png"
              alt="profile"
            />
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default withRouter(Header)
