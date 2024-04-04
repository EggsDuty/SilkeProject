import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import Header from "../components/Header"
import Sidebar from '../components/Whiteboard/Sidebar'

function Whiteboard() {
	return (
		<>
			<Header transparent={false} />
			<Sidebar />
			<div className="ml-32" style={{ position: 'fixed', inset: 0 }}>
				<Tldraw />
			</div>
		</>
	)
}

export default Whiteboard;