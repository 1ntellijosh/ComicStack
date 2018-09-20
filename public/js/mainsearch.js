/*=======================
  MAIN SEARCH COMPONENT FOR API CALLS TO COMIC VINE
=======================*/
class MainSearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.getResults = this.getResults.bind(this)
  }
  /*=======================
    Formats and sends API calls to comic vine
  =======================*/
  getResults () {
    event.preventDefault();
    this.props.displayList();
    let query = this.refs.query.value
    let filter = this.refs.filter.value
    fetch('/queries/' + query + '/' + filter + '/1')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let parsedData = this.props.parseResults(data)
        this.props.grabResults(parsedData, query, filter, true)
      }).catch(error => console.log(error))
  }
  render(){
    return (<div class="mainsearch" id="searchFormDiv">
    <form onSubmit={this.getResults}>
      <div id="searchBar" className="field has-addons has-addons-centered searchbardiv">
        <p class="control">
          <span class="select is-large main-select">
            <select class="main-select" ref="filter">
              <option value="any" selected>All</option>
              <option value="issue">Issues</option>
              <option value="volume">Comic Volumes</option>
              <option value="character">Characters</option>
            </select>
          </span>
        </p>
        <p class="control">
          <input className="input is-large mainsearchinput"
            ref="query" type="text" placeholder="Search for comic or character" />
        </p>
        <p class="control">
          <input className="button is-large is-danger is-hovered" type="submit" value="Search" />
        </p>
      </div>
    </form>
    </div>
    )
  }
}
