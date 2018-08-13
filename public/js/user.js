class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.getUser = this.getUser.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  /*=======================
  Registers new user (and tries to log them in)
  =======================*/
  handleRegister(registerData) {
    console.log('Called handle register', registerData);
    fetch('/users/create', {
      body: JSON.stringify(registerData),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(myToken => {
        let newUser = {
          auth: {
            email: registerData.user.email,
            password: registerData.user.password
          }
        }
        console.log('Try to login with new user:', JSON.stringify(newUser));
        this.handleLogin(newUser);
      })
      .catch(error => console.log(error))
  }
  /*=======================
  Handles the login
  Need to perform the following for login:
  1. Send the login information to backend
  2. Get a token back
  3. Use the token to make another call in the backend to get user info
  4. Set that user info in state/cookie
  =======================*/
  handleLogin(loginData) {
    console.log('login information is: ', JSON.stringify(loginData));
    fetch('/user_token', {
      body: JSON.stringify(loginData),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(myToken => {
        return myToken.json()
      })
      .then(myTokenJson => {
        console.log('Got token back', myTokenJson);
        this.getUser(myTokenJson)
      })
      .catch(error => console.log(error))
  }
  /*=======================
  Gets the user information
  =======================*/
  getUser(token) {
    let tokenString = 'Bearer ' + token['jwt']
    console.log('Authorization is:', tokenString);
    // Need to put token in header, the auth route returns user information
    fetch('/auth', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': tokenString
      }
    })
    .then(response => response.json())
    .then(JSONdata => {
      console.log('Retrieved user info: ', JSONdata);
      this.props.setUser(JSONdata, tokenString)
    }).catch(error => console.log(error))
  }
  render() {
    return (
      <div>
        <RegisterForm handleRegister={this.handleRegister}/>
        <LoginForm handleLogin={this.handleLogin} />
      </div>
    )
  }
}
