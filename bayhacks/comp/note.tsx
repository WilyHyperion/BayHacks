
export default function Note(props : {
    title: string,
    note: string
}) {
    return (
        <div style = {{
            width: '15vw',
            height: '30vh',
            borderRadius: '10px 10px 0 0',
            backgroundColor: '#848484',
            position: 'relative',
            overflow: 'clip',
            fontSize: '10px',
            color: 'black',
            padding: '15px',
            
        }}>
            {props.note}
            <h1 style = {{
                position: 'absolute',
                paddingTop: '30px',
                bottom: '0',
                left: '0',
                textAlign: 'right',
                width: '100%',  
                color: 'black',
                fontSize: '1.5rem',
                backgroundImage: 'linear-gradient(rgba(132, 132, 132, 0.3), rgba(132, 132, 132, 1))',
            }
            }>{props.title}</h1>
        </div>
    )
}
