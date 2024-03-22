import Header from "../components/Header"
import Box from "../components/HomePage/Box";


function CalculatorsPage() {

    return (
        <>
            <div className="w-screen absolute text-center bg-repeat-y">
                <Header />
                <h1 className="mt-28 text-7xl bg-gradient-to-r text-white w-max m-auto text-transparent bg-clip-text font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]" >Calculators</h1>
                <p className="mt-10 m-auto text-white font-medium">Choose from our wide variety of calculators</p>
                <div className="flex flex-wrap mt-20 mx-auto space-x-20 justify-center">
                    <Box link="/standard-calculator" img="standard_calculator_picture.svg" header="Standard Calculator" text="Do simple calculations" />
                    <Box link="/scientific-calculator" img="scientific_calculator_picture.svg" header="Scientific Calculator" text="Try out some advanced calculations" />
                    <Box link="/graphing-calculator" img="graphing_calculator_picture.svg" header="Graphing Calculator" text="Draw any function you need" />
                </div>

            </div>
        </>
    )
}

export default CalculatorsPage