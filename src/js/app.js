import apiWorker from './api-worker'
import RepoCard from './repo-card'

import '../css/style.scss'

class App {
	constructor() {
		this.api    = new apiWorker();
		this.cards  = new RepoCard( this );

		this.state = {
			loading: false,
			filter: 'Todas as Linguagens',
			ghuser: 'wilfernandesjr',
			sort: 'sortStarsDescending'
		};

		this.reloadCards( true );
		this.addEventListeners();
	}

	reloadCards( callApiAgain ) {
		if( callApiAgain ) {
			this.cards.setData(null);
		}

		this.setGHUserToDOM();
		this.startLoading();
		this.makeGHCall();
	}

	setGHUserToDOM() {
		document.getElementById( 'ghuser' ).innerHTML = this.state.ghuser;
		document.querySelector( '.ghuser-input' ).value = this.state.ghuser;
	}

	addEventListeners() {
		document.querySelector( '.order-select' ).addEventListener( 'change', this.orderChanged.bind( this ) );
		document.querySelector( '.filter-select' ).addEventListener( 'change', this.filterChanged.bind( this ) );
		document.getElementById( 'change-ghuser' ).addEventListener( 'click', this.openGHUserChange.bind( this ) );
		document.querySelector( '.ghuser-button' ).addEventListener( 'click', this.GHUserChange.bind( this ) );
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

	openGHUserChange( e ) {
		e.preventDefault();
		document.querySelector( '.new-ghuser' ).classList.add( 'active' );
	}

	GHUserChange() {
		var newGhUser = document.querySelector( '.ghuser-input' ).value;

		this.setState({
			...this.state,
			ghuser: newGhUser,
			'filter': 'Todas as Linguagens'
		});

		this.cards.clearCards();

		return this.reloadCards( true );
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