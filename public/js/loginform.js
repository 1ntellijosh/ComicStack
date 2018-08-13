class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /*=======================
  This method sets state to whatever user typed in form
  =======================*/
  handleChange(event) {
    this.setState({[event.target.id]: event.target.value})
  }
  /*=======================
  Handles submit action from login form
  =======================*/
  handleSubmit(event) {
    event.preventDefault();
    // Format the login information
    let login = {
      auth: {
        email: this.state.email,
        password: this.state.password
      }
    }
    // Try to login
    this.props.handleLogin(login);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="email" placeholder="email" onChange={this.handleChange} value={this.state.email} id='email'/>
        <input type="password" placeholder="password" onChange={this.handleChange} value={this.state.password} id='password'/>
        <input type="submit"/>
      </form>
    )
  }
}
