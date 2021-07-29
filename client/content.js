const { useState, useEffect } = React;

function checkboxClick() {}

function Item() {
	return (
		<div className='element-wrapper'>
			<div className='element'>
				<div className='priority'></div>
				<h2>Make a Todo app</h2>
				<h2 className='status'>in Progress</h2>
				<div className='more-wrapper'>
					<div className='more'></div>
				</div>
			</div>
			<div className='more-container'>
				<h3>Rename</h3>
				<h3>Change priority</h3>
				<h3>Delete</h3>
			</div>
		</div>
	);
}

function AppContainer() {
	return (
		<div className='container'>
			<div className='header'>
				<h1>Todos</h1>
				<div className='selectors'>
					<button className='selector active'>All</button>
					<button className='selector'>Todo</button>
					<button className='selector'>In progress</button>
					<button className='selector'>Complete</button>
				</div>
			</div>
			<div className='items'>
				<Item />
			</div>
		</div>
	);
}

function App() {
	return <AppContainer />;
}
ReactDOM.render(<App />, document.getElementById('content'));
