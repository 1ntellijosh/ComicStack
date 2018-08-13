class Rollout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1
    }
    this.nextQuery = this.nextQuery.bind(this)
    this.paginate = this.paginate.bind(this)
    this.skipToPage = this.skipToPage.bind(this)
    this.clearForms = this.clearForms.bind(this)
  }
  clearForms = () => {
  document.getElementById("topSkipper").reset();
  document.getElementById("skipper").reset();
  }
  nextQuery (thispage) {
    fetch('/queries/' + this.props.query + '/' + this.props.filter + '/' + thispage)
      .then(response => response.json())
      .then(data => {
        this.props.grabResults(data, this.props.query, this.props.filter, false)
        this.clearForms()
      }).catch(error => console.log(error))
  }
  paginate(event) {
    let thispage = 0
    if(event.target.id == 'next') {
      thispage = parseInt(this.props.searchPage) + 1
      this.props.setPage(thispage)
    }
    else {
      thispage = parseInt(this.props.searchPage) - 1
      this.props.setPage(thispage)
    }
    this.nextQuery(thispage)
  }
  skipToPage() {
    event.preventDefault();
    let thispage = ''
    if(this.refs.pager.value != '') {
      thispage = this.refs.pager.value
    }
    else{
      thispage = this.refs.toppager.value
    }
    this.props.setPage(thispage)
    this.nextQuery(thispage)
  }
  render () {
    return (
      <div id="rollout">
        <h1>Results: {this.props.searchCount}</h1>
        <div id="pageCount">
          Page: {(this.props.searchPage > 1)? <a href="#" id="back" onClick={this.paginate}> &lt; </a> : ''} {this.props.searchPage} of {this.props.pages} {(this.props.searchPage < this.props.pages)? <a id="next" href="#" onClick={this.paginate}> &gt; </a> : ''}
          <form id="topSkipper" onSubmit={this.skipToPage}>
            <div id="skipBar">
              <label for="pager">Skip to Page #:</label>
              <input
                ref="toppager" id="pager" type="number" min="1" max={this.props.pages} placeholder="Page number:" />
              <input type="submit" value="Jump" />
            </div>
          </form>
        </div>
        {this.props.results.map((result, index) => {
       return ( <div id="rolloutItem"
                      onClick={() => {
                        this.props.toggleState('displayDetails', 'displayList');
                        this.props.setSelection(result);
                      }} index={index}>
                  {(result.resource_type == 'volume') ?
                      <div>
                        <h4>Comic Volume: {result.name}</h4>
                        <img className="thumbnail" src={result.image.icon_url} />
                        <p>Publisher: {result.publisher.name}</p>
                        <p>Number of Issues: {result.count_of_issues}</p>
                      </div>
                : ''}
               {(result.resource_type == 'character') ?
                      <div>
                        <h4>Character: {result.name} ({result.publisher.name})</h4>
                        <p>Gender: {(result.gender == 1)? <span>Male</span> : '' }{(result.gender == 2)? <span>Female</span>
                        : '' }{(result.gender == 0)? <span>Other/Both</span>
                        : '' }</p>
                        <img src={result.image.icon_url} />
                        <p>Total issue appearances: {result.count_of_issue_appearances}</p>
                      </div>
                : ''}
                {(result.resource_type == 'issue') ?
                      <div>
                         <h4>Issue: {result.volume.name} # {result.issue_number}: {result.name}</h4>
                         <img src={result.image.icon_url} />
                      </div>
                 : ''}
                 <hr></hr>

             </div>)//result div return
           })}
          <div id="pageCount">
            <div id="pagerDiv">
            Page: {(this.props.searchPage > 1)? <a href="#" id="back" onClick={this.paginate}> &lt; </a> : ''}{this.props.searchPage} of {this.props.pages} {(this.props.searchPage < this.props.pages)? <a id="next" href="#" onClick={this.paginate}> &gt; </a> : ''}
            </div>
            <form id="skipper" onSubmit={this.skipToPage}>
              <div id="skipBar">
                <label for="pager">Skip to Page #:</label>
                <input
                  ref="pager" id="pager" type="number" min="1" max={this.props.pages} placeholder="Page number:" />
                <input type="submit" value="Jump" />
              </div>
            </form>
          </div>
      </div>
    )
  }
}
