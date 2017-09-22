class ApiWorker{
	constructor() {
		this.baseUrl = '';
		this.route = '';
		this.cb = () => {};
	}

	createCall() {
		return this;
	}

	api( baseUrl ) {
		this.baseUrl = baseUrl;
		return this;
	}

	toRoute( route ) {
		this.route = route;
		return this;
	}

	getApiUrl() {
		return `${this.baseUrl}/${this.route}`;
	}

	make() {
		if( ! this.checkForFields() )
			return;

		var xhttp = new XMLHttpRequest();
		var classContext = this;
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				classContext.complete( this.responseText, classContext.cb );
			}
		};
		xhttp.open( 'GET', this.getApiUrl() , true );
		xhttp.send();
	}

	whenDone( cb ) {
		this.cb = cb;
		return this;
	}

	checkForFields() {
		try {
			if( this.baseUrl == '' )
				throw 'baseUrl não foi fornecido para a chamada';
			if( this.route == '' )
				throw 'route não foi fornecido para a chamada';
		} catch( e ) {
			console.log( 'ApiWorker Error: ' + e );
			return false;
		}
		return true;
	}

	complete( data, cb ) {
		return cb(data);
	}
}

export default ApiWorker