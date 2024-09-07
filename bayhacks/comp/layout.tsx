// components/layout.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    weight: '400',
});

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    const handleBack = () => {
        router.push('/home');
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh', fontFamily: inter.style.fontFamily, padding: '2vw', backgroundColor: 'white' }}>
            {/* Back Button */}
            <button
                onClick={handleBack}
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

            {/* Main Content */}
            <div style={{ paddingTop: '3vw' }}>
                {children}
            </div>

            {/* Fixed Footer */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '1vw',
                    left: '1vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
                {/* Summarize Button */}
                <button
                    style={{
                        backgroundColor: '#808080',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '0.5vw',
                        padding: '0.5vw 1vw',
                        cursor: 'pointer',
                        marginBottom: '1vw',
                    }}
                >
                    Summarize
                </button>
                
                {/* Share Section */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="text"
                        id="user"
                        placeholder="Share with"
                        style={{
                            padding: '0.5vw',
                            marginRight: '1vw',
                            border: '1px solid #ccc',
                            borderRadius: '0.5vw',
                            width: '15vw',
                        }}
                    />
                    <button
                        style={{
                            backgroundColor: '#808080',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '0.5vw',
                            padding: '0.5vw 1vw',
                            cursor: 'pointer',
                        }}
                    >
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
};
