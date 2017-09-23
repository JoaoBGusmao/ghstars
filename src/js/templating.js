class Templating {
	constructor() {
		this.template = null;
		this.wrapper = null;
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
			res = this.replaceAll( res, `{${item.prop}}`, item.to )
		));

		return res;
	}

	appendHTML( render ) {
		var temp       = document.createElement('div');
		temp.innerHTML = render;
		var htmlObject = temp.firstChild;
		
		htmlObject.classList.add( 'active' );

		this.wrapper.appendChild( htmlObject );
	}

	getHtmlTemplateFromDOM( selector ) {
		var tpl = document.querySelector( selector );
		var html = tpl.outerHTML;

		this.wrapper = tpl.parentNode;
		this.wrapper.innerHTML = '';

		return html;
	}

	replaceAll( str, find, replace ) {
		return str.replace(new RegExp(find, 'g'), replace);
	}
}

export default Templating