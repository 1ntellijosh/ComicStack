class Main extends React.Component {
  render() {
    return(
      <div class="main-wrapper">

        <div id="cf">
          <h1 class="maintitle">---cOMIC STACK---</h1>
          <MainSearchForm grabResults={this.props.grabResults} parseResults={this.props.parseResults}
          toggleState={this.props.toggleState}
          displayList={this.props.displayList}/>
          <img class="bottom" src="/images/dc.jpeg" />
          <img class="top" src="/images/marvel2.jpeg" />
        </div>

      </div>
    )
  }
}
