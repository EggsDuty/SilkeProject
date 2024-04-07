import { Tldraw, track, useEditor } from 'tldraw'
import 'tldraw/tldraw.css'
import { useYjsStore } from '../useYjsStore.ts'
import Header from "../components/Header"
import Sidebar  from '../components/Whiteboard/Sidebar.tsx'

const HOST_URL =
	import.meta.env.MODE === 'development'
		? 'ws://localhost:1234'
		: 'wss://demos.yjs.dev'

export default function YjsExample() {
	const store = useYjsStore({
		roomId: 'example17',
		hostUrl: HOST_URL,
	})

	return (
		<>
			<Header transparent={false} />
            <Sidebar />
            <div className="ml-32" style={{ position: 'fixed', inset: 0 }}>

			<Tldraw
				autoFocus
				//store={store}
				components={{
					SharePanel: NameEditor,
				}}
			/>
		</div>
		</>
	)
}

const NameEditor = track(() => {
	const editor = useEditor()

	const { color, name } = editor.user.getUserPreferences()

	return (
		<div style={{ pointerEvents: 'all', display: 'flex' }}>
			<input
				type="color"
				value={color}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						color: e.currentTarget.value,
					})
				}}
			/>
			<input
				value={name}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						name: e.currentTarget.value,
					})
				}}
			/>
		</div>
	)
})