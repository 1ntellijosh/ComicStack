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
        let parsedData = this.props.parseResults(data)
        this.props.grabResults(parsedData, this.props.query, this.props.filter, false)
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
        <div class="results-container">
        {this.props.results.map((result, index) => {
       return ( <div id="rolloutItem" class="result-box"
                      onClick={() => {
                        this.props.toggleState('displayDetails');
                        this.props.setSelection(result);
                      }} index={index}>
                  {(result.resource_type == 'volume') ?
                    <div class="result-child">
                      <span class="icon is-small showdetail-header-volumes">
                        <i class="fas fa-book-reader"></i>
                      </span>
                      <span class="showdetail-header-volumes">Volume</span>
                      <img className="thumbnail result-thumbnail" src={result.image.icon_url} />
                      <h1 class="title">{result.name}</h1>
                      <p class="result-details">Publisher: {result.publisher.name}</p>
                      <p class="result-details"># of Issues: {result.count_of_issues}</p>
                    </div>
                : ''}
               {(result.resource_type == 'character') ?
                      <div class="result-child">
                        <span class="icon is-small showdetail-header-characters">
                          <i class="far fa-user"></i>
                        </span>
                        <span class="showdetail-header-characters">Character</span>
                        <img className="thumbnail result-thumbnail" src={result.image.icon_url} />
                        <h1 class="title">{result.name}</h1>
                        <h2 class="subtitle">({result.publisher.name})</h2>
                        <p class="result-details">Gender: {(result.gender == 1)? <span>Male</span> : '' }{(result.gender == 2)? <span>Female</span>
                        : '' }{(result.gender == 0)? <span>Other/Both</span>
                        : '' }</p>
                      <p class="result-details"># of Appearances: {result.count_of_issue_appearances}</p>
                      </div>
                : ''}
                {(result.resource_type == 'issue') ?
                      <div class="result-child">
                        <span class="icon is-small showdetail-header-issues">
                          <i class="fas fa-book"></i>
                        </span>
                        <span class="showdetail-header-issues">Issue</span>
                        <img className="thumbnail result-thumbnail" src={result.image.icon_url} />
                        <h1 class="title">{result.volume.name}</h1>
                        <h2 class="subtitle"># {result.issue_number}</h2>
                        <h2 class="subtitle is-6">{result.name}</h2>
                      </div>
                 : ''}

             </div>)//result div return
           })}
      </div>
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
