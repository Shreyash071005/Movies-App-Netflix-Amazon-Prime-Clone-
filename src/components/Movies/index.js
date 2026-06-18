import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {getYear, toDate, format} from 'date-fns'
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
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        genres: data.movie_details.genres,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        spokenLanguages: data.movie_details.spoken_languages.map(eachLang => ({
          id: eachLang.id,
          englishName: eachLang.english_name,
        })),
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,

        similarMovies: data.movie_details.similar_movies.map(eachMovie => ({
          id: eachMovie.id,
          title: eachMovie.title,
          posterPath: eachMovie.poster_path,
          backdropPath: eachMovie.backdrop_path,
        })),
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
        <img
          src="https://res.cloudinary.com/dactn5non/image/upload/v1781675769/Something_went_Wrong_ukucio.png"
          alt="failure view"
          className="failure-view-img"
        />
        <p className="failure-view-movies-msg">
          Something went wrong. Please try again
        </p>

        <button
          type="button"
          className="failure-view-try-again-btn-movies"
          onClick={this.fetchMovieItemDetailsAPI}
        >
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
              <p className="duration">
                {formatMinutes(moviesDetialsList.runtime)}
              </p>

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

        <div className="movie-details-cards-container">
          <div className="movie-details-card">
            <h1 className="movie-details-cards-label">Genres</h1>
            <ul className="movie-details-card-list-container">
              {moviesDetialsList.genres.map(eachItem => (
                <li key={eachItem.id}>
                  <p className="movie-details-list">{eachItem.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="movie-details-card">
            <h1 className="movie-details-cards-label">Audio Available</h1>
            <ul className="movie-details-card-list-container">
              {moviesDetialsList.spokenLanguages.map(eachItem => (
                <li key={eachItem.id}>
                  <p className="movie-details-list">{eachItem.englishName}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="movie-details-card">
            <div>
              <h1 className="movie-details-cards-label">Rating Count</h1>
              <p className="movie-details-value">
                {moviesDetialsList.voteCount}
              </p>
            </div>

            <div>
              <h1 className="movie-details-cards-label">Rating Average</h1>
              <p className="movie-details-value">
                {moviesDetialsList.voteAverage}
              </p>
            </div>
          </div>

          <div className="movie-details-card">
            <div>
              <h1 className="movie-details-cards-label">Budget</h1>
              <p className="movie-details-value">{moviesDetialsList.budget}</p>
            </div>

            <div>
              <h1 className="movie-details-cards-label">Release Date</h1>
              <p className="movie-details-value">
                {format(new Date(moviesDetialsList.releaseDate), 'dd MMM yyyy')}
              </p>
            </div>
          </div>
        </div>

        <div className="similar-movies-suggestion-container">
          <h1 className="similar-movies-suggestion-title">More like this </h1>

          <ul className="similar-movie-list-container">
            {moviesDetialsList.similarMovies.map(eachMovie => (
              <li key={eachMovie.id} className="similar-movie-list">
                <img
                  src={eachMovie.posterPath}
                  alt={eachMovie.title}
                  className="similar-movie-img"
                />
              </li>
            ))}
          </ul>
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
