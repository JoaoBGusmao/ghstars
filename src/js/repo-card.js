class RepoCard {
	constructor() {
		this.state = {
			loading: false,
			test: 'sss'
		};

		this.template = null;
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

	showCards( response, done ) {
		var ghStars = JSON.parse( response );
		// var ordered = ghStars.sort( ( a, b ) => (
		// 	parseInt( a.stargazers_count ) < parseInt( b.stargazers_count )
		// ))
		ghStars.map( ( item, index ) => {
			this.renderCard( item );
		})

		this.stopLoading();
	}

	renderCard( item ) {
		if( this.template == null ) {
			this.template = this.getTemplate();
		}

		var render = this.template;
		render = this.prepareToRender( render, item );

		var temp = document.createElement('div');
		temp.innerHTML = render;
		var htmlObject = temp.firstChild;
		htmlObject.classList.add( 'active' );

		document.querySelector( '.repo-list' ).appendChild( htmlObject );
	}

	prepareToRender( render, item ) {
		var res = render;
		res = res.replace( '{name}', item.name );
		res = res.replace( '{html_url}', item.html_url );
		res = res.replace( '{stargazers_count}', ( item.stargazers_count ).toLocaleString() );
		res = res.replace( '{description}', item.description );

		return res;
	}

	getTemplate() {
		var tpl = document.querySelector( '.repo-list .card-repo' ).outerHTML;
		document.querySelector( '.repo-list' ).innerHTML = '';
		
		return tpl;
	}

	setState( state ) {
		this.state = state;
	}
}

export default RepoCard;