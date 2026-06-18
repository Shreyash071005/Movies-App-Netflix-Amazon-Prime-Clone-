import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class Account extends Component {
  // State
  state = {username: '', password: ''}

  componentDidMount() {
    this.getUserDetails()
  }

  // Get user Detials From Cookie
  getUserDetails = () => {
    const username = Cookies.get('username')
    const password = Cookies.get('password')

    this.setState({username, password})
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    Cookies.remove('username')
    Cookies.remove('password')

    const {history} = this.props
    history.replace('/login')
  }

  // Render Account Details
  renderAccountView = () => {
    const {username, password} = this.state
    return (
      <>
        <div className="account-content">
          <h1 className="account-title">Account</h1>
          <hr className="hr-line" />
          <div className="member-details-container">
            <div>
              <p className="member-ship-text">Member ship</p>
            </div>
            <div>
              <p className="member-username">{`${username}@gmail.com`}</p>
              <p className="member-password">{`Password : ${'*'.repeat(
                password.length,
              )}`}</p>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="plan-details-container">
            <div>
              <p className="plan-details-text">Plan details</p>
            </div>
            <div className="plan-subscription-container">
              <p className="plan-name">Premium</p>
              <p className="plan-quality">Ultra HD</p>
            </div>
          </div>
          <hr className="hr-line" />
          <div className="logout-btn-container">
            <button
              className="logout-btn"
              type="button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  render() {
    return (
      <div className="account-container">
        <Header />
        {this.renderAccountView()}
      </div>
    )
  }
}

export default Account
