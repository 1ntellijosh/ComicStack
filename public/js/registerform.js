class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
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
  Handles submit action from form
  =======================*/
  handleSubmit(event) {
    event.preventDefault();
    let registerData = {
      user: {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      }
    }
    console.log('Calling handleRegister', registerData);
    this.props.handleRegister(registerData);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="email" placeholder="email" onChange={this.handleChange} value={this.state.email} id='email'/>
        <input type="text" placeholder="username" onChange={this.handleChange} value={this.state.username} id='username'/>
        <input type="password" placeholder="password" onChange={this.handleChange} value={this.state.password} id='password'/>
        <input type="submit"/>
      </form>
    )
  }
}
