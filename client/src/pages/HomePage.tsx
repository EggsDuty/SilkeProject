import Header from "../components/Header"
import Box from "../components/HomePage/Box";

function HomePage(){
    const isFirstTime = true;
    return(
        <div className="bg-test h-screen w-screen absolute bg-cover text-center">
            <Header />
            <h1 className="mt-28 text-7xl bg-gradient-to-r from-blue-400 via-gray-50 to-blue-400 w-max m-auto text-transparent bg-clip-text font-bold">Welcome{isFirstTime ? "" : " back"}!</h1>
            <p className="mt-10 m-auto text-white font-medium">What would you like to choose?</p>
            <div className="flex flex-wrap mt-20 mx-20">
                <Box img="test_calculator_picture.png" header="Calculators" text="Choose from our wide variety of calculators???" />
                <Box img="?" header="Whiteboard" text="Write down all your calculations while still having any calculator on the board???" />
                <Box img="?" header="Groups" text="Make a group with your colleagues to work on the same board!" />
            </div>
        </div>
    )
}

export default HomePage