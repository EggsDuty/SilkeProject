import { ChangeEvent, useState } from 'react';
import { Tldraw, track, useEditor } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { useYjsStore } from '../useYjsStore.ts';
import Header from '../components/Header';
import Sidebar from '../components/Whiteboard/Sidebar.tsx';

const HOST_URL =
    import.meta.env.MODE === 'development'
        ? 'ws://localhost:1234'
        : 'wss://demos.yjs.dev';

export default function YjsExample() {
    const [roomId, setRoomId] = useState('');

    const store = useYjsStore({
        roomId: roomId,
        hostUrl: HOST_URL,
    });

    const handleRoomIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRoomId(event.target.value);
    };

    return (
        <>
            <Header transparent={false} />
			<div className='absolute mt-10 ml-44 z-10'>
                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        value={roomId}
                        onChange={handleRoomIdChange}
                        style={{ zIndex: 999, border: '1px solid #ccc', // Border style
                        borderRadius: '4px', // Border radius
                        padding: '8px', }} // Ensure the text box is displayed in front
                    />
                </div>
            <Sidebar />

            <div className="ml-32" style={{ position: 'fixed', inset: 0 }}>
                <Tldraw
                    autoFocus
                    store={store}
                    components={{
                        SharePanel: NameEditor,
                    }}
                />
                
            </div>
        </>
    );
}

const NameEditor = track(() => {
    const editor = useEditor();

    const { color, name } = editor.user.getUserPreferences();

    return (
        <div style={{ pointerEvents: 'all', display: 'flex' }}>
            <input
                type="color"
                value={color}
                onChange={(e) => {
                    editor.user.updateUserPreferences({
                        color: e.currentTarget.value,
                    });
                }}
            />
            <input
                value={name}
                onChange={(e) => {
                    editor.user.updateUserPreferences({
                        name: e.currentTarget.value,
                    });
                }}
            />
        </div>
    );
});
