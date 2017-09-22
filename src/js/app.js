import apiWorker from './api-worker'
import RepoCard from './repo-card'

import '../css/style.scss'

let cards = null;

const init = () => {
	const user   = 'wilfernandesjr';
	const worker = new apiWorker();
	cards = new RepoCard();

	cards.startLoading();

	worker.api( 'https://api.github.com' )
		  .toRoute( `users/${user}/starred` )
		  .whenDone( dataReceived )
		  .make()
}

const dataReceived = ( data ) => {
	cards.showCards( data );
}

init()