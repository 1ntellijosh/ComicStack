/*=======================
  BUTTON COMPONENT TO ADD CHARACTER TO FAVORITES
=======================*/
class Favorite extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="favoriteDiv">
        {(this.props.isOwned == false)?   <button id="favoriteBtn" class="button is-primary is-hovered" onClick={this.props.addCollection}>
          ADD TO FAVORITES
        </button>
        :
        <button id="collectBtn" class="button is-danger is-hovered">
          FAVORITE CHARACTER
        </button> }
      </div>
    )
  }
}
