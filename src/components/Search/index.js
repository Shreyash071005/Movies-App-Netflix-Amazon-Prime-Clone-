import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
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
    searchText: '',
    searchMoviesList: [],
  }

  componentDidMount() {
    this.fetchSearchMovies()
  }

  fetchSearchMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchText} = this.state
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
    if (response.ok === true) {
      const formattedData = data.results.map(eachData => ({
        id: eachData.id,
        title: eachData.title,
        posterPath: eachData.poster_path,
        backdropPath: eachData.backdrop_path,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        searchMoviesList: formattedData,
      })
    }
  }

  render() {
    return (
      <div>
        <Header />
        <h1>Search Route</h1>
      </div>
    )
  }
}

export default Search
