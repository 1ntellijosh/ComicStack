/*=======================
  REGISTER NEW USER COMPONENT
=======================*/
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
    this.props.toggleState('displayRegister');
    this.props.handleRegister(registerData);
  }
  render() {
    return (
      <div class="modal is-active">
      <div onClick={()=> this.props.toggleState('displayRegister')} class="modal-background"></div>
      <div class="modal-content">
      <form class="form" onSubmit={this.handleSubmit}>
        <h1 class="title"> Register </h1>
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" type="text" placeholder="username" onChange={this.handleChange} value={this.state.username} id='username'/>
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" type="email" placeholder="Email" onChange={this.handleChange} value={this.state.email} id='email'/>
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input is-success" type="password" placeholder="Password" onChange={this.handleChange} value={this.state.password} id='password'/>
                <span class="icon is-small is-left">
                  <i class="fas fa-key"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
            <div class='field is-grouped is-grouped-right'>
              <p class="control">
                <input class="button is-success" type="submit"/>
                <button onClick={()=> this.props.toggleState('displayRegister')} class="button is-danger">Cancel</button>
              </p>
            </div>

      </form>
    </div>
    <button onClick={()=> this.props.toggleState('displayRegister')} class="modal-close is-large" aria-label="close"></button>
    </div>
    )
  }
}
