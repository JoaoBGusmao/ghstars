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
		console.log( 'getting from local' );
		try {
			return JSON.parse( localStorage.getItem( this.cacheName ) );
		} catch(e) {
			return null;
		}

		return null;
	}

	getFromApi() {
		console.log( 'getting from api' );
		return this.api.api( 'https://api.github.com' )
						.toRoute( 'emojis' )
						.whenDone( this.saveCache.bind( this ) )
						.throw( this.apiError.bind(this) )
						.make()
	}

	saveCache( data ) {
		this.emojiLib = JSON.parse( data );
		localStorage.setItem( this.cacheName, data );
	}

	apiError() {

	}

	replace( text ) {
		if( text == null ) {
			return null;
		}

		text = text.replace( new RegExp( '\\:(.\\S*?)\\:', 'g' ), (match, contents, s, offset) => {
			return this.getEmojiImg( contents );
		});

		return text;
	}

	getEmojiImg( emoji ) {
		if( this.emojiLib[ emoji ] ) {
			return this.getEmojiCode( this.emojiLib[ emoji ] );
		}
		return null;
	}

	getEmojiCode( img ) {
		return `<img class='gh-emoji' src="${img}" />`;
	}
}

export default Ghemojis