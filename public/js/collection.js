class Collection extends React.Component {
  constructor(props) {
    super(props)
    this.getIssue = this.getIssue.bind(this);
    this.showIssue = this.showIssue.bind(this);
  }
  getIssue(issue) {
    console.log('getIssue starting', issue);
    let id = (issue.issue_id) ? issue.issue_id : issue.id;
    fetch('/queries/pull/issues/'+id, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(JSONdata => {
      console.log('Retrieved issue details: ', JSONdata);
      this.showIssue(JSONdata)
    }).catch(error => console.log(error))
  }
  showIssue(data) {
    console.log('Data in showIssue', data);
    if (data.results && data.results.length > 0) {
      data.results[0]['resource_type'] = 'issue'
      this.props.setSelection(data.results[0]);
      this.props.toggleState('displayDetails');
      this.props.Owned();
    }
  }
  render() {
    return (
      <div>

        <h1 class="title">My Collection</h1>
        <table class="table is-hoverable is-fullwidth">
          <thead>
            <th></th>
            <th>Title</th>
            <th>Issue #</th>
            <th>Description</th>
            <th>Remove</th>
          </thead>
          <tbody>
            {this.props.collection.map((issue, index) => {
              return (
                <tr>
                  <td className="image-column"> <img onClick={()=>this.getIssue(issue)} className="image is-96x96" src={issue.icon_url}/> </td>
                  <td>
                    <span className="name_list" onClick={()=>this.getIssue(issue)}>
                      {(issue.volume_name && issue.volume_name.trim().length > 0) ? issue.volume_name : "Unnamed"}
                    </span>
                  </td>
                  <td>{(issue.issue_number) ? issue.issue_number : "Unknown"}</td>
                  <td>
                    <div className="description_column">
                      <span className="deck_list">
                        {(issue.description && issue.description.trim().length > 0) ? <div dangerouslySetInnerHTML={{ __html: issue.description }} /> : "No description available"}
                      </span>
                    </div>
                  </td>
                  <td><i onClick={() => this.props.deleteFromCollection(issue, index)} class="fas fa-trash"></i></td>
                </tr>
              )
            })}
        </tbody>
        </table>
      </div>
    )
  }
}
