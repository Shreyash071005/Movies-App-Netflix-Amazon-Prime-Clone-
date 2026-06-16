import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {getYear, toDate} from 'date-fns'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

function formatMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours}h ${minutes}m`
}

class Movies extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    moviesDetialsList: {},
  }

  componentDidMount() {
    this.fetchMovieItemDetailsAPI()
  }

  fetchMovieItemDetailsAPI = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {id} = match.params

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies/${id}`,
      options,
    )

    const data = await response.json()

    if (response.ok) {
      const formattedData = {
        title: data.movie_details.title,
        overview: data.movie_details.overview,
        runtime: data.movie_details.runtime,
        releaseDate: data.movie_details.release_date,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
        budget: data.movie_details.budget,
        backdropPath: data.movie_details.backdrop_path,
        genres: data.movie_details.genres,
        spokenLanguages: data.movie_details.spoken_languages,
        similarMovies: data.movie_details.similar_movies,
      }

      this.setState({
        moviesDetialsList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoader = () => (
    <div className="movies-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderLoadingView = () => (
    <>
      <Header />
      {this.renderLoader()}
    </>
  )

  renderFailureView = () => (
    <>
      <Header />

      <div className="failure-view-container">
        <h1>Something Went Wrong</h1>

        <button type="button" onClick={this.fetchMovieItemDetailsAPI}>
          Try Again
        </button>
      </div>
    </>
  )

  renderSuccessView = () => {
    const {moviesDetialsList} = this.state

    return (
      <>
        <div
          className="movie-details-hero"
          style={{
            backgroundImage: `url(${moviesDetialsList.backdropPath})`,
          }}
        >
          <Header />

          <div className="movie-details-content">
            <h1 className="movie-title">{moviesDetialsList.title}</h1>
            <div className="movie-metadata">
              <p>{formatMinutes(moviesDetialsList.runtime)}</p>

              <p className="certificate">
                {moviesDetialsList.adult ? 'A' : 'U/A'}
              </p>

              <p className="release-year">
                {getYear(toDate(new Date(moviesDetialsList.releaseDate)))}
              </p>
            </div>
            <p className="movie-overview">{moviesDetialsList.overview}</p>
            <button type="button">Play</button>
          </div>
        </div>

        <Footer />
      </>
    )
  }

  renderMovieDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return <div className="movie-container">{this.renderMovieDetails()}</div>
  }
}

export default Movies
