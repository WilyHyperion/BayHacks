import { Notes, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
export default function Note() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null as null | User);
  const [note, setNote] = useState<Notes>();
  const [summ, setSumm] = useState<string>();
  const id = useRouter().query.id as string;
  useEffect(() => {
    fetch("/api/getuser")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
      });
    fetch("/api/logged/getnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNote(data.notes);
      });
  }, [id]);
  return (
    <div>
      <h1>Note</h1>
      {note?.title}
      {note?.content}
      <hr />
      {summ}
      <button
        onClick={async () => {
          let r = await fetch("/api/logged/summarize", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: note?.title, text: note?.content }),
          });
          let t = await r.json();
          setSumm(t.summary);
        }}
      >
        Summarize
      </button>
      {(user?.id === note?.authorId) &&
        <>
          <input type="text" id="user" placeholder="Share with" />
          <button
            onClick={async () => {
              let usersh = (document.getElementById("user") as HTMLInputElement)
                .value;
              let r = await fetch("/api/logged/share", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: usersh,
                    id: note?.id,
                }),
              });
              let t = await r.json();
              if (t.message === "Shared") {
              } else {
                alert(t.message);
              }
            }}
          >
            Share
          </button>
        </>
      }
    </div>
  );
}
