import apiWorker from './api-worker'

class Ghemojis {
	constructor() {
		this.api       = new apiWorker();
		this.cacheName =  'ghemojis';
		this.emojiLib  = this.getEmojiLib();
	}

	getEmojiLib() {
		return this.getFromLocal() || this.getFromApi();
	}

	getFromLocal() {
		try {
			var storage = JSON.parse( localStorage.getItem( this.cacheName ) );
			this.replaceBody();
			return storage;
		} catch(e) {
			return null;
		}

		return null;
	}

	getFromApi() {
		return this.api.api( 'https://api.github.com' )
						.toRoute( 'emojis' )
						.whenDone( this.saveCache.bind( this ) )
						.throw( this.apiError.bind(this) )
						.make()
	}

	saveCache( data ) {
		this.emojiLib = JSON.parse( data );
		localStorage.setItem( this.cacheName, data );
		this.replaceBody();
	}

	apiError() {
		console.log( "Não fo possível obter os emojis da API" );
	}

	replaceBody() {
		var pageBody = document.body.innerHTML;
		var replaced = this.replace( pageBody );
		document.body.innerHTML = replaced;
	}

	replace( text ) {
		if( text == null || ! this.isEmojiLibAvailable() ) {
			return text;
		}

		text = text.replace( new RegExp( '\\:(.\\S*?)\\:', 'g' ), (match, contents, s, offset) => {
			var img = this.getEmojiImg( contents );
			return img ? img : match;
		});

		return text;
	}

	getEmojiImg( emoji ) {
		if( this.emojiLib[ emoji ] != null ) {
			return this.getEmojiCode( this.emojiLib[ emoji ], emoji );
		}

		return false;
	}

	isEmojiLibAvailable() {
		return this.emojiLib != null;
	}

	getEmojiCode( img, name ) {
		return `<img class='gh-emoji' src="${img}" alt=":${name}:" />`;
	}
}

export default Ghemojis