import apiWorker from './api-worker'
import RepoCard from './repo-card'

import '../css/style.scss'

class App {
	constructor() {
		this.api    = new apiWorker();
		this.cards  = new RepoCard( this );

		this.state = {
			loading: false,
			filter: '',
			ghuser: 'wilfernandesjr',
			sort: 'sortStarsDescending'
		};

		this.reloadCards( true );
		this.addEventListeners();
	}

	reloadCards( callApiAgain ) {
		if( callApiAgain ) {
			this.cards.data = null;
		}

		this.startLoading();
		this.makeGHCall();
	}

	addEventListeners() {
		document.querySelector( '.order-select' ).addEventListener( 'change', this.orderChanged.bind( this ) );
		document.querySelector( '.filter-select' ).addEventListener( 'change', this.filterChanged.bind( this ) );
	}

	orderChanged( e ) {
		this.setState({
			...this.state,
			sort: e.target.value
		});

		this.reloadCards( false );
	}

	filterChanged( e ) {
		this.setState({
			...this.state,
			filter: e.target.value
		});

		this.cards.validateFilter();
		this.reloadCards( false );
	}

	makeGHCall() {
		if( this.cards.data != null ) {
			return this.dataReceived();
		}
		this.api.api( 'https://api.github.com' )
			  .toRoute( `users/${this.state.ghuser}/starred` )
			  .whenDone( this.dataReceived.bind( this ) )
			  .make()
	}

	dataReceived( data ) {
		if( this.cards.data == null ) {
			this.cards.setData( data );
		}
		this.cards.showCards()
	}

	setState( state ) {
		this.state = state;
	}

	startLoading() {
		this.setState({
			...this.state,
			loading: true
		});
		document.querySelector( '.loading' ).classList.add( 'active' );
	}

	stopLoading() {
		this.setState({
			...this.state,
			loading: false
		});
		document.querySelector( '.loading' ).classList.remove( 'active' );
	}
}

new App();