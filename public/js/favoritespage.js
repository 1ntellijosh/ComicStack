class FavoritesPage extends React.Component {
  constructor(props) {
    super(props)
    this.getFavorite = this.getFavorite.bind(this);
    this.showFavorite = this.showFavorite.bind(this);
  }
  getFavorite(favorite) {
    console.log('getFavorite starting', favorite);
    fetch('/queries/pull/characters/'+favorite.character_id, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(JSONdata => {
      console.log('Retrieved favorite details: ', JSONdata);
      this.showFavorite(JSONdata)
    }).catch(error => console.log(error))
  }
  showFavorite(data) {
    console.log('Data in showFavorite', data);
    if (data.results && data.results.length > 0) {
      data.results[0]['resource_type'] = 'character'
      this.props.setSelection(data.results[0]);
      this.props.toggleState('displayDetails');
      this.props.Owned();
    }
  }
  render() {
    return (
      <div>

        <h1 class="title">My Favorites</h1>
        <table class="table is-hoverable is-fullwidth">
          <thead>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Publisher</th>
            <th>Remove</th>
          </thead>
          <tbody>
            {this.props.favorites.map((favorite, index) => {
              return (
                <tr>
                  <td className="image-column"> <img onClick={()=>this.getFavorite(favorite)} className="image is-96x96" src={favorite.icon_url}/> </td>
                  <td>
                    <span className="name_list" onClick={()=>this.getFavorite(favorite)}>
                      {(favorite.name && favorite.name.trim().length > 0) ? favorite.name : "Unnamed"}
                    </span>
                  </td>
                  <td>
                    <span className="deck_list">
                      {(favorite.deck && favorite.deck.trim().length > 0) ? favorite.deck : "No description available"}
                    </span>
                  </td>
                  <td>{(favorite.publisher && favorite.publisher.trim().length > 0) ? favorite.publisher : "No publisher available"}</td>
                  <td><i onClick={() => this.props.deleteFavorite(favorite, index)} class="fas fa-trash"></i></td>
                </tr>
              )
            })}
        </tbody>
        </table>
      </div>
    )
  }
}
