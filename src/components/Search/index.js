import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchMoviesList: [],
    searchValue: '',
  }

  fetchSearchMovies = async searchText => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`,
      options,
    )

    const data = await response.json()

    if (response.ok) {
      const formattedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        title: eachMovie.title,
        posterPath: eachMovie.poster_path,
        backdropPath: eachMovie.backdrop_path,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        searchMoviesList: formattedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  // Input Value of Search in State
  onChnageSearch = event => {
    this.setState({searchValue: event.target.value})
  }

  // Call Search Api
  onClickSearchBtn = () => {
    const {searchValue} = this.state
    this.fetchSearchMovies(searchValue)
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  // Render Failure View
  renderFailureView = () => (
    <>
      <div className="failure-view-container">
        <img
          src="https://res.cloudinary.com/dactn5non/image/upload/v1781675769/Something_went_Wrong_ukucio.png"
          alt="failure view"
          className="failure-view-img"
        />
        <p className="failure-view-popular-movies-msg">
          Something went wrong. Please try again
        </p>

        <button
          type="button"
          className="failure-view-try-again-btn-popular-movies"
          onClick={this.fetchSearchMovies}
        >
          Try Again
        </button>
      </div>
    </>
  )

  renderSuccessView = userSearchInput => {
    const {searchMoviesList} = this.state

    if (searchMoviesList.length === 0) {
      return (
        <div className="movie-not-found-container">
          <img
            src="https://res.cloudinary.com/dactn5non/image/upload/v1781781438/Group_7394_rzjv2e.png"
            alt="failure view"
            className="movie-not-found-img"
          />
          <p className="movie-not-found-text">{`Your search for ${userSearchInput} did not find any matches.`}</p>
        </div>
      )
    }

    return (
      <ul className="success-view-movies-card-content">
        {searchMoviesList.map(eachData => (
          <li key={eachData.id} className="movies-card">
            <Link to={`/movies/${eachData.id}`}>
              <img
                src={eachData.posterPath}
                alt={eachData.title}
                className="movie-card-img"
              />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  renderSearchContainer = userSearchInput => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessView(userSearchInput)
      default:
        return null
    }
  }

  render() {
    const {match} = this.props
    const {searchValue} = this.state
    return (
      <div className="search-container">
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
                      match.path === '/'
                        ? 'nav-link active-nav-link'
                        : 'nav-link'
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
              <div className="search-input-container">
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  onChange={this.onChnageSearch}
                  value={searchValue}
                />

                <button
                  type="button"
                  className="search-btn"
                  onClick={this.onClickSearchBtn}
                >
                  <HiOutlineSearch size={24} />
                </button>
              </div>
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
        {this.renderSearchContainer()}
      </div>
    )
  }
}

export default Search
