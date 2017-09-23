class Templating {
	constructor() {
		this.template = null;
	}

	getTemplate() {
		var template = this.template;

		return template;
	}

	setTemplate( template ) {
		this.template = template;
	}

	variablesReplace( toReplace, render ) {
		var res = render;

		toReplace.forEach( ( item, index ) => (
			res = res.replace( `{${item.prop}}`, item.to )
		));

		return res;
	}

	appendHTML( selector, render ) {
		var temp       = document.createElement('div');
		temp.innerHTML = render;
		var htmlObject = temp.firstChild;
		
		htmlObject.classList.add( 'active' );

		document.querySelector( selector ).appendChild( htmlObject );
	}

	getHtmlTemplateFromDOM() {
		var tpl = document.querySelector( '.repo-list .card-repo' ).outerHTML;
		document.querySelector( '.repo-list' ).innerHTML = '';
		
		return tpl;
	}
}

export default Templating