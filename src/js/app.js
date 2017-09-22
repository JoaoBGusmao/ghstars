import apiWorker from './apiWorker'
import $ from 'jquery'

import '../css/style.scss'

window.$ = $

const registerHandlers = () => {
	const worker = new apiWorker();
	return (
		worker.createCall()
			.api( 'http:///asssasd' )
			.toRoute( '/' )
			.whenDone( dataReceived )
			.make()
		// console.log( document.querySelector( '.card-repo' ).innerHTML )
		//document.querySelector('body').addEventListener('click', () => didClicked())
	)
}

const dataReceived = (data) => {
	console.log( data )
}

const didClicked = () => {

}

registerHandlers()