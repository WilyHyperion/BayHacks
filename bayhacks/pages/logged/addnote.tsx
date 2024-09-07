import { Class, User } from '@prisma/client';
import React from 'react';

export default function Home() {
    const [user, setUser] = React.useState({
        
    } as User & { classes: Class[] });
    React.useEffect(() => {
        fetch('/api/getuser').then(res => res.json()).then(data => {
            setUser(data.user);
        });
    }, []);
    return (
        <div>
        <h1>Add Note</h1>
        {user.name}
        <input type="text" id = "title" placeholder="Title" />
        <textarea id = "text" placeholder="Content" />
        <select id = "class">
            {user?.classes?.map((c) => {
                return (
                    <option key={c.Id} value={c.Id}>{c.name}</option>
                );
            })}
        </select>
        <button onClick={async () => {
            let title = (document.getElementById("title") as HTMLInputElement).value;
            let text = (document.getElementById("text") as HTMLTextAreaElement).value;
            let r = await fetch("/api/logged/addnote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    text: text,
                    classId: (document.getElementById("class") as HTMLSelectElement).value,
                }),
            })
            let t = await r.json();
            if(t.id) {
                window.location.href = "/logged/note/" + t.id;  
            }
        }}>Add Note</button>
        </div>
    );
    }