import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import Header from "../components/Header"

function Whiteboard() {
	return (
		<>
			<Header transparent={false} />
			<div style={{ position: 'fixed', inset: 0 }}>
				<Tldraw />
			</div>
		</>
	)
}

export default Whiteboard;