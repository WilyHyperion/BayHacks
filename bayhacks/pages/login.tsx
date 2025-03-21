import React from 'react';
import { Inria_Serif } from 'next/font/google';
import { Inter } from 'next/font/google';

export default function Login() {
    const backgroundText = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        color: 'rgba(0, 0, 0, 0.05)', // Adjust transparency here
        fontSize: '12vh', // Increase font size as needed
        textAlign: 'center',
        zIndex: 0, // Ensure it's behind the form
        pointerEvents: 'none', // Allows interactions with elements behind the overlay
        whiteSpace: 'nowrap', // Prevents text wrapping
    };

    const overlayPositions = [
        { top: '-11vh', left: '-10vh' },
        { top: '0vh', left: '-115vh' },
        { top: '11vh', left: '-300vh' },
        { top: '22vh', left: '-170vh' },
        { top: '33vh', left: '-230vh' },
        { top: '44vh', left: '-210vh' },
        { top: '55vh', left: '-120vh' },
        { top: '66vh', left: '-80vh' },
        { top: '77vh', left: '-20vh' },
        { top: '88vh', left: '-130vh' },
        { top: '99vh', left: '-180vh' }
    ];

    const containerStyle = {
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0', // Adjust as needed
        overflow: 'hidden' // Ensure no overflow
    };

    const formStyle = {
        position: 'relative',
        zIndex: 2, // Ensure it's above the overlay text
        width: '100vw',
        height: '100vh',
        padding: '30vh 35vw',
        backgroundImage: 'radial-gradient(rgba(255,255,255,1) 14%, rgba(0,0,0,0) 76%)',
        borderRadius: '8px',
    };
    const vignette = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(0,0,0,0) 40%, rgba(255,255,255,1) 100%)',
        backgroundBlendMode: 'overlay',
        zIndex: 1
    };
    const inputBox = {
        width: '100%',
        height: '50px',
        fontSize: '20px',
        marginBottom: '20px',
        padding: '10px',
        border: 'none',
        borderBottom: '2px solid #000',
        outline: 'none',
        background: 'transparent',
        fontFamily: 'Inter',
        color: 'black'
    };
    const inputPassword = {
        width: '70%',
        marginLeft: '10%',
    }

    const button = {
        width: '10%',
        height: '50%',
        alignSelf: 'center',
        color: 'black'
    }
    React.useEffect(() => {
        if (document.cookie !== "") {
            window.location.replace('/');
        }
      }, []);
    
    return (
        <div style={containerStyle}>
            {/* Overlay text divs */}
            <div style={vignette}></div>
            {overlayPositions.map((position, index) => (
                <div
                    key={index}
                    style={{
                        ...backgroundText,
                        top: position.top,
                        left: position.left
                    }}
                >
                    Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share
                </div>
            ))}
            {/* Login form */}
            <div style={formStyle}>
                <h1 style={{ fontFamily: 'Inria Serif', color: 'black', textAlign: 'center', fontSize: "5vh" }}>Login</h1>
                <input type="text" id="username" placeholder="Username" style={inputBox}/>
                <div style={{display:'flex', alignContent:'center'}}>
                    <input type="password" id="password" placeholder="Password" style={inputBox}/>
                    <button
                    style={button}
                        
                        onClick={async () => {
                            let username = (document.getElementById("username") as HTMLInputElement).value;
                            let password = (document.getElementById("password") as HTMLInputElement).value;
                            let r = await fetch("/api/login", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({  
                                    username: username,
                                    password: password,
                                }),
                            });
                            let t = await r.json();
                            if (t.message === "Logged in") {
                                window.location.href = "/";
                            } else {
                                alert(t.message);
                            }
                        }}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
