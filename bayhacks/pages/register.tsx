export default function  Login(){
    return (
        <div>
            <input type="text" id = "username" placeholder="Username" />
            <input type = "text" id = "email" placeholder = "Email" />
            <input type="password" id = "password" placeholder="Password" />
            <button onClick={async () => {
                let username = (document.getElementById("username") as HTMLInputElement).value;
                let password = (document.getElementById("password") as HTMLInputElement).value;
                let r = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        email : (document.getElementById("email") as HTMLInputElement).value,
                        password: password,
                    }),
                })
                let t = await r.json();
                if(t.message === "Logged in"){
                    alert("Logged in");
                }
                else{
                    alert(t.message);
                }
            }}>Login</button>
        </div>
    );
}