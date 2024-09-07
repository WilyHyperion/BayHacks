import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Inria_Serif, Inter } from 'next/font/google';

// Apply the Inria Serif font with a specific weight
const inriaSerif = Inria_Serif({
    subsets: ['latin'],
    weight: '400', // Specify the weight here
});

// Apply the Inter font
const inter = Inter({
    subsets: ['latin'],
    weight: '400', // Specify the weight here
});

export default function Layout({ children }: { children: ReactNode }) {
    const router = useRouter();

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column', 
            minHeight: '100vh', 
            fontFamily: inriaSerif.style.fontFamily, // Apply the Inria Serif font
            backgroundColor: 'white'
        }}>
            {/* Back Button */}
            {router.pathname !== '/home' && (
                <button
                    onClick={() => router.push('/home')}
                    style={{
                        fontFamily: inter.style.fontFamily,
                        backgroundColor: '#808080',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '0.5vw',
                        padding: '0.5vw 1vw',
                        cursor: 'pointer',
                        position: 'fixed',
                        top: '1vw',
                        left: '1vw',
                    }}
                >
                    Back
                </button>
            )}

            {/* Main Content */}
            <main style={{ 
                flex: 1, // Take up all available space except for the footer
                padding: '2vw', 
                maxWidth: '80vw', 
                margin: 'auto',
                color: 'black'
            }}>
                {children}
            </main>

            {/* Footer for Summarize and Share Buttons */}
            {router.pathname !== '/home' && (
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    padding: '1vw', 
                    backgroundColor: 'white', 
                    borderTop: '1px solid #ccc', 
                    boxShadow: '0 -2px 5px rgba(0,0,0,0.1)', 
                    position: 'fixed', // Fix the footer to the bottom of the viewport
                    bottom: '0',
                    left: '0',
                    right: '0'
                }}>
                    {/* Summarize Button */}
                    <button
                        onClick={() => console.log('Summarize clicked')}
                        style={{ 
                            width: '60vw', // Adjust width to match input
                            padding: '0.5vw 1vw', 
                            fontFamily: inter.style.fontFamily, 
                            backgroundColor: '#808080', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '0.5vw', 
                            cursor: 'pointer', 
                            marginBottom: '1vh' // Space below the summarize button
                        }}
                    >
                        Summarize
                    </button>
                    {/* Share Section */}
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        width: '60vw', // Ensure the input and button align with the button above
                        gap: '1vw', // Space between input and button
                        marginTop: '1vh' // Space above the share section
                    }}>
                        <input
                            type="text"
                            id="user"
                            placeholder="Share with username"
                            style={{ 
                                flex: 1, 
                                padding: '1vw', 
                                fontFamily: inter.style.fontFamily, 
                                color: 'black', 
                                backgroundColor: 'white', 
                                border: '1px solid #ccc', 
                                borderRadius: '0.5vw', 
                                outline: 'none' // Remove default outline
                            }}
                        />
                        <button
                            onClick={() => console.log('Share clicked')}
                            style={{ 
                                width: '8vw', 
                                padding: '0.5vw 1vw', 
                                fontFamily: inter.style.fontFamily, 
                                backgroundColor: '#808080', 
                                color: '#fff', 
                                border: 'none', 
                                borderRadius: '0.5vw', 
                                cursor: 'pointer' 
                            }}
                        >
                            Share
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
