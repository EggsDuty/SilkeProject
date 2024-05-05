interface Props {
    guest: boolean
}

function NoRoute(props: Readonly<Props>) {
    return (
        <div className="absolute w-screen h-screen flex flex-col justify-center items-center">
            <div className="text-center">
                {!props.guest ?
                    <>
                        <h1 className="text-9xl text-white font-bold">404</h1>
                        <p className="text-2xl text-neutral-300">Click <a className="text-purple-300 hover:text-purple-100 underline" href="/home">here</a> to go back home.</p>
                    </> :
                    <>
                        <h1 className="text-5xl text-white font-bold mb-5">Something went wrong.</h1>
                        <p className="text-2xl text-neutral-300 ">Think there should be a page here?</p>
                        <p className="text-2xl text-neutral-300">Make sure you're <a className="text-purple-300 hover:text-purple-100 underline" href="/">logged in!</a></p>
                    </>
                }
            </div>
        </div>
    );
}

export default NoRoute;