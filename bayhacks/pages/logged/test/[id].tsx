import { Notes, User, Class } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import Note from "@/comp/note";
import Markdown from "react-markdown";
function TimeTill(d: Date) {
  let now = new Date();
  let diff = new Date(d) - now;
  if (diff < 0) {
    return "Test has passed";
  }
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  let hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  return " " + days + " days and " + hours + " hours until test";
}

export default function Test() {
  const [notes, setNotes] = useState(null as null | Notes[]);
  const [test, setTest] = useState(
    null as null | (Test & { Class: (Class & { Notes: Notes[] })[] })
  );
  const [studyPlan, setStudyPlan] = useState(null as null | any);
  const id = useRouter().query.id as string;
  useEffect(() => {
    if (!id) {
      return;
    }
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
        console.log(data);
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
    <div className="p-[30px]">
      <h1 className="w-[100%] text-center text-2xl">
        {test?.name}
        <br />
      {TimeTill(test?.testDate)}
      </h1>
      <h2>Select Notes to create a study guide from</h2>
      <div className="flex flex-row gap-11">
        {notes?.map((n) => {
          console.log(n.id);
          return (
            <div>
              <input type="checkbox" id={n.id}></input>
              <label htmlFor={n.id}>
                <Note title={n.title} note={n.content} />
              </label>
            </div>
          );
        })}
      </div>
      <br></br>
      <button
        onClick={async () => {
          let checked = document.querySelectorAll(
            'input[type="checkbox"]:checked'
          );
          let notesused: any[] = [];
          console.log(checked);
          console.log(notes);
          checked.forEach((c) => {
            notesused.push(notes?.find((n) => n.id === (c as any).id));
          });
          console.log(notesused);
          let r = await fetch("/api/logged/createstudyplan", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              notes: notesused,
              testId: id,
              title: test?.name,
              data: test?.testDate,
            }),
          });
          let t = await r.json();
          console.log(t);
          setStudyPlan(t);
        }}
      >
        Create Study Plan
      </button>
      <br />
      {studyPlan && (
        <div>
          <h2 className="text-2xl">Study Plan</h2>
          {studyPlan.time}
          <div>
          {studyPlan.studyplan.map((s: any, index:number) => {
            return (
            <><div className="overflow-y-scroll max-h-[100vh] bg-[#D9D9D9] rounded-[50px] p-10">
                <h2 className="text-2xl">Topic {index + 1}: { s.topic}</h2>
                <Markdown children={s.guide} ></Markdown>
                

              </div>
              <br className=" bg-black p-3"></br>
              
              </>
              
            );
            
          })}
          </div>
        </div>
      )}
    </div>
  );
}
