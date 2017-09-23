import Templating from './templating'

class RepoCard {
	constructor( app ) {
		this.app      = app;
		this.data     = null;
		this.template = new Templating();
		this.filters  = [];
	}

	showCards() {
		if( this.template.getTemplate() != null ) {
			this.clearResults();
		}

		var ghStars = JSON.parse( this.data );

		this.loadLanguagesFilter( ghStars );

		ghStars.sort( ( a, b ) => this.sortCards( a, b ) );

		ghStars.map( ( item, index ) => {
			if( this.fitInFilter( item ) )
				this.renderCard( item );
		})

		this.app.stopLoading();
	}

	sortCards( a, b ) {
		var sort = this.app.state.sort;
		
		if( sort == 'sortName' )
			return this.sortName( a, b );

		if( sort == 'sortStarsDescending' )
			return this.sortStarsDescending( a, b );

		if( sort == 'sortStarsAscending' )
			return this.sortStarsAscending( a, b );

		if( sort == 'sortIssuesDescending' )
			return this.sortIssuesDescending( a, b );

		if( sort == 'sortIssuesAscending' )
			return this.sortIssuesAscending( a, b );

		return this.sortStarsDescending( a, b );
	}

	validateFilter() {
		if( this.filters.indexOf( this.app.state.filter ) == -1 ) {
			this.app.state.filter = '';
		}
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

	clearResults() {
		document.querySelector( '.repo-list' ).innerHTML = '';
	}

	fitInFilter( item ) {
		var fit = item.language === this.app.state.filter || this.app.state.filter === '';

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

	loadLanguagesFilter( repos ) {
		if( repos != null ) {
			repos.forEach( ( item ) => {
				if( item.language != null && this.filters.indexOf( item.language ) == -1 ) {
					this.filters.push( item.language );
				}
			});

			this.filters.sort();

			this.putFiltersToSelect();
		}
	}

	putFiltersToSelect() {
		
		this.filters.forEach( ( item ) => {
			var temp       = document.createElement('div');
			temp.innerHTML = `<option value="${item}">${item}</option>`;
			var htmlObject = temp.firstChild;
			
			document.querySelector( '.filter-select' ).appendChild( htmlObject );
		})
	}

	setData( data ) {
		this.data = data;
	}
}

export default RepoCard;