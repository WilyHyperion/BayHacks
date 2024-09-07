import { Notes, User, Class, Test } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

function TimeTill(d : Date){
    let now = new Date();
    let diff = new Date(d) - now;
    if(diff < 0){
        return "Test has passed";
    }
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    let hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    return days + " days and " + hours + " hours until test";
}
export default function ClassComp() {
    const r = useRouter();
    const id = r.query.id as string
    const [Class, setClass] = useState(null as null | Class & {tests: Test[]} & {Notes: Notes[]});
    useEffect(() => {
        console.log(id);    
        if (!id) {
            return;
        }
        fetch("/api/logged/getclass", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClass(data.class);
            });
    }, [id]);
    return ( <>
    {Class?.name}
    <h2>Tests</h2>
    {Class?.tests.map((t) => {
        return (
            <li key={t.name}>
                {t.name}
                test
                {TimeTill(t.testDate)}
                <a href={"/logged/test/" + t.id}>Create a study plan</a>
            </li>
        );
    })}
    <hr></hr>
    {
        Class?.Notes?.map((n) => {
            return (
                <li key={n.id}>
                    {n.title}
                    {n.content}
                </li>
            );

    })
}

    </>)
}