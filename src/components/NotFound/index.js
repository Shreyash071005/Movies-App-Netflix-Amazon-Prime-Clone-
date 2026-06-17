import './index.css'

const NotFound = props => {
  const onClickHome = () => {
    const {history} = props
    history.push('/')
  }
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">Lost Your Way ?</h1>
        <p className="not-found-msg">
          we are sorry, the page you requested could not be found <br />
          Please go back to the homepage
        </p>
        <button type="button" className="go-to-home-btn" onClick={onClickHome}>
          Go to Home
        </button>
      </div>
    </div>
  )
}

export default NotFound
