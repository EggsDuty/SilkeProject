import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

function Whiteboard () {
    return (
		<div style={{ position: 'fixed', inset: 0 }}>
			<Tldraw />
		</div>
	)
}

export default Whiteboard;