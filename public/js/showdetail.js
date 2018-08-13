class ShowDetail extends React.Component {
  constructor(props) {
    super(props);
    this.addCollection = this.addCollection.bind(this)
  }
  addCollection() {
    // Add to collection
    // We can split this up but I was thinking we can use
    // logic to find what it is (issue, char, vol) and add it to the appropriate collection
  }
  render() {
    return (
      <div class="show-container">
        <button onClick={() => {this.props.toggleState('displayDetails', 'displayList');}}>Back To Results</button>
        <button onClick={this.addCollection}>Add to Collection</button>
        <h1>
          {
            (this.props.selection.resource_type=="issue")
            ? "Issue: " + this.props.selection.volume.name + " " + this.props.selection.issue_number
            : (this.props.selection.resource_type=="character")
              ? "Character: " + this.props.selection.name
              : "Volume: " + this.props.selection.name
          }
        </h1>

        <img src={this.props.selection.image.medium_url} />
        <h2>
          {
            (this.props.selection.resource_type=="issue")
            ? "Cover Date: " + this.props.selection.cover_date
            : (this.props.selection.resource_type=="character")
              ? "Real Name: " + this.props.selection.real_name
              : "Start Year: " + this.props.selection.start_year
          }
        </h2>
        <h2>Description:</h2>
        <div dangerouslySetInnerHTML={{ __html: this.props.selection.description }} />
      </div>
    )
  }
}
