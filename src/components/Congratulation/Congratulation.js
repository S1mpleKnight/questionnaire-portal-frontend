import {NavBar} from "../NavBar/NavBar";

function Congratulation() {
    return (
        <>
            <div className="bg-light" style={{height: '100vh'}}>
                <NavBar auth={false}/>
                <div className="bg-white mt-4 border m-auto p-4" style={{width: '30vw'}}>
                    <h3 className="text-center mb-3">Thank you!</h3>
                    <p className="text-center">Your response was saved.</p>
                </div>
            </div>
        </>
    )
}

export default Congratulation;