/*=======================
  EDIT USER INFO COMPONENT
=======================*/
class EditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /*=======================
  Set values to logged in user data
  =======================*/
  componentDidMount () {
    this.setState({
      email: this.props.userData.email,
      username: this.props.userData.username
    })
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
    let userData = {
      user: {
        username: this.state.username,
        email: this.state.email
      }
    }
    console.log('Calling handleUpdate', userData);
    this.props.toggleState('displayEditProfile');
    this.props.handleEdit(userData);
  }
  render() {
    return (
      <div class="modal is-active">
      <div onClick={()=> this.props.toggleState('displayEditProfile')} class="modal-background"></div>
      <div class="modal-content">
      <form class="form" onSubmit={this.handleSubmit}>
        <h1 class="title"> Edit Profile </h1>
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
          </div>
        </div>
            <div class='field is-grouped is-grouped-right'>
              <p class="control">
                <input class="button is-success" type="submit"/>
                <button onClick={()=> this.props.toggleState('displayEditProfile')} class="button is-danger">Cancel</button>
              </p>
            </div>

        <a class="button is-danger" onClick={()=>{this.props.toggleState('displayEditProfile'); this.props.handleDelete()}}>Delete My Account</a>
      </form>
    </div>
      <button onClick={()=> this.props.toggleState('displayEditProfile')} class="modal-close is-large" aria-label="close"></button>
      </div>
    )
  }
}
