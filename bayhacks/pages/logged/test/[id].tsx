import { Notes, User, Class} from "@prisma/client";
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

export default function Test() {
    const [notes, setNotes] = useState(null as null | Notes[]);
    const [test, setTest] = useState(null as null | Test & {Class: (Class & {Notes : Notes[]})[] });
    const id = useRouter().query.id as string;
    useEffect(() => {
        console.log(id);
        fetch("/api/logged/gettest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        })
            .then((res) => res.json())
            .then((data) => {
                setTest(data.test);
            });
            fetch("/api/logged/notesfromtestid", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setNotes(data.notes);
                });
    }, [id]);

    return (
        <>
    {test?.name}
    {TimeTill(test?.testDate)}

        </>  
    );

}