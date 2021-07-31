const { useState, useEffect, useRef, useReducer } = React;

function MoreMenu(props) {
	function handleDelete(e) {
		document.cookie = props.name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
		console.log('deleted ' + props.name);
		props.setMoreMenuVisible(false);
		window.location.reload();
	}
	const handleClick = (e) => {
		if (props.node.current.contains(e.target) || e.target.className == 'more') {
			return;
		}
		props.setMoreMenuVisible(false);
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, []);

	return (
		<div ref={props.node} className='more-container'>
			<h3>Rename</h3>
			<h3>Change priority</h3>
			<h3 onClick={(e) => handleDelete(e)}>Delete</h3>
		</div>
	);
}

function Item(props) {
	function toggleMoreMenu(moreMenuVisible, setMoreMenuVisible) {
		if (moreMenuVisible == false) {
			setMoreMenuVisible(true);
		} else {
			setMoreMenuVisible(false);
		}
	}
	const [menu, setMenu] = useState();
	const [moreMenuVisible, setMoreMenuVisible] = useState(false);
	const node = useRef();
	return (
		<div className='element-wrapper'>
			<div className='element'>
				<div className={props.priority}></div>
				<h2>{props.name}</h2>
				<h2 className={props.statusClass}>{props.status}</h2>
				<div ref={node} onClick={() => toggleMoreMenu(moreMenuVisible, setMoreMenuVisible)} className='more-wrapper'>
					<div className='more'></div>
				</div>
			</div>
			{moreMenuVisible && <MoreMenu node={node} name={props.name} setMoreMenuVisible={setMoreMenuVisible} />}
		</div>
	);
}

function NewItem(props) {
	function handleBackClick() {
		props.setNewActive(false);
	}
	function handleSaveClick() {
		var priority = document.getElementById('priority').value;
		var taskName = document.getElementById('taskName').value;
		var task = taskName + '=' + priority + '=' + 'TODO';
		document.cookie = task;
		console.log(document.cookie);
		props.setNewActive(false);
	}
	return (
		<div className='container'>
			<h1>New item</h1>
			<div className='priority-container'>
				<input id='taskName' className='input' type='text' placeholder='Task name' />
				<select id='priority'>
					<option default value hidden>
						Priority
					</option>
					<option value='low'>Low</option>
					<option value='medium'>Medium</option>
					<option value='high'>High</option>
				</select>
				<button className='button save' onClick={handleSaveClick}>
					Save
				</button>
				<button className='button cancel' onClick={handleBackClick}>
					Cancel
				</button>
			</div>
		</div>
	);
}

function AppContainer() {
	const [buttonClasses, setButtonClasses] = useState(['selector active', 'selector', 'selector', 'selector']);
	const [newActive, setNewActive] = useState(false);

	var items = [];

	function handleButtonClick(e, i) {
		if (e.target.className == 'selector') {
			var selectorsArray = new Array(4).fill('selector');
			selectorsArray[i] = 'selector active';
			setButtonClasses(selectorsArray);
		}
	}

	function handleNew() {
		if (newActive == false) {
			setNewActive(true);
		} else {
			setNewActive(false);
		}
	}

	function getItems() {
		var allData = document.cookie;
		var splittedData = allData.split(';');
		var arraySplittedData = [];
		splittedData.forEach((e) => {
			arraySplittedData.push(e.split('='));
		});
		console.log(allData);
		console.log(arraySplittedData);

		var numOfItems = splittedData.length;
		for (var i = 0; i < numOfItems; i++) {
			try {
				items.push(
					<Item
						key={i}
						name={arraySplittedData[i][0]}
						statusClass={'status ' + arraySplittedData[i][2].toString().toLowerCase()}
						status={arraySplittedData[i][2]}
						priority={'priority ' + arraySplittedData[i][1]}
					/>
				);
			} catch (e) {}
		}
	}

	getItems();

	return (
		<div className='page-wrapper'>
			{newActive != true && (
				<div className='container'>
					<div className='header'>
						<h1>Todos</h1>
						<div className='selectors'>
							<button onClick={(e) => handleButtonClick(e, 0)} className={buttonClasses[0]}>
								All
							</button>
							<button onClick={(e) => handleButtonClick(e, 1)} className={buttonClasses[1]}>
								Todo
							</button>
							<button onClick={(e) => handleButtonClick(e, 2)} className={buttonClasses[2]}>
								In progress
							</button>
							<button onClick={(e) => handleButtonClick(e, 3)} className={buttonClasses[3]}>
								Complete
							</button>
						</div>
					</div>
					<div className='items'>{items}</div>
					<div className='button-wrapper'>
						<div className='button-container' onClick={handleNew}>
							<div className='horizontal'></div>
							<div className='vertical'></div>
						</div>
					</div>
				</div>
			)}
			{newActive && <NewItem setNewActive={setNewActive} />}
		</div>
	);
}

function App() {
	return <AppContainer />;
}
ReactDOM.render(<App />, document.getElementById('content'));
