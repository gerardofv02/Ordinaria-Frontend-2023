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
      mutation($deleteEventId: ID!){
        deleteEvent(id: $deleteEventId) {
          title,
          
        
      }}
      `

      const {data} =  useQuery<{
        events:evento[],
      }>(
        query,{
      }
      );

      const [mymutation]= useMutation(mutation);




      return(
        <>
        <Link href="/">Volver a menu </Link>




        <div>Posibles eventos a eliminar: </div>
       {data?.events.map((event:evento ) => { return(
        <div id={event.id}>
        <div>Date: {event.date.toString()}</div>
        <div>Hour Start: {event.startHour}</div>
        <div>Hour End: {event.endHour}</div>
        <div>Title: {event.title}</div>
        <div>Description: {event.description}</div>
        <button onClick={(e) => {mymutation({variables: {id: event.id}});
         window.alert("Evento eliminado");
         }}>Eliminar</button>
        </div>
        
            )})}
        </>
    )
       
}
export default Remover;