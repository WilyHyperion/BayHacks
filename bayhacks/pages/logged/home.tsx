import { User } from '@prisma/client';
import React from 'react';

export default function Home() {
    const [user, setUser] = React.useState({
    } as User & {
        classes: {Id: string, name: string, tests :  {name:string, testDate:string }[]}[]
    }); 
    React.useEffect(() => {
        fetch('/api/getuser').then(res => res.json()).then(data => {
            setUser(data.user);
        });
    }, []);
    return (
        <div>
        <h1>Home</h1>
        {user.name}
        <div>
            <h2>Classes</h2>
            <ul>
                {
                    user?.classes?.map((c) => {
                        return (
                            <li key={c.Id} onClick={() => {
                                window.location.href = "/logged/class/" + c.Id;
                            }}>
                                {c.name}
                                {c.tests.map((t) => {
                                    return (
                                        <li key={t.name}>
                                            {t.name} {t.testDate}
                                        </li>
                                    );
                                })}
                                <div>
                                    <input type="text" id="name" placeholder="Test name" />
                                    <input type="date" id="date" />
                                    <button onClick={async () => {
                                        let name = (document.getElementById("name") as HTMLInputElement).value;
                                        let date = (document.getElementById("date") as HTMLInputElement).value;
                                        fetch("/api/logged/addtest", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                name: name,
                                                testDate: new Date(date).toISOString(),
                                                className: c.name,
                                            }),
                                        });
                                        let copy = {...user};
                                        copy.classes.find((cl) => cl.Id === c.Id)?.tests.push({name: name, testDate: date});
                                        setUser(copy);
                                    }}>Add test</button>
                                </div>
                            </li>
                        );
                })
            }
            <input type="text" id="name" placeholder="Class name" />
            <button onClick={async () => {
                let name = (document.getElementById("name") as HTMLInputElement).value;
                fetch("/api/logged/addclass", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                    }),
                });
                let copy = {...user};
                copy.classes.push({Id: "0", name: name, tests: []});
                setUser(copy);
            }}>Add class</button>
            </ul>

            
        </div>
        </div>
    );
    }