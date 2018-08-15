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
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
  Handles editing user
  =======================*/
  handleEdit(userData) {
    console.log('user information is: ', JSON.stringify(userData));
    let newUser = this.props.userData
    newUser.username = userData.user.username;
    newUser.email = userData.user.email;
    console.log('editedUser is', newUser);
    fetch('/user/'+this.props.userData.id, {
      body: JSON.stringify(userData),
      method: 'PATCH',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': this.props.userData.token
      }
    })
      .then(response => {
        return response.json()
      })
      .then(JSONdata => {
        console.log('modified user', JSONdata);
        this.props.setUser(newUser, this.props.userData.token)
      })
      .catch(error => console.log(error))
  }
  /*=======================
  Handles editing user
  =======================*/
  handleDelete() {
    console.log('Deleting user');
    fetch('/user/'+this.props.userData.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.userData.token
      }
    }).then(response => {
      this.props.logOut()
    }).catch(error => console.log(error))
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
        {
          (this.props.displayRegister)
          ? <RegisterForm handleRegister={this.handleRegister} toggleState={this.props.toggleState}/>
          : null
        }
        {
          (this.props.displayLogin)
          ? <LoginForm handleLogin={this.handleLogin} toggleState={this.props.toggleState}/>
          : null
        }
        {
          (this.props.displayEditProfile)
          ? <EditForm userData={this.props.userData} handleEdit={this.handleEdit} toggleState={this.props.toggleState} handleDelete={this.handleDelete} logOut={this.props.logOut}/>
          : null
        }
      </div>
    )
  }
}
