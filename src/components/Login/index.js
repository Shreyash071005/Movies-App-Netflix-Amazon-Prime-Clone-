import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChnagePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    this.setState({showError: false, errorMsg: ''})
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 7})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dactn5non/image/upload/v1781525514/movies-logo_zz30pd.png"
          alt="login website logo"
          className="movies-logo"
        />

        <div className="login-details-container">
          <form className="login-form" onSubmit={this.onSubmitLoginForm}>
            <h1 className="login-heading">Login</h1>

            <div className="input-container">
              <label htmlFor="username" className="login-label">
                USERNAME
              </label>

              <input
                type="text"
                id="username"
                placeholder="Enter Username"
                className="login-input"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="input-container">
              <label htmlFor="password" className="login-label">
                PASSWORD
              </label>

              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="login-input"
                value={password}
                onChange={this.onChnagePassword}
              />
            </div>
            <div>{showError && <p className="err-msg">{errorMsg}</p>}</div>
            <div>
              <button type="submit" className="sign-in-btn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
