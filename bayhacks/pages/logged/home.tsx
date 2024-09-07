import { User } from '@prisma/client';
import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';

// Apply the Inter font
const inter = Inter({
    subsets: ['latin'],
    weight: '400',
});

export default function Home() {
    const [date, setDate] = useState('');
    const [name, setTestName] = useState('');
    const [user, setUser] = useState<User & {
        classes: { Id: string; name: string; tests: { id: string; name: string; testDate: string }[] }[];
    }>({} as User & { classes: { Id: string; name: string; tests: { id: string; name: string; testDate: string }[] }[] });

    useEffect(() => {
        fetch('/api/getuser').then(res => res.json()).then(data => {
            setUser(data.user);
        });
    }, []);

    return (
        <div style={{ 
            position: 'relative', 
            minHeight: '100vh', 
            fontFamily: inter.style.fontFamily, 
            padding: '2vw', 
            backgroundColor: 'white' 
        }}>
            <div style={{ 
                maxWidth: '80vw', 
                margin: 'auto', 
                textAlign: 'center', 
                color: 'black' 
            }}>
                <h1 style={{ fontSize: '8vh', marginBottom: '1vh' }}>Welcome, {user.name}</h1>

                {/* Classes and Tests List */}
                <div style={{ textAlign: 'center', marginBottom: '2vh' }}>
                    <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        {user?.classes?.map((c) => (
                            <li key={c.Id} style={{ marginBottom: '1vh' }}>
                                <p
                                    onClick={() => { window.location.href = "/logged/class/" + c.Id; }}
                                    style={{ cursor: 'pointer', fontSize: '4vh' }}
                                >
                                    {c.name}
                                </p>
                                <ul style={{ listStyleType: 'none', paddingLeft: '1vw' }}>
                                    {c.tests.map((t) => (
                                        <li 
                                            key={t.id}
                                            onClick={() => { window.location.href = "/logged/test/" + t.id; }}
                                            style={{ cursor: 'pointer', fontSize: '3vh', marginBottom: '1vh' }}
                                        >
                                            {t.name} {t.testDate}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Adding Classes and Tests Section */}
                <div style={{ position: 'relative', height: '30vh' }}>
                    
                    {/* Add Class section centered at 25vw */}
                    <div style={{ 
                        position: 'absolute', 
                        left: '17.5vw', 
                        transform: 'translateX(-50%)',
                        width: '30vw', 
                        textAlign: 'center' 
                    }}>
                        <h3 style={{ fontSize: '4vh', marginBottom: '2vh' }}>Add Class</h3>
                        <input 
                            type="text" 
                            id="ClasNameInput" 
                            placeholder="Class name" 
                            style={{ 
                                padding: '1vw', 
                                fontSize: '3vh', 
                                fontFamily: inter.style.fontFamily, 
                                color: 'black', 
                                backgroundColor: '#f0f0f0', 
                                border: '1px solid #ccc', 
                                borderRadius: '0.5vw', 
                                outline: 'none',
                                width: '100%'
                            }}
                        />
                        <div style={{ textAlign: 'center', marginTop: '2vh' }}>
                            <button 
                                onClick={async () => {
                                    let name = (document.getElementById("ClasNameInput") as HTMLInputElement).value;
                                    fetch("/api/logged/addclass", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({ name }),
                                    });
                                    let copy = { ...user };
                                    copy.classes.push({ Id: "0", name, tests: [] });
                                    setUser(copy);
                                }}
                                style={{ 
                                    padding: '0.5vw 1vw', 
                                    fontSize: '3vh', 
                                    fontFamily: inter.style.fontFamily, 
                                    backgroundColor: '#808080', 
                                    color: '#fff', 
                                    border: 'none', 
                                    borderRadius: '0.5vw', 
                                    cursor: 'pointer' 
                                }}
                            >
                                Add class
                            </button>
                        </div>
                    </div>

                    {/* Add Test section centered at 75vw */}
                    <div style={{ 
                        position: 'absolute', 
                        left: '62.5vw', 
                        transform: 'translateX(-50%)', 
                        width: '30vw', 
                        textAlign: 'center' 
                    }}>
                        <h3 style={{ fontSize: '4vh', marginBottom: '2vh' }}>Add Test</h3>
                        <input 
                            type="text" 
                            placeholder="Test name" 
                            onChange={(e) => setTestName(e.target.value)}
                            style={{ 
                                padding: '1vw', 
                                fontSize: '3vh', 
                                fontFamily: inter.style.fontFamily, 
                                color: 'black', 
                                backgroundColor: '#f0f0f0', 
                                border: '1px solid #ccc', 
                                borderRadius: '0.5vw', 
                                outline: 'none', 
                                marginBottom: '1vh',
                                width: '100%'
                            }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1vw' }}>
                            <input 
                                type="date" 
                                onChange={(e) => setDate(e.target.value)}
                                style={{ 
                                    padding: '1vw', 
                                    fontSize: '3vh', 
                                    fontFamily: inter.style.fontFamily, 
                                    color: 'black', 
                                    backgroundColor: '#f0f0f0', 
                                    border: '1px solid #ccc', 
                                    borderRadius: '0.5vw', 
                                    outline: 'none',
                                    flexBasis: '70%'
                                }}
                            />
                            <button 
                                onClick={async () => {
                                    fetch("/api/logged/addtest", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            name,
                                            testDate: new Date(date).toISOString(),
                                            className: user.classes[0].name, 
                                            classid: user.classes[0].Id,
                                        }),
                                    });
                                    let copy = { ...user };
                                    copy.classes[0]?.tests.push({ name, testDate: date, id: "0" });
                                    setUser(copy);
                                }}
                                style={{ 
                                    padding: '0.5vw 1vw', 
                                    fontSize: '3vh', 
                                    fontFamily: inter.style.fontFamily, 
                                    backgroundColor: '#808080', 
                                    color: '#fff', 
                                    border: 'none', 
                                    borderRadius: '0.5vw', 
                                    cursor: 'pointer',
                                    flexBasis: '30%'
                                }}
                            >
                                Add test
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
