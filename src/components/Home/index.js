import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {RiAlertFill} from 'react-icons/ri'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
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

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
}

const jwtToken = Cookies.get('jwt_token')

const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  },
}

class Home extends Component {
  // State
  state = {
    trendingMoviesList: [],
    originalsMoviesList: [],
    trendingApiStatus: apiStatusConstants.initial,
    originalsApiStatus: apiStatusConstants.initial,
    isLoading: true,
  }

  // Intial Mount
  componentDidMount() {
    this.fetchMoviesData()
  }

  // Fetching Trending Movies Data
  fetchTrendingMoviesData = async () => {
    this.setState({
      trendingApiStatus: apiStatusConstants.inProgress,
    })
    const trendingMoviesResponse = await fetch(
      'https://apis.ccbp.in/movies-app/trending-movies',
      options,
    )

    const dataTrendingMoviesResponse = await trendingMoviesResponse.json()

    if (trendingMoviesResponse.ok === true) {
      const formatedData = dataTrendingMoviesResponse.results.map(eachData => ({
        id: eachData.id,
        title: eachData.title,
        posterPath: eachData.poster_path,
        backdropPath: eachData.backdrop_path,
        overview: eachData.overview,
      }))

      this.setState({
        trendingMoviesList: formatedData,
        trendingApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({trendingApiStatus: apiStatusConstants.failure})
    }
  }

  // Fetching Originals Movies Data
  fetchOriginalsMovies = async () => {
    this.setState({
      originalsApiStatus: apiStatusConstants.inProgress,
    })
    const originalsResponse = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
      options,
    )

    const dataOriginalsMoviesList = await originalsResponse.json()

    if (originalsResponse.ok === true) {
      const formatedData = dataOriginalsMoviesList.results.map(eachData => ({
        id: eachData.id,
        title: eachData.title,
        posterPath: eachData.poster_path,
        backdropPath: eachData.backdrop_path,
        overview: eachData.overview,
      }))

      this.setState({
        originalsMoviesList: formatedData,
        originalsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({originalsApiStatus: apiStatusConstants.failure})
    }
  }

  // Inital Call for Trending Movies Data and Originals Movies Data
  fetchMoviesData = async () => {
    this.setState({isLoading: true})

    await this.fetchTrendingMoviesData()
    await this.fetchOriginalsMovies()

    this.setState({isLoading: false})
  }

  // Render Failure View
  renderFailureView = (retry, btnCSS, errorTextCSS, alertIconCSS) => (
    <div className="failure-container">
      <RiAlertFill className={alertIconCSS} />
      <p className={errorTextCSS}>Something went wrong. Please try again</p>
      <button type="button" className={btnCSS} onClick={retry}>
        Try Again
      </button>
    </div>
  )

  // Rnder Hero Section
  renderHeroSection = () => {
    const {originalsMoviesList, originalsApiStatus} = this.state

    let content
    let heroSectionStyle = {}

    switch (originalsApiStatus) {
      case apiStatusConstants.inProgress:
        content = (
          <div className="section-loader-container">
            {this.renderLoader('hero-loader-container')}
          </div>
        )
        break

      case apiStatusConstants.failure:
        content = (
          <div className="section-failure-container">
            {this.renderFailureView(
              this.fetchOriginalsMovies,
              'try-again-hero-btn',
              'error-hero-text',
              'alert-hero-icon',
            )}
          </div>
        )
        break

      case apiStatusConstants.success: {
        const randomIndex = Math.floor(
          Math.random() * originalsMoviesList.length,
        )

        const selectedMovie = originalsMoviesList[randomIndex]

        heroSectionStyle = {
          backgroundImage: `url(${selectedMovie.backdropPath})`,
        }

        content = (
          <div className="hero-content">
            <h1 className="hero-section-movie-title">{selectedMovie.title}</h1>

            <p className="hero-section-movie-overview">
              {selectedMovie.overview}
            </p>

            <button type="button" className="play-btn">
              Play
            </button>
          </div>
        )
        break
      }

      default:
        content = null
    }

    return (
      <div className="hero-section" style={heroSectionStyle}>
        <Header />
        {content}
      </div>
    )
  }
  // renderHeroSection = () => {
  //   const {originalsMoviesList, originalsApiStatus} = this.state

  //   switch (originalsApiStatus) {
  //     case apiStatusConstants.inProgress:
  //       return (
  //         <div className="loader-container">
  //           <Header />
  //           {this.renderLoader('hero-loader-container')}
  //         </div>
  //       )

  //     case apiStatusConstants.failure:
  //       return (
  //         <>
  //           <Header />
  //           <div className="section-failure-container">
  //             {this.renderFailureView(
  //               this.fetchOriginalsMovies,
  //               'try-again-hero-btn',
  //               'error-hero-text',
  //               'alert-hero-icon',
  //             )}
  //           </div>
  //         </>
  //       )

  //     case apiStatusConstants.success: {
  //       const index = Math.floor(Math.random() * originalsMoviesList.length)

  //       return (
  //         <div
  //           className="hero-section"
  //           style={{
  //             backgroundImage: `url(${originalsMoviesList[index].backdropPath})`,
  //           }}
  //         >
  //           <Header />
  //           <div className="hero-content">
  //             <h1 className="hero-section-movie-title">
  //               {originalsMoviesList[index].title}
  //             </h1>

  //             <p className="hero-section-movie-overview">
  //               {originalsMoviesList[index].overview}
  //             </p>

  //             <button type="button" className="play-btn">
  //               Play
  //             </button>
  //           </div>
  //         </div>
  //       )
  //     }

  //     default:
  //       return null
  //   }
  // }

  // Render Trending Movies
  renderTrendingNowMovies = () => {
    const {trendingMoviesList, trendingApiStatus} = this.state

    let content
    let contentCss

    switch (trendingApiStatus) {
      case apiStatusConstants.inProgress:
        contentCss = 'trending-content-container'
        content = (
          <div className="loader-container">
            {this.renderLoader('trending-now-loader-container')}
          </div>
        )
        break

      case apiStatusConstants.failure:
        contentCss = 'trending-content-container'
        content = (
          <div className="movies-failure-container">
            {this.renderFailureView(
              this.fetchTrendingMoviesData,
              'try-again-movies-btn',
              'error-movies-text',
              'alert-movies-icon',
            )}
          </div>
        )
        break

      case apiStatusConstants.success:
        contentCss = 'success-trending-conten-container'
        content = (
          <Slider {...settings}>
            {trendingMoviesList.map(eachMovie => {
              const {id, posterPath, title} = eachMovie

              return (
                <div key={id}>
                  <Link to={`/movies/${id}`}>
                    <div className="trainding-movie-card">
                      <img
                        src={posterPath}
                        alt={title}
                        className="trainding-movie-card-img"
                      />
                    </div>
                  </Link>
                </div>
              )
            })}
          </Slider>
        )
        break

      default:
        content = null
    }

    return (
      <div className="trainding-now-movies-container">
        <div className={contentCss}>
          <h1 className="trainding-now-movies-heading">Trending Now</h1>
          {content}
        </div>
      </div>
    )
  }

  // Render Originals Movies
  renderOriginalsMovies = () => {
    const {originalsMoviesList, originalsApiStatus} = this.state

    let content
    let contentCss

    switch (originalsApiStatus) {
      case apiStatusConstants.inProgress:
        contentCss = 'trending-content-container'
        content = (
          <div className="loader-container">
            {this.renderLoader('trending-now-loader-container')}
          </div>
        )
        break

      case apiStatusConstants.failure:
        contentCss = 'trending-content-container'
        content = (
          <div className="movies-failure-container">
            {this.renderFailureView(
              this.fetchOriginalsMovies,
              'try-again-movies-btn',
              'error-movies-text',
              'alert-movies-icon',
            )}
          </div>
        )
        break

      case apiStatusConstants.success:
        contentCss = 'success-trending-conten-container'
        content = (
          <Slider {...settings}>
            {originalsMoviesList.map(eachMovie => {
              const {id, posterPath, title} = eachMovie

              return (
                <div key={id}>
                  <Link to={`/movies/${id}`}>
                    <div className="trainding-movie-card">
                      <img
                        src={posterPath}
                        alt={title}
                        className="trainding-movie-card-img"
                      />
                    </div>
                  </Link>
                </div>
              )
            })}
          </Slider>
        )
        break

      default:
        content = null
    }

    return (
      <div className="trainding-now-movies-container">
        <div className={contentCss}>
          <h1 className="trainding-now-movies-heading">Originals</h1>
          {content}
        </div>
      </div>
    )
  }

  // Render Loader
  renderLoader = loaderClassName => (
    <div className={loaderClassName} data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  // Render Method
  render() {
    const {isLoading} = this.state

    return (
      <div className="home-container">
        <div className="home-content">
          {isLoading ? (
            <>
              <Header />
              {this.renderLoader('movies-loader-container')}
            </>
          ) : (
            <>
              {this.renderHeroSection()}
              {this.renderTrendingNowMovies()}
              {this.renderOriginalsMovies()}
            </>
          )}
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
