import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'
import Header from "../components/Header"

function Whiteboard () {
    return (
		<div style={{ position: 'fixed', inset: 0 }}>
			<Header />
			<Tldraw />
		</div>
	)
}

export default Whiteboard;