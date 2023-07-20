import { useEffect, useState } from 'react';
import './App.css';

import * as io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function App() {
	const [room, setRoom] = useState("");

	const [message, setMessage] = useState('');
	const [msgReceived, setMsgReceived] = useState('');

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMsgReceived(data.message);
		})
	}, [socket]);

	const joinRoom = () => {
		if (room !== '') {
			socket.emit("join_room", room);
		}
	}

	const sendMessage = () => {
		socket.emit("send_message", {message, room});
		setMessage('');
	};

	return (
		<div className="App">
			<input placeholder='Room Number...'  onChange={(e) => {
				setRoom(e.target.value);
			}} />
			<button onClick={joinRoom}>Join Room</button>
			<input placeholder='Message...' value={message} onChange={(e) => {
				setMessage(e.target.value);
			}} />
			<button onClick={sendMessage}>Send Message</button>
			<h1>Message: </h1>
			{msgReceived}
		</div>
	);
}

export default App;
