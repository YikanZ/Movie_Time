import React from "react";
import { GoogleLogout } from "react-google-login";
import { googleLogout } from "@react-oauth/google";
import Button from "react-bootstrap/Button";

// function Logout( { setUser , clientId}) {
//     const onSuccess = () => {
//         googleLogout();
//         setUser(null);
//         localStorage.setItem("login", null);
//         console.log("Logout made Successfully");
//     };

//     const onFailure = (res) => {
//         let { error } = res;
//         // if (error === "idpiframe_initialization_failed") {
//         //   {onSuccess();}
//         // } else {
//             console.log("logout failed: response=", res);
//         // }
//     };


//     return (
//         <div>
//             <GoogleLogout
//             clientId={clientId}
//             buttonText="Logout"
//             onLogoutSuccess={onSuccess}
//             onFailure={onFailure}
//             ></GoogleLogout>
//         </div>
//     );
// }


// Different logout functon provided from Piazza by using Bootstrap button


function Logout( {setUser} ) {
    const onClick = () => {
        googleLogout();
        setUser(null);
        localStorage.setItem("login", null);
        console.log("Logout made Successfully");
    };

    return (
        <div>
            <button
                variant='light'
                onClick={onClick}
            >Logout</button>
        </div>
    );
}



export default Logout;