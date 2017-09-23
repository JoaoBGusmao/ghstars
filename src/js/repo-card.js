class RepoCard {
	constructor( app ) {
		this.app      = app;
		this.template = null;
	}

	startLoading() {
		this.app.setState({
			...this.app.state,
			loading: true
		});
		document.querySelector( '.loading' ).classList.add( 'active' );
	}

	stopLoading() {
		this.app.setState({
			...this.app.state,
			loading: false
		});
		document.querySelector( '.loading' ).classList.remove( 'active' );
	}

	showCards( response, done ) {
		var ghStars = JSON.parse( response );

		ghStars.sort( ( a, b ) => this.sortStarsDescending( a, b ) );

		ghStars.map( ( item, index ) => {
			if( this.fitInFilter( item ) )
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
		res = res.replace( '{description}', item.description || 'Sem descrição' );
		res = res.replace( '{owner.login}', item.owner.login );
		res = res.replace( '{open_issues_count}', item.open_issues_count );
		res = res.replace( '{created_at}', item.created_at );
		res = res.replace( '{updated_at}', item.updated_at );
		res = res.replace( '{language}', item.language );

		res = this.fixImageSrc( res );

		return res;
	}

	fitInFilter( item ) {
		var fit = item.language === this.app.state.filter;

		return fit;
	}

	getTemplate() {
		var tpl = document.querySelector( '.repo-list .card-repo' ).outerHTML;
		document.querySelector( '.repo-list' ).innerHTML = '';
		
		return tpl;
	}

	fixImageSrc( res ) {
		var fixed = res.replace( 'data-img-src', 'src' );

		return fixed;
	}

	sortStarsDescending( a, b ) {
		return parseInt( b.stargazers_count ) - parseInt( a.stargazers_count );
	}

	sortStarsAscending( a, b ) {
		return parseInt( a.stargazers_count ) - parseInt( b.stargazers_count );
	}

	sortIssuesDescending( a, b ) {
		return parseInt( b.open_issues_count ) - parseInt( a.open_issues_count );
	}

	sortIssuesAscending( a, b ) {
		return parseInt( a.open_issues_count ) - parseInt( b.open_issues_count );
	}

	sortName( a, b ) {
		if( a.name.toLowerCase() < b.name.toLowerCase() ) return -1;
		if( a.name.toLowerCase() > b.name.toLowerCase() ) return 1;
		return 0;
	}
}

export default RepoCard;