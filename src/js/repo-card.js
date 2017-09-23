import Templating from './templating'

class RepoCard {
	constructor( app ) {
		this.app      = app;
		this.template = new Templating();
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
		if( this.template.getTemplate() == null ) {
			this.template.setTemplate( this.template.getHtmlTemplateFromDOM() );
		}

		var render = this.template.getTemplate();
		
		render = this.template.variablesReplace( [
			{ prop: 'name', to: item.name },
			{ prop: 'html_url', to: item.html_url },
			{ prop: 'stargazers_count', to: ( item.stargazers_count ).toLocaleString() },
			{ prop: 'description', to: item.description || 'Sem descrição' },
			{ prop: 'owner.login', to: item.owner.login },
			{ prop: 'open_issues_count', to: item.open_issues_count },
			{ prop: 'created_at', to: item.created_at },
			{ prop: 'updated_at', to: item.updated_at },
			{ prop: 'language', to: item.language },
		], render );

		render = this.fixImageSrc( render );

		this.template.appendHTML( '.repo-list', render );
	}

	fitInFilter( item ) {
		var fit = item.language === this.app.state.filter;

		return fit;
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