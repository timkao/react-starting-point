import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
// import store from './store'
import {Main} from './components'

ReactDOM.render(
	
	<Main />,
	
	document.getElementById('root')
	)

//when something is in store, will look like this:
/*
ReactDOM.render(
	<Provider store={store}>
		<Main />
	</Provider>, 
	document.getElementById('root')
	)
	*/