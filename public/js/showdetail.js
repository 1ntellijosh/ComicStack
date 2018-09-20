/*=======================
  SHOWDETAIL MODAL COMPONENT
=======================*/
//Modal to chow more info on search results that are clicked in the search result rollout component
class ShowDetail extends React.Component {
  constructor(props) {
    super(props);
    this.addCollection = this.addCollection.bind(this)
    this.characterSubmit = this.characterSubmit.bind(this)
    this.favoriteSubmit = this.favoriteSubmit.bind(this)
    this.issueSubmit = this.issueSubmit.bind(this)
    this.ownsSubmit = this.ownsSubmit.bind(this)
  }
  /*=======================
  once loaded, checks for user ownership
  =======================*/
  componentDidMount () {
    if(this.props.user != null) {
      console.log('Calling componentDidMount in showdetail');
      if(this.props.selection.resource_type == 'character') {
        this.props.checkFaves(this.props.favorites, this.props.selection.id)
      }
      else if (this.props.selection.resource_type == 'issue') {
        this.props.checkCollection(this.props.collection, this.props.selection.id)
      }
    }
  }
  /*=======================
  submit favorite linking table to characters in the database
  =======================*/
  favoriteSubmit (newFave) {
    fetch('/favorites', {
      body: JSON.stringify(newFave),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdFave => {
        return createdFave.json()
      })
      .then(jsonedFave => {
        console.log('favorite entry completed');
      })
      .catch(error => console.log(error))
  }
  /*=======================
  submit character object to be added to database(returns exiting object back if already in database)
  =======================*/
  characterSubmit (character) {
    //send character object to heroes database
    fetch('/characters', {
      body: JSON.stringify(character),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdHero => {
        return createdHero.json()
      })
      .then(jsonedChar => {
        this.props.favoriteUpdate(jsonedChar)
        let newFave = {
          user_id: this.props.user.id,
          character_id: jsonedChar.id
        }
        this.favoriteSubmit(newFave)
      })
      .catch(error => console.log(error))
  }
  /*=======================
  submit ownership linking table to issues in the database
  =======================*/
  ownsSubmit (newOwn) {
    fetch('/owns', {
      body: JSON.stringify(newOwn),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdOwn => {
        return createdOwn.json()
      })
      .then(jsonedOwn => {
        console.log('owns entry completed');
      })
      .catch(error => console.log(error))
  }
  /*=======================
  submit issue object to be added to database(returns exiting object back if already in database)
  =======================*/
  issueSubmit (issue) {
    console.log(issue);
    //send hero object to heroes database
    fetch('/issues', {
      body: JSON.stringify(issue),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdIssue => {
        return createdIssue.json()
      })
      .then(jsonedIss => {
        this.props.collectionUpdate(jsonedIss)
        let newOwn = {
          user_id: this.props.user.id,
          issue_id: jsonedIss.id
        }
        this.ownsSubmit(newOwn)
      })
      .catch(error => console.log(error))
  }
  /*=======================
  Add to collection
    -- checks for character/volume
    -- adds to the appropriate collection
  =======================*/
  addCollection() {
    //check that user is logged in first
    if(this.props.user == null) {
      this.props.toggleState('displayDetails','displayLogin');
    }
    else {
      //check is the selection to add is a character:
      if (this.props.selection.resource_type === 'character') {
        // parse the character's deck for single quotes
        if (this.props.selection.deck != null) {
          let thisDeck = this.props.selection.deck
          let cleanString = (thisDeck) ? thisDeck.replace(/'/g,'') : '';
          let character = {
            id: this.props.selection.id,
            name: this.props.selection.name,
            deck: cleanString,
            publisher: this.props.selection.publisher.name,
            gender: this.props.selection.gender,
            icon_url: this.props.selection.image.icon_url,
            real_name: this.props.selection.real_name,
            resource_type: this.props.selection.resource_type
          }
          this.characterSubmit(character)
        }
        else {
          let character = {
            id: this.props.selection.id,
            name: this.props.selection.name,
            publisher: this.props.selection.publisher.name,
            gender: this.props.selection.gender,
            icon_url: this.props.selection.image.icon_url,
            real_name: this.props.selection.real_name,
            resource_type: this.props.selection.resource_type
          }
          this.characterSubmit(character)
        }
      }//end of if character
      else {
        // parse the issue's description for single quotes
        if (this.props.selection.description != null) {
          let thisDesc = this.props.selection.description
          let cleanString = (thisDesc) ? thisDesc.replace(/'/g,'') : '';
          let thisName = this.props.selection.name
          let cleanName = (thisName) ? thisName.replace(/'/g,'') : '';
          let thisissue = {
            id: this.props.selection.id,
            name: cleanName,
            description: cleanString,
            issue_number: this.props.selection.issue_number,
            icon_url: this.props.selection.image.icon_url,
            volume_id: this.props.selection.volume.id,
            volume_name: this.props.selection.volume.name,
            resource_type: this.props.selection.resource_type
          }
          this.issueSubmit(thisissue)
        }
        else {
          let thisName = this.props.selection.name
          let cleanName = (thisName) ? thisName.replace(/'/g,'') : '';
          let thisissue = {
            id: this.props.selection.id,
            name: cleanName,
            issue_number: this.props.selection.issue_number,
            icon_url: this.props.selection.image.icon_url,
            volume_id: this.props.selection.volume_id,
            volume_name: this.props.selection.volume_name,
            resource_type: this.props.selection.resource_type
          }
          this.issueSubmit(thisissue)
        }
      }//end of if issue
    }//end of if logged in
  }//end of addCollection method
  render() {
    return (
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">

              {
                (this.props.selection.resource_type=="issue")
                ? <div class="modal-card-title"><span class="icon is-small showdetail-header-issues"><i class="fas fa-book"></i></span><span class="showdetail-header-issues">&nbsp;Issue</span><h1 class="title modal-title-container">
                {(this.props.selection.volume) ? this.props.selection.volume.name : this.props.selection.volume_name}&nbsp;{this.props.selection.issue_number}</h1></div>
                : (this.props.selection.resource_type=="character")
                  ? <div class="modal-card-title"><span class="icon is-small showdetail-header-characters"><i class="far fa-user"></i></span><span class="showdetail-header-characters">&nbsp;Character</span><h1 class="title modal-title-container"> {this.props.selection.name}</h1></div>
                  : <div class="modal-card-title"><span class="icon is-small showdetail-header-volumesr"><i class="fas fa-book-reader"></i></span><span class="showdetail-header-volumes">&nbsp;Volume</span><h1 class="title modal-title-container"> {this.props.selection.name}</h1></div>
              }
            <button class="delete" aria-label="close" onClick={() => this.props.toggleState('displayDetails')}></button>
          </header>
          <section class="modal-card-body">
            <img class="showdetail-img" src={this.props.selection.image.medium_url} />
            <div class="show-detail-info">
              {
                (this.props.selection.resource_type=="issue")
                ?<div><div class="show-detail-section"><h2 class="show-detail-label">Subtitle</h2><span>{this.props.selection.name}</span></div>
                <div class="show-detail-section"><h2 class="show-detail-label">Cover Date</h2><span>{this.props.selection.cover_date}</span></div></div>
                : (this.props.selection.resource_type=="character")
                  ? <div class="show-detail-section"><h2 class="show-detail-label">Real Name</h2><span>{this.props.selection.real_name}</span></div>
                  : <div class="show-detail-section"><h2 class="show-detail-label">Start Year</h2><span>{this.props.selection.start_year}</span></div>
              }
              <div class="show-detail-section">
                <h2 class="show-detail-label">Description:</h2>
                <div dangerouslySetInnerHTML={{ __html: this.props.selection.description }} />
              </div>
            </div>
          </section>
          <footer class="modal-card-foot">
          {(this.props.selection.resource_type == 'character')?
              <Favorite addCollection={this.addCollection} isOwned={this.props.isOwned} toggleState={this.props.toggleState}></Favorite> : '' }
          {(this.props.selection.resource_type == 'issue')?
            <Collect addCollection={this.addCollection} isOwned={this.props.isOwned}
            toggleState={this.props.toggleState}></Collect>
            : '' }
          </footer>
        </div>
      </div>
    )
  }
}
