import apiWorker from './api-worker'
import RepoCard from './repo-card'
import ghemojis from './ghemojis'

import '../css/style.scss'

class App {
	constructor() {
		this.api    = new apiWorker();
		this.cards  = new RepoCard( this );

		var ghuser = this.getUserFromUrl();

		if( ! ghuser ) {
			ghuser = 'wilfernandesjr';
		}

		this.state = {
			loading: false,
			filter: 'Todas as Linguagens',
			ghuser: ghuser,
			sort: 'sortStarsDescending',
			searching: false
		};

		this.reloadCards( true );
		this.addEventListeners();
	}

	getUserFromUrl() {
		return this.get('ghuser');
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
	}

	addEventListeners() {
		document.querySelector( '.order-select' ).addEventListener( 'change', this.orderChanged.bind( this ) );
		document.querySelector( '.filter-select' ).addEventListener( 'change', this.filterChanged.bind( this ) );
		document.getElementById( 'change-ghuser' ).addEventListener( 'click', this.toggleGHUserChange.bind( this ) );
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

	toggleGHUserChange( e ) {
		if( e )
			e.preventDefault();

		var ghUserClasses = document.querySelector( '.new-ghuser' ).classList;
		var changeUser = document.getElementById( 'change-ghuser' );

		if( ghUserClasses.contains( 'active' ) ) {
			this.setState({
				...this.state,
				searching: false,
			});

			changeUser.innerHTML = changeUser.dataset.default;

			return ghUserClasses.remove( 'active' );
		}
		this.setState({
			...this.state,
			searching: true,
		});

		changeUser.innerHTML = changeUser.dataset.close;

		return ghUserClasses.add( 'active' );
	}

	GHUserChange() {
		var newGhUser = document.querySelector( '.ghuser-input' ).value;

		this.setState({
			...this.state,
			ghuser: newGhUser,
			filter: 'Todas as Linguagens'
		});

		this.cards.clearCards();

		return this.reloadCards( true );
	}

	makeGHCall() {
		this.hideErrors();
		if( this.cards.data != null ) {
			return this.dataReceived();
		}
		this.api.api( 'https://api.github.com' )
			  .toRoute( `users/${this.state.ghuser}/starred` )
			  .whenDone( this.dataReceived.bind( this ) )
			  .throw( this.apiError.bind(this) )
			  .make()
	}

	dataReceived( data ) {
		if( this.cards.data == null ) {
			this.cards.setData( data );
		}
		this.cards.showCards()
		if( this.state.searching ) {
			this.toggleGHUserChange(null);
		}
	}

	apiError( status ) {
		var error = "Ocorreu um erro desconhecido ao solicitar a API do Github";
		
		if( status == 403 ) {
			error = "Você não tem permissão para acessar a API";
		}

		if( status == 404 ) {
			error = "O usuário não foi encontrado";
		}
		this.stopLoading();
		this.showError( error );
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

	showError( error ) {
		var errorWrapper = document.getElementById( 'error-wrapper' );
		errorWrapper.classList.add( 'active' );
		errorWrapper.innerHTML = error;
		document.querySelector( '.main-content' ).classList.add( 'has-error' )
	}

	hideErrors() {
		var errorWrapper = document.getElementById( 'error-wrapper' );
		errorWrapper.classList.remove( 'active' );
		errorWrapper.innerHTML = '';
		document.querySelector( '.main-content' ).classList.remove( 'has-error' );
	}

	get( name ){
		if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
		return decodeURIComponent(name[1]);
	}
}

new App();