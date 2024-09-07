import Image from "next/image";
import localFont from "next/font/local";
import { Inria_Serif } from 'next/font/google';

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
      'Note Quiz Study Summarize Learn Share &nbsp; <a href="/logged/addnote" style="color: rgba(0, 0, 0, 0.6);"><b>Note</b></a> &nbsp; Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share',
      'Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share',
      'Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share',
      'Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share',
      'Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share',
      'Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share Note Quiz Study Summarize Learn Share',
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
    {/* Login form */}
</div>
  );
}
