import { Class, User } from '@prisma/client';
import { Inria_Serif, Inter } from 'next/font/google';
import React, { useState, useEffect, useRef } from 'react';

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

export default function Home() {
    const [user, setUser] = useState<User & { classes: Class[] }>({} as User & { classes: Class[] });

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/getuser');
            const data = await res.json();
            setUser(data.user);
        };
        fetchUser();
    }, []);

    const titleRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const classRef = useRef<HTMLSelectElement>(null);

    const handleAddNote = async () => {
        const title = titleRef.current?.value || '';
        const text = textRef.current?.value || '';
        const classId = classRef.current?.value || '';

        const response = await fetch("/api/logged/addnote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                text,
                classId,
            }),
        });

        const result = await response.json();
        if (result.id) {
            window.location.href = `/logged/note/${result.id}`;
        }
    };

    return (
        <div style={{ 
            position: 'relative', 
            minHeight: '100vh', 
            fontFamily: inriaSerif.style.fontFamily, // Apply the Inria Serif font
            padding: '2vw', // Add padding around the container
            backgroundColor: 'white'
        }}>
            
            <div style={{ 
                maxWidth: '80vw', 
                margin: 'auto', 
                textAlign: 'center', 
                color: 'black' 
            }}>
                <h1 style={{ fontSize: '8vh', marginBottom: '2vh' }}>Add Note, {user.name}</h1>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center' // Center the form elements horizontally
                }}>
                    <select
                        id="class"
                        ref={classRef}
                        style={{ 
                            width: '60vw', 
                            padding: '1vw', 
                            fontFamily: inter.style.fontFamily, // Apply Inter font
                            color: 'black', 
                            backgroundColor: 'white', 
                            outline: 'none', // Remove default outline
                            marginBottom: '2vh' // Add space below the dropdown
                        }}
                    >
                        {user.classes?.map((c) => (
                            <option key={c.Id} value={c.Id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        id="title"
                        ref={titleRef}
                        placeholder="Title"
                        style={{ 
                            width: '60vw', 
                            padding: '1vw', 
                            fontSize: '4vh', // Increase font size here
                            fontFamily: inter.style.fontFamily, // Apply Inter font
                            color: 'black', 
                            backgroundColor: 'transparent', 
                            borderBottom: '3px solid black', 
                            outline: 'none', // Remove default outline
                            marginBottom: '0' // Add space below the input
                        }}
                    />
                    <textarea
                        id="text"
                        ref={textRef}
                        placeholder="Content"
                        style={{ 
                            width: '60vw', 
                            padding: '1vw', 
                            minHeight: '20vh', 
                            fontFamily: inter.style.fontFamily, // Apply Inter font
                            color: 'black', 
                            backgroundColor: '#f0f0f0', 
                            border: '1px solid #ccc', 
                            borderRadius: '1vw',
                            borderTopLeftRadius: '0',
                            borderTopRightRadius: '0',
                            borderTop: 'none', // Remove top border
                            outline: 'none',
                            marginBottom: '2vh' // Add space below the textarea 
                        }}
                    />
                    
                    <button
                        onClick={handleAddNote}
                        style={{ 
                            width: '10vw', // Fixed width for the button
                            padding: '0.5vw 1vw', // Adjusted padding
                            fontFamily: inter.style.fontFamily, // Apply Inter font
                            backgroundColor: '#808080', // Grayish color
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '0.5vw', 
                            cursor: 'pointer', 
                            margin: 'auto' // Center the button
                        }}
                    >
                        Add Note
                    </button>
                </div>
            </div>
        </div>
    );
}
