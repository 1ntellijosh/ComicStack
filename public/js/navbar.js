/*=======================
  TOP NAVBAR COMPNENT
=======================*/
class NavBar extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      navActive: false
    }
  }
  render() {
    return (
      <nav class="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <h1 class="title is-4 logo"> --cOMIC STACK--</h1>
          </a>
          <div class="navbar-burger burger" data-target="main-navigation" onClick={() => {
              this.setState({
                navActive: !this.state.navActive
              })
            }}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div id="main-navigation" className={(this.state.navActive) ? "navbar-menu is-active" : "navbar-menu"}>
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link login">
              <span class="icon is-large">
                <i class="far fa-folder-open"></i>
              </span>
              My Stuff
            </a>
            <div class="navbar-dropdown">
              <a class="navbar-item" onClick={()=> this.props.toggleState('displayCollection')}>
                <i class="fas fa-book icon-nav"></i>My Comic Collection</a>
              <a class="navbar-item" onClick={()=> this.props.toggleState('displayFavorites')}>
                <i class="far fa-user icon-nav"></i>
                My Favorite Characters</a>
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item ">
              <SearchForm grabResults={this.props.grabResults} parseResults={this.props.parseResults}
              toggleState={this.props.toggleState}
              displayList={this.props.displayList}/>
            </div>
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link login">
                {(this.props.user != null) ? this.props.user.username : "Not Logged In"}
                <span class="icon is-large">
                  <i class="fas fa-lg fa-user-circle">
                </i></span>
              </a>
                {
                  (this.props.user != null)
                  ? <div class="navbar-dropdown">
                      <a class="navbar-item" onClick={()=> this.props.toggleState('displayEditProfile')}>Edit Profile</a>
                      <a class="navbar-item" onClick={()=> this.props.logOut()}>Logout</a>
                    </div>
                  : <div class="navbar-dropdown">
                      <a class="navbar-item" onClick={()=> this.props.toggleState('displayLogin')}>Login</a>
                      <a class="navbar-item" onClick={()=> this.props.toggleState('displayRegister')}>Sign Up</a>
                    </div>
                }
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
