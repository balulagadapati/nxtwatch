import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorStatus: '', isChecked: false}

  onSuccessfullyLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFailed = status => {
    this.setState({errorStatus: status})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessfullyLogin(data.jwt_token)
    } else {
      this.onLoginFailed(response.statusText)
    }
  }

  onChecked = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {errorStatus, isChecked} = this.state
    let passwordType
    if (isChecked === true) {
      passwordType = 'text'
    } else {
      passwordType = 'password'
    }
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-card">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
              className="logo"
            />
            <label htmlFor="username" className="li-label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              placeholder="USER NAME"
              onChange={this.onChangeUserName}
            />
            <label htmlFor="password" className="li-label">
              PASSWORD
            </label>
            <input
              type={passwordType}
              id="password"
              placeholder="PASSWORD"
              onChange={this.onChangePassword}
            />
            <div>
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox-input"
                onClick={this.onChecked}
              />
              <label htmlFor="checkbox">Show Password</label>
            </div>
            <button type="submit" className="submit-btn">
              Login
            </button>
            {errorStatus && <p className="err-status">{errorStatus}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
