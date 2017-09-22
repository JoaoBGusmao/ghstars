class ApiWorker{
	constructor( url ) {
		this.baseUrl = '';
		this.route = '';
		this.cb = () => {};
		console.log(url);
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
		xhttp.open("GET", "https://api.github.com/", true);
		xhttp.send();
	}

	whenDone( cb ) {
		this.cb = cb;
		return this;
	}

	checkForFields() {
		try {
			if( this.baseUrl == '' )
				throw "baseUrl não foi fornecido para a chamada";
			if( this.route == '' )
				throw "route não foi fornecido para a chamada";
		} catch( e ) {
			console.log( "ApiWorker Error: " + e );
			return false;
		}
		return true;
	}

	complete( data, cb ) {
		return cb(data);
	}
}

export default ApiWorker