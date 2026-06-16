import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css'

const Header = () => (
  <div className="header-container">
    <div>
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dactn5non/image/upload/v1781525514/movies-logo_zz30pd.png"
          alt="website logo"
          className="movies-logo"
        />
      </Link>
    </div>
    <div>
      <ul className="ul-sm-list-container">
        <li>
          <HiOutlineSearch size={24} />
        </li>
        <li>
          <img
            src="https://res.cloudinary.com/dactn5non/image/upload/v1781536004/add-to-queue_1_bztuwp.png"
            alt="add-to-queue"
          />
        </li>
      </ul>
    </div>
  </div>
)

export default Header
