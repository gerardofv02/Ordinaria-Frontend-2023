



import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import event from "../getEvents";
import Link from "next/link";


const Anadir = () => {
    const mutation = gql`
    mutation($title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!){createEvent(title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour) {
        date,
        description,
        endHour,
        startHour,
        title
      }}
    `;

    const [mymutation] = useMutation(mutation);

    const [date,setDate] = useState(new Date());
    const [hourMax, setHourMax] = useState<number>();
    const [hourMin,setHourMin] = useState<number>();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");




    
    return(
        <>
        <Link href="/">Volver a menu</Link>
        <div>Hola que necesita añadir?</div>
        <br/>
        <div>
            Date:
        <input type="date"  onChange={(e) => setDate(new Date(e.target.value))}></input>
        </div>
        <div>
            Hora final:
        <input type="number" onBlur={(e) => setHourMax(parseInt(e.target.value))}></input>
        </div>
        <div>
            Hora comienzo:
        <input type="number" onBlur={(e) => setHourMin(parseInt(e.target.value))}></input>
        </div>
        <div>
            Title:
        <input type="text" onBlur={(e) => setTitle(e.target.value)}></input>
        </div>
        <div>
            Description:
        <input type="text" onBlur={(e) => setDescription(e.target.value)}></input>
        </div>
        <button onClick={(e) => {mymutation({variables: {date:date,title:title,startHour:hourMin,endHour:hourMax, description: description}});
         window.alert("Evento añadido");
         }}> Añadir</button>

        </>
        )
}
export default Anadir;