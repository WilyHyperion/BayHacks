import Image from "next/image";
import localFont from "next/font/local";
import { Inria_Serif } from 'next/font/google';
import React from 'react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {

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

  const texts = [
      'Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share',
      'N   Quiz Study Summarize Learn Share &nbsp; <span style="color: rgba(0, 0, 0, 0.85);"><b>StudyCues</b></span> &nbsp; Note Quiz Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share',
      'Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share',
      'Note Quiz Study Summa Learn Share &nbsp; <a style="color: rgba(0, 0, 0, 0.6);"><b>Note</b></a> &nbsp; Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share',
      '             dsadsaaaaadasd        Note            Quiz Study Summarize Learn Share Note Quiz Study&nbsp; <a  style="color: rgba(0, 0, 0, 0.6);"><b>Summarize</b></a> &nbsp; Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share',
      '&nbsp &nbsp &nbsp &nbsp o t  e Quiz Study Summarize Learn Share Note &nbsp; <a style="color: rgba(0, 0, 0, 0.6);"><b>Quiz</b></a> &nbsp; Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share',
      'dashte Quiz Summarize Learn Share Note Quiz &nbsp; <a  style="color: rgba(0, 0, 0, 0.6);"><b>Study</b></a> &nbsp; Summarize Learn Share Note Quiz Study Summarize Learn Share',
      '  Quiz Study Summarize Learn &nbsp; <a  style="color: rgba(0, 0, 0, 0.6);"><b>Share</b></a> &nbsp; Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share',
      'aSummarize Learn Share Note Quiz &nbsp; <a  style="color: rgba(0, 0, 0, 0.6);"><b>Log Out</b></a> &nbsp; Study Summarize Learn Share Note Quiz Study Summarize Learn Share',
      'Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share',
      'Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share'
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
      padding: '20px',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  };
  
  const vignette = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'radial-gradient(circle, rgba(0,0,0,0) 40%, rgba(255,255,255,1) 100%)',
      backgroundBlendMode: 'overlay',
      zIndex: 1
  };
  React.useEffect(() => {
    if (document.cookie == "") {
        window.location.replace('/login');
    }
  }, []);
  

  return (
    <div style={containerStyle}>
    {/* Overlay text divs */}
    {overlayPositions.map((position, index) => (
        <div
            key={index}
            style={{
                ...backgroundText,
                top: position.top,
                left: position.left
            }}
            dangerouslySetInnerHTML={{ __html: texts[index] }}
        />
    ))}
    {/* Transparent box with redirect link */}
    <div
                style={{
                    position: 'absolute',
                    top: '27vh', // Adjust position to align with specific text
                    left: '18vh', // Adjust position to align with specific text
                    width: '13vw', // Adjust width
                    height: '10vh', // Adjust height
                    backgroundColor: 'rgba(255, 255, 255, 0)', // Semi-transparent
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 2, // Ensure it's above the text
                }}
            >
                <a
                    href="/logged/home" // Redirect link
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        textDecoration: 'none',
                        color: 'transparent', // Hide the link text
                    }}
                />
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: '38vh', // Adjust position to align with specific text
                    left: '63vw', // Adjust position to align with specific text
                    width: '30vw', // Adjust width
                    height: '10vh', // Adjust height
                    backgroundColor: 'rgba(255, 255, 255, 0)', // Semi-transparent
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 2, // Ensure it's above the text
                }}
            >
                <a
                    href="/logged/summarize" // Redirect link
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        textDecoration: 'none',
                        color: 'transparent', // Hide the link text
                    }}
                />
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: '49vh', // Adjust position to align with specific text
                    left: '20vw', // Adjust position to align with specific text
                    width: '13vw', // Adjust width
                    height: '10vh', // Adjust height
                    backgroundColor: 'rgba(255, 255, 255, 0)', // Semi-transparent
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 2, // Ensure it's above the text
                }}
            >
                <a
                    href="/logged/test" // Redirect link
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        textDecoration: 'none',
                        color: 'transparent', // Hide the link text
                    }}
                />
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: '60vh', // Adjust position to align with specific text
                    left: '53vw', // Adjust position to align with specific text
                    width: '15vw', // Adjust width
                    height: '10vh', // Adjust height
                    backgroundColor: 'rgba(255, 255, 255, 0)', // Semi-transparent
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 2, // Ensure it's above the text
                }}
            >
                <a
                    href="/logged/study" // Redirect link
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        textDecoration: 'none',
                        color: 'transparent', // Hide the link text
                    }}
                />
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: '71vh', // Adjust position to align with specific text
                    left: '32vw', // Adjust position to align with specific text
                    width: '15vw', // Adjust width
                    height: '10vh', // Adjust height
                    backgroundColor: 'rgba(255, 255, 255, 0)', // Semi-transparent
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 2, // Ensure it's above the text
                }}
            >
                <a
                    href="/logged/share" // Redirect link
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        textDecoration: 'none',
                        color: 'transparent', // Hide the link text
                    }}
                />
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: '82vh', // Adjust position to align with specific text
                    left: '75vw', // Adjust position to align with specific text
                    width: '22vw', // Adjust width
                    height: '10vh', // Adjust height
                    backgroundColor: 'rgba(255, 255, 255, 0)', // Semi-transparent
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 2, // Ensure it's above the text
                }}
            >
                <a
                    href="/logout" // Redirect link
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        textDecoration: 'none',
                        color: 'transparent', // Hide the link text
                    }}
                />
            </div>
    {/* Login form */}
</div>
  );
}
