/*=======================
  MAIN APP COMPONENT FOR COMICSTACK
=======================*/
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: null,
      searchCount: null,
      pages: null,
      searchPage: 1,
      query: null,
      filter: null,
      user: null,
      selection: null,
      displayDetails: false,
      displayList: true,
      favorites: [],
      isOwned: false,
      collection: [],
      displayLogin: false,
      displayRegister: false,
      displayEditProfile: false,
      displayCollection: false,
      displayFavorites: false,
      displayMain: true
    }
    this.setUser = this.setUser.bind(this)
    this.getCookieData = this.getCookieData.bind(this)
    this.parseResults = this.parseResults.bind(this)
    this.grabResults = this.grabResults.bind(this)
    this.logOut = this.logOut.bind(this)
    this.toggleState = this.toggleState.bind(this)
    this.setSelection = this.setSelection.bind(this)
    this.checkFaves = this.checkFaves.bind(this)
    this.checkCollection = this.checkCollection.bind(this)
    this.setPage = this.setPage.bind(this)
    this.favoriteUpdate = this.favoriteUpdate.bind(this)
    this.getFavorites = this.getFavorites.bind(this)
    this.collectionUpdate = this.collectionUpdate.bind(this)
    this.setFavorites = this.setFavorites.bind(this)
    this.resetOwn = this.resetOwn.bind(this)
    this.getCollection = this.getCollection.bind(this)
    this.setCollection = this.setCollection.bind(this)
    this.deleteFavorite = this.deleteFavorite.bind(this)
    this.deleteFromCollection = this.deleteFromCollection.bind(this)
    this.displayList = this.displayList.bind(this)
    this.Owned = this.Owned.bind(this)
  }
  /*=======================
  Things to check for when page first loads
  =======================*/
  componentDidMount () {
    // Check to see if user is logged in
    if (this.state.user == null) {
      // Check for cookie information if they aren't logged in
      this.getCookieData()
    } else {
      this.getFavorites(this.state.user.id)
      this.getCollection(this.state.user.id)
    }
  }
  /*=======================
  checks current usuer's current favorites
  =======================*/
  checkFaves (favorites, character_id) {
    for (let i = 0; i < favorites.length; i++) {
      if(favorites[i].character_id == character_id || favorites[i].id == character_id) {
        console.log('isOwned set to true');
        this.setState({
          isOwned: true
        })
        break;
      }
    }
  }
  /*=======================
  checks current usuer's current collection for selection match
  =======================*/
  checkCollection (collection, issue_id) {
    for (let i = 0; i < collection.length; i++) {
      if(collection[i].issue_id == issue_id || collection[i].id == issue_id) {
        console.log('isOwned set to true');
        this.setState({
          isOwned: true
        })
        break;
      }
    }
  }
  /*=======================
  resets isOwned on showdetail close
  =======================*/
  resetOwn() {
    this.setState({
      isOwned: false
    })
  }
  Owned() {
    this.setState({
      isOwned: true
    })
  }
  /*=======================
  Gets user data from cookies
  =======================*/
  getCookieData() {
    console.log('Checking for cookies');
    if(Cookies.get('token') && Cookies.get('id') && Cookies.get('username') && Cookies.get('email')) {
      // Format user data
      let userData = {
        username: Cookies.get('username'),
        email: Cookies.get('email'),
        id: Cookies.get('id'),
        token: Cookies.get('token')
      }
      console.log('Data from cookie:', userData);
      // load user data into state
      this.setState({
        user: userData
      })
      console.log('Got cookie data, state is', this.state);
      this.getFavorites(userData['id']);
      this.getCollection(userData['id']);
    } else {
      console.log('token does not exist');
    }
  }
  /*=======================
  Sets user data in state and cookies after log in
  =======================*/
  setUser(userdata, token) {
    userdata['token'] = token;
    console.log('data for user is: ', userdata);
    // Sets userdata into cookie
    Cookies.set('token', token);
    Cookies.set('username', userdata['username']);
    Cookies.set('email', userdata['email']);
    Cookies.set('id', userdata['id']);
    console.log('setUser userData is:', userdata);
    console.log('setUser id is:', userdata['id']);
    this.setState({
      user: userdata
    });
    this.getFavorites(userdata['id']);
    this.getCollection(userdata['id']);
  }
  /*=======================
  grab the results from api calls and update app state
  =======================*/
  parseResults(data) {
    for (let i = 0; i < data.results.length; i++) {
      //parse images
      if(data.results[i].image === null) {
        let newObj = {
          icon_url: "https://cdn.drawception.com/images/panels/2016/3-3/w4W1XRK4ZO-2.png"
        }
        data.results[i].image = newObj;
      }
      if(data.results[i].deck === null) {
        data.results[i].deck = ' ';
      }
      if(data.results[i].description === null) {
        data.results[i].description = ' ';
      }
      if(data.results[i].publisher === null) {
        let newObj = {
          name: 'Uh Oh.. Data missing'
        }
        data.results[i].publisher = newObj;
      }
    }
    return data
  }
  /*=======================
  grab the results from api calls and update app state
  =======================*/
  grabResults(data, query, filter, newSearch) {
    let numpages = Math.ceil(data.number_of_total_results/50)
    if(newSearch === true) {
      this.setState({
        searchResults: data.results,
        searchCount: data.number_of_total_results,
        pages: numpages,
        searchPage: 1,
        query: query,
        filter: filter
      })
    }
    else {
      this.setState({
        searchResults: data.results,
        searchCount: data.number_of_total_results,
        pages: numpages,
        query: query,
        filter: filter
      })
    }
  }
  /*=======================
  Logs the user out
  =======================*/
  logOut() {
    console.log('Logging Out');
    this.setState({
      user: null,
      favorites: null,
      collection: null
    });
    Cookies.remove('token');
    Cookies.remove('username');
    Cookies.remove('id');
  }
  /*=======================
  set current page in search results
  =======================*/
  setPage (page) {
    console.log(page);
    this.setState({
      searchPage: page
    })
  }

  /*=======================
  Toggles any of the booleans in state
  =======================*/
  setSelection(selection) {
    this.setState({
      selection: selection
    });
  }
  /*=======================
  Toggles any of the booleans in state
  =======================*/
  toggleState(...st) {
    console.log('Toggle State called');
    let toUpdate = {}
    for (let key of st) {
      if (key == 'displayCollection' && this.state.displayCollection == false) {
        toUpdate['displayFavorites'] = false;
        toUpdate['displayList'] = false;
        toUpdate['displayMain'] = false;
      } else if (key == 'displayFavorites' && this.state.displayFavorites == false) {
        toUpdate['displayCollection'] = false;
        toUpdate['displayList'] = false;
        toUpdate['displayMain'] = false;
      } else if (key == 'displayList' && this.state.displayList == false) {
        toUpdate['displayCollection'] = false;
        toUpdate['displayFavorites'] = false;
        toUpdate['displayMain'] = false;
      }
      toUpdate[key] = !this.state[key]
    }
    this.setState(toUpdate)
    this.resetOwn();
  }
  /*=======================
  Shows the results list page (hides everything else)
  =======================*/
  displayList() {
    this.setState({
      displayList: true,
      displayCollection: false,
      displayFavorites: false,
      displayMain: false
    })
  }
  /*=======================
  Sets what the current selection is for details page
  =======================*/
  setSelection(selection) {
    this.setState({
      selection: selection
    });
  }
  /*=======================
  Update user's favorite list
  =======================*/
  favoriteUpdate (character) {
    let tempFav = this.state.favorites;
    tempFav.push(character)
    this.setState({
      favorites: tempFav,
      isOwned: true
    })
  }
  /*=======================
  Set users favorites
  =======================*/
  setFavorites(favorites) {
    console.log('Favorites length is:', favorites.results.length);
    if (favorites.results.length > 0) {
      this.setState({
        favorites: favorites.results
      })
    }
  }
  /*=======================
  Set users collection
  =======================*/
  setCollection(collection) {
    if (collection.results.length > 0) {
      this.setState({
        collection: collection.results
      })
    }
  }
  /*=======================
  Get users favorites
  =======================*/
  getFavorites(id) {
    console.log('Calling get favorites', id);
    fetch('/favorites/all/'+id, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(JSONdata => {
      console.log('jsondata', JSONdata);
      this.setFavorites(JSONdata);
    }).catch(error => console.log(error))

  }
  /*=======================
  Get users collection
  =======================*/
  getCollection(id) {
    console.log('Calling get collection', id);
    fetch('/owns/'+id, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(JSONdata => {
      console.log('jsondata', JSONdata);
      this.setCollection(JSONdata);
    }).catch(error => console.log(error))

  }
  /*=======================
  Update user's collection list
  =======================*/
  collectionUpdate (issue) {
    let tempIss = this.state.collection;
    tempIss.push(issue)
    this.setState({
      collection: tempIss,
      isOwned: true
    })
  }
  /*=======================
    Remove character from user's favorites collection
  =======================*/
  deleteFavorite (character, index) {
    let thisID = 0
    if (character.character_id) {
      thisID = character.character_id
    }
    else {
      thisID = character.id
    }
    fetch('favorites/' + thisID,
      {
        method: 'DELETE'
      })
      .then(data => {
        this.setState({
          favorites: [
            ...this.state.favorites.slice(0, index),
            ...this.state.favorites.slice(index + 1)
          ]
        })
      })
  }
  /*=======================
    Remove comic issue from user's comic collection
  =======================*/
  deleteFromCollection (issue, index) {
    console.log('Deleting from collection', issue, index);
    let thisID = 0
    if (issue.issue_id) {
      thisID = issue.issue_id
    }
    else {
      thisID = issue.id
    }
    fetch('owns/' + thisID,
      {
        method: 'DELETE'
      })
      .then(data => {
        this.setState({
          collection: [
            ...this.state.collection.slice(0, index),
            ...this.state.collection.slice(index + 1)
          ]
        })
      })
  }
  render () {
    return (
      <div>
        {
          (this.state.displayMain)
          ? <Main grabResults={this.grabResults}
            user={this.state.user}
            logOut={this.logOut}
            toggleState={this.toggleState}
            parseResults={this.parseResults}
            displayList={this.displayList}/>
          : null
        }
        <NavBar
          grabResults={this.grabResults}
          user={this.state.user}
          logOut={this.logOut}
          toggleState={this.toggleState}
          parseResults={this.parseResults}
          displayList={this.displayList}
        />
        <div class="container">
          {
            (this.state.displayLogin || this.state.displayRegister || this.state.displayEditProfile)
            ? <User setUser={this.setUser} displayLogin={this.state.displayLogin} displayRegister={this.state.displayRegister} displayEditProfile={this.state.displayEditProfile} toggleState={this.toggleState}
            userData={this.state.user}
            logOut={this.logOut}/>
            : null
          }

          {
            (this.state.searchResults == null || this.state.displayList==false)
            ? ''
            : <Rollout
                results={this.state.searchResults}
                searchCount={this.state.searchCount}
                pages={this.state.pages}
                grabResults={this.grabResults}
                query={this.state.query}
                filter={this.state.filter}
                setSelection={this.setSelection}
                toggleState={this.toggleState}
                searchPage={this.state.searchPage}
                setPage={this.setPage}
                parseResults={this.parseResults}>
                favorites={this.state.favorites}
              </Rollout>
          }

          {
            (this.state.displayCollection)
            ? <Collection
              collection={this.state.collection}
              setSelection={this.setSelection}
              toggleState={this.toggleState}
              Owned={this.Owned}
              deleteFromCollection={this.deleteFromCollection}
              />
            : null
          }

          {
            (this.state.displayFavorites)
            ? <FavoritesPage
              favorites={this.state.favorites}
              setSelection={this.setSelection}
              toggleState={this.toggleState}
              deleteFavorite={this.deleteFavorite}
              Owned={this.Owned}
              />
            : null
          }

          {
            (this.state.displayDetails)
            ? <ShowDetail
              toggleState={this.toggleState}
              selection={this.state.selection} favorites={this.state.favorites}
              favoriteUpdate={this.favoriteUpdate}
              checkFaves={this.checkFaves}
              checkCollection={this.checkCollection}
              isOwned={this.state.isOwned}
              user={this.state.user}
              collection={this.state.collection}
              collectionUpdate={this.collectionUpdate}
              />
            : null
          }
        </div>

      </div>
    )
  }
}
/*=======================
  RENDER TO PAGE
=======================*/
ReactDOM.render(
  <App />,
  document.querySelector('.body')
)
