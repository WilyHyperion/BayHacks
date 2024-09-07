import { Notes, User } from "@prisma/client";
import { Inria_Serif, Inter } from 'next/font/google';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

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

export default function Note() {
    const [user, setUser] = useState<User | null>(null);
    const [note, setNote] = useState<Notes | undefined>();
    const [summ, setSumm] = useState<string | undefined>();
    const router = useRouter();
    const id = router.query.id as string;

    useEffect(() => {
        if (!id) return;

        fetch("/api/getuser")
            .then(res => res.json())
            .then(data => setUser(data.user));

        fetch("/api/logged/getnote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })
            .then(res => res.json())
            .then(data => setNote(data.notes));
    }, [id]);

    const handleSummarize = async () => {
        const response = await fetch("/api/logged/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: note?.title, text: note?.content }),
        });
        const result = await response.json();
        setSumm(result.summary);
    };

    const handleShare = async () => {
        const userToShareWith = (document.getElementById("user") as HTMLInputElement).value;
        const response = await fetch("/api/logged/share", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: userToShareWith, id: note?.id }),
        });
        const result = await response.json();
        if (result.message === "Shared") {
            // Handle success
        } else {
            alert(result.message);
        }
    };

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column', 
            minHeight: '100vh', 
            fontFamily: inriaSerif.style.fontFamily, // Apply the Inria Serif font
            backgroundColor: 'white'
        }}>
            {/* Back Button */}
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

            <div style={{ 
                flex: 1, // Take up all available space except for the footer
                padding: '2vw', 
                color: 'black',
                maxWidth: '80vw', 
                margin: 'auto'
            }}>
                <h1 style={{ 
                    fontSize: '8vh', 
                    textAlign: 'left', 
                    marginBottom: '0' // Remove margin between title and note container
                }}>
                    {note?.title}
                </h1>
                <div style={{ 
                    minHeight: '20vh', 
                    fontFamily: inter.style.fontFamily, // Apply Inter font
                    color: 'black', 
                    backgroundColor: 'transparent', 
                    textAlign: 'left', 
                    marginBottom: '2vh' // Add margin below note content
                }}>
                    {note?.content}
                </div>
                {summ && (
                    <div style={{ 
                        marginBottom: '2vh', 
                        fontFamily: inter.style.fontFamily, 
                        color: 'black'
                    }}>
                        {summ}
                    </div>
                )}
            </div>
            {user?.id === note?.authorId && (
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
                        onClick={handleSummarize}
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
                            onClick={handleShare}
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
