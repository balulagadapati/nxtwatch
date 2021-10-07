import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsMoon, BsSearch} from 'react-icons/bs'
import {FaRegUser} from 'react-icons/fa'
import Trending from '../Trending'
import './index.css'

class Home extends Component {
  state = {
    searchInput: '',
    homeVideoDetails: {},
    inTrending: false,
    inGaming: false,
    inHome: false,
    inSavedVideos: false,
    isGetVideosFailed: false,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  updateVideoSection = data => {
    const {videos} = data
    const updatedVideoDetails = videos.map(eachVideo => ({
      id: eachVideo.id,
      publishedAt: eachVideo.published_at,
      thumbnailUrl: eachVideo.thumbnail_url,
      title: eachVideo.title,
      viewCount: eachVideo.view_count,
      channel: {
        name: eachVideo.channel.name,
        profileImageUrl: eachVideo.channel.profile_image_url,
      },
    }))
    this.setState({homeVideoDetails: updatedVideoDetails})
  }

  failedHomeVideosSection = () => {
    this.setState({isGetVideosFailed: true})
  }

  getHomeVideos = async () => {
    const {searchInput} = this.state

    const url = `https://apis.ccbp.in/videos/allsearch=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.updateVideoSection(data)
    } else {
      this.failedHomeVideosSection()
    }
  }

  renderHeader = () => (
    <div className="header-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        alt="website-logo"
        className="li-logo"
      />
      <div className="header-end-container">
        <BsMoon className="dt-theme-icon" />
        <FaRegUser className="user-icon" />
        <button type="button" className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  )

  onClickTrending = () => {
    this.setState({
      inTrending: true,
      inGaming: false,
      inHome: false,
      inSavedVideos: false,
    })
  }

  renderLeftNavContainer = () => (
    <div className="nav-container">
      <div className="upper-nav-container">
        <div>
          <Link to="/" className="link-item">
            <p>Home</p>
          </Link>
        </div>
        <div>
          <Link
            to="/trending"
            className="link-item"
            onClick={this.onClickTrending}
          >
            <p>Trending</p>
          </Link>
        </div>
        <div>
          <Link to="/gaming" className="link-item">
            <p>Gaming</p>
          </Link>
        </div>
        <div>
          <Link to="/savedvideos" className="link-item">
            <p>Saved Videos</p>
          </Link>
        </div>
      </div>
      <div className="lower-nav-container">
        <h1>CONTACT US</h1>
        <div className="social-icon-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="social-icon"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
            alt="twitter logo"
            className="social-icon"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="social-icon"
          />
        </div>
        <p>Enjoy! Now to see your channels and recommendations</p>
      </div>
    </div>
  )

  renderBannerSection = () => (
    <div className="banner-section">
      <div className="logo-section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="home-bannerlogo"
        />
        <p>*</p>
      </div>
      <div className="content-section">
        <h1 className="banner-des">
          Buy Nxt Watch Premium prepaid plans with UPI
        </h1>
        <button type="button" className="banner-btn">
          GET IT NOW
        </button>
      </div>
    </div>
  )

  onRetried = () => {
    this.getHomeVideos()
  }

  renderSuccessSection = () => {
    const {homeVideoDetails} = this.state
    console.log(homeVideoDetails)
    return (
      <div className="home-success-section">
        <div className="search-container">
          <input
            type="search"
            placeholder="SEARCH"
            className="home-search-bar"
            onChange={this.onChangeInput}
          />
          <button
            className="search-btn"
            type="submit"
            onClick={this.onSearchInput}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="home-results-container">
          {homeVideoDetails.map(eachVideo => (
            <li>{eachVideo.id}</li>
          ))}
        </ul>
      </div>
    )
  }

  renderNoVideosSection = () => {
    const {homeVideoDetails} = this.state
    console.log(homeVideoDetails)
    return (
      <div className="home-success-section">
        <div className="search-container">
          <input
            type="search"
            placeholder="SEARCH"
            className="home-search-bar"
            onChange={this.onChangeInput}
          />
          <button
            className="search-btn"
            type="submit"
            onClick={this.onSearchInput}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
          alt="no videos"
          className="failed-image"
        />
        <h1 className="failed-heading">No Search results found</h1>
        <p className="failed-des">
          Try different key words or remove search filter
        </p>
        <button type="button" className="retry-btn" onClick={this.onRetried}>
          Retry
        </button>
      </div>
    )
  }

  renderFailureSection = () => (
    <div className="sample">
      <div className="failed-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="failure view"
          className="failed-image"
        />
        <h1 className="failed-heading">Oops! Something Went Wrong</h1>
        <p className="failed-des">
          We are having some trouble to complete your request.
        </p>
        <p className="failed-des">Please Try again.</p>
        <button type="button" className="retry-btn" onClick={this.onRetried}>
          Retry
        </button>
      </div>
    </div>
  )

  render() {
    const {
      searchInput,
      homeVideoDetails,
      inTrending,
      isGetVideosFailed,
    } = this.state

    return (
      <div className="bg-container-home">
        {this.renderHeader()}
        <div className="home-bottom-container">
          {this.renderLeftNavContainer()}
          <div className="home-bottom-right-container">
            {this.renderBannerSection()}

            {isGetVideosFailed
              ? this.renderFailureSection()
              : this.renderSuccessSection()}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
