import { event } from "@/pages/getEvents";
import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";


type evento = {
    date: Date,
    title: string,
    startHour: number,
    description:string,
    endHour: number,
    id:string,
}
const Remover = () => {


try{

    const query =gql`
    query{
        events {
        title,
        date,
        description,
        startHour,
        endHour,
        id
      }
      }
    `;
      const mutation = gql`
      mutation($updateEventId: ID!, $title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!){
        updateEvent(id: $updateEventId, title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour) {
        date,
        description,
        endHour,
        id,
        startHour,
        title,
        
      }}
      `

      const {data,refetch} =  useQuery<{
        events:evento[],
      }>(
        query,{
      }
      );

      const [mymutation]= useMutation(mutation);


      const [date,setDate] = useState(new Date());
      const [hourMax, setHourMax] = useState<number>();
      const [hourMin,setHourMin] = useState<number>();
      const [title, setTitle] = useState<string>("");
      const [description, setDescription] = useState<string>("");

        return(
          <>
          <Link href="/">Volver a menu</Link>
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

        <div>Posibles eventos a actualizar: </div>
       {data?.events.map((event:evento ) => { return(
        <div id={event.id}>
        <div>Date: {event.date.toString()}</div>
        <div>Hour Start: {event.startHour}</div>
        <div>Hour End: {event.endHour}</div>
        <div>Title: {event.title}</div>
        <div>Description: {event.description}</div>
        <button onClick={(e) =>{mymutation({variables: {updateEventId:event.id,date:date,title:title,startHour:hourMin,endHour:hourMax, description: description}});
     window.alert("Evento actualizado");
     refetch();
        }}>Actualizar</button>
        </div>
        
            )})}
     </>
        )
      }catch(e){
        throw new Error("Ha ocurriod algun error");
      }
      }

       
export default Remover;