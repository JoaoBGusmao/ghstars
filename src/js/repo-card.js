import Templating from './templating'
import ghemojis from './ghemojis'

class RepoCard {
	constructor( app ) {
		this.app      = app;
		this.data     = null;
		this.template = new Templating();
		this.filters  = [];
		this.filterTemplate = new Templating();
		this.ghemojis = new ghemojis();
	}

	showCards() {
		if( this.template.getTemplate() != null ) {
			this.template.wrapper.innerHTML = '';
		}

		var ghStars = JSON.parse( this.data );

		if( ghStars.length == 0 ) {
			this.app.showError( 'Nenhum repositório com star encontrado para o usuário' );
			this.app.stopLoading();
			return null;
		}

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
		
		switch( sort ) {
			case 'sortName':
				if( a.name.toLowerCase() < b.name.toLowerCase() ) return -1;
				if( a.name.toLowerCase() > b.name.toLowerCase() ) return 1;
				return 0;
			case 'sortStarsAscending':
				return parseInt( a.stargazers_count ) - parseInt( b.stargazers_count );
			case 'sortIssuesDescending':
				return parseInt( b.open_issues_count ) - parseInt( a.open_issues_count );
			case 'sortIssuesAscending':
				return parseInt( a.open_issues_count ) - parseInt( b.open_issues_count );
			case 'sortStarsDescending':
			default:
				return parseInt( b.stargazers_count ) - parseInt( a.stargazers_count );
		}
	}

	validateFilter() {
		if( this.filters.indexOf( this.app.state.filter ) == -1 ) {
			this.app.state.filter = '';
		}
	}

	renderCard( item ) {
		if( this.template.getTemplate() == null ) {
			this.template.setTemplate( this.template.getHtmlTemplateFromDOM( '.repo-list .card-repo' ) );
		}

		var render = this.template.getTemplate();
		
		render = this.template.variablesReplace( [
			{ prop: 'name', to: item.name },
			{ prop: 'html_url', to: item.html_url },
			{ prop: 'stargazers_count', to: ( item.stargazers_count ).toLocaleString() },
			{ prop: 'description', to: this.ghemojis.replace( item.description ) || 'Sem descrição' },
			{ prop: 'owner.login', to: item.owner.login },
			{ prop: 'open_issues_count', to: item.open_issues_count },
			{ prop: 'created_at', to: this.formatDate( item.created_at ) },
			{ prop: 'updated_at', to: this.formatDate( item.updated_at ) },
			{ prop: 'language', to: item.language || 'Sem Linguagem' },
		], render );

		render = this.fixImageSrc( render );

		this.template.appendHTML( render );
	}

	fitInFilter( item ) {
		var fit = item.language === this.app.state.filter
				|| this.app.state.filter === 'Todas as Linguagens'

		return fit;
	}

	fixImageSrc( res ) {
		var fixed = res.replace( 'data-img-src', 'src' );

		return fixed;
	}

	loadLanguagesFilter( repos ) {
		if( repos != null ) {
			repos.forEach( ( item ) => {
				if( item.language != null && this.filters.indexOf( item.language ) == -1 ) {
					this.filters.push( item.language );
				}
			});

			this.filters.sort();

			this.filters.unshift( 'Todas as Linguagens' )

			this.putFiltersToSelect();
		}
	}

	putFiltersToSelect() {
		if( this.filterTemplate.getTemplate() == null ) {
			this.filterTemplate.setTemplate(
				this.filterTemplate.getHtmlTemplateFromDOM( '.filter-select option' )
			);
		}

		this.filters.forEach( ( item, index ) => {
			if( document.querySelector( `option[value="${item}"]` ) != null ) {
				return;
			}

			var render = this.filterTemplate.getTemplate();
			render = this.template.variablesReplace( [
				{ prop: 'language', to: item || 'Sem Linguagem' },
			], render );

			this.filterTemplate.appendHTML( render )
		})
	}

	setData( data ) {
		this.data = data;
	}

	clearCards() {
		this.setData( null );
		this.filterTemplate.wrapper.innerHTML = '';
		this.filters = [];
	}

	formatDate( date ) {
		var timestamp = Date.parse( date );
		var date      = new Date( timestamp );
		var day       = date.getDate();
		var month     = ("0" + (date.getMonth() + 1)).slice(-2);
		var year      = date.getFullYear();

		return `${day}/${month}/${year}`;
	}
}

export default RepoCard;