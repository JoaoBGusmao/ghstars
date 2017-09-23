import apiWorker from './api-worker'
import RepoCard from './repo-card'

import '../css/style.scss'

class App {
	constructor() {
		this.api    = new apiWorker();
		this.cards  = new RepoCard( this );

		this.state = {
			loading: false,
			filter: 'JavaScript',
			ghuser: 'wilfernandesjr',
			sort: 'sortStarsDescending'
		};

		this.cards.startLoading();

		this.makeGHCall();
	}

	makeGHCall() {
		this.api.api( 'https://api.github.com' )
			  .toRoute( `users/${this.state.ghuser}/starred` )
			  .whenDone( this.dataReceived.bind( this ) )
			  .make()
	}

	dataReceived( data ) {
		this.cards.showCards( data )
	}

	setState( state ) {
		this.state = state;
	}
}

new App();