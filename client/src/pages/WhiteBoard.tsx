import { Tldraw, track, useEditor } from '@tldraw/tldraw';
import '@tldraw/tldraw/tldraw.css';
import { useYjsStore } from '../useYjsStore.ts';
import Header from '../components/Header';
import Sidebar from '../components/Whiteboard/Sidebar.tsx';
import { useParams } from 'react-router-dom';

const HOST_URL =
    import.meta.env.MODE === 'development'
        ? 'ws://localhost:1234'
        : 'wss://demos.yjs.dev';

export default function YjsExample() {
    const { groupID } = useParams();

    const store = useYjsStore({
        roomId: groupID,
        hostUrl: HOST_URL,
    });

    return (
        <div className="absolute h-screen w-screen overflow-hidden">
            <Header transparent={false} />
            <Sidebar />

            <div className="ml-32 mt-10" style={{ position: 'fixed', inset: 0 }}>
                {groupID && localStorage.getItem("uid") ? // Checking if user is a guest and NOT giving them a store (otherwise all guests would be drawing on the same whiteboard)
                    <Tldraw
                        autoFocus
                        store={store}
                        components={{
                            SharePanel: NameEditor,
                        }}
                    /> :
                    <Tldraw
                        autoFocus
                        components={{
                            SharePanel: NameEditor,
                        }}
                    />}
            </div>
        </div>
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
