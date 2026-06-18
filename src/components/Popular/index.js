import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {
    apiStatusPopularMovies: apiStatusConstants.initial,
    popularMoviesList: [],
  }

  componentDidMount() {
    this.fetchPopularMovies()
  }

  fetchPopularMovies = async () => {
    this.setState({apiStatusPopularMovies: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
      options,
    )
    const data = await response.json()

    if (response.ok === true) {
      const formattedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        title: eachMovie.title,
        posterPath: eachMovie.poster_path,
        backdropPath: eachMovie.backdrop_path,
      }))
      this.setState({
        apiStatusPopularMovies: apiStatusConstants.success,
        popularMoviesList: formattedData,
      })
    } else {
      this.setState({apiStatusPopularMovies: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="popular-movies-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

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
          onClick={this.fetchPopularMovies}
        >
          Try Again
        </button>
      </div>
    </>
  )

  rednerSuccessView = () => {
    const {popularMoviesList} = this.state
    return (
      <>
        <ul className="popular-movies-list-container">
          {popularMoviesList.map(eachMovie => (
            <li className="popular-movies-card-list" key={eachMovie.id}>
              <Link to={`/movies/${eachMovie.id}`}>
                <img
                  src={eachMovie.posterPath}
                  alt={eachMovie.title}
                  className="popular-movies-card-img"
                />
              </Link>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderPopularMoviesContainer = () => {
    const {apiStatusPopularMovies} = this.state

    switch (apiStatusPopularMovies) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.success:
        return this.rednerSuccessView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-movies-container">
        <Header />
        <div className="popular-movies-content-container">
          {this.renderPopularMoviesContainer()}
        </div>
        <Footer />
      </div>
    )
  }
}
export default Popular
