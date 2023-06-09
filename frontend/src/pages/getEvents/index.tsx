import { GetServerSideProps, NextPage } from "next";
import {gql }from "@apollo/client";
import  getClient  from "../libs/client";

export type event = {
    event: {
    date: Date,
    title: string,
    startHour: number,
    description:string,
    endHour: number,
    id: string,
    }[],
    
};

export const getServerSideProps:GetServerSideProps = async () => {
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
    
    const client = getClient();
    const {data} = await client.query<{
        events: event,
        
      }>({
        query,

      });
      console.log(data);

      return {
        props:{
          event: data.events,
        }
      }


    


}


const Eventos : NextPage<event>=(props) => {

    return (
        <div>
        {props.event.map((event) => {return(
        <div key={event.id}>  
        <div>Date: {event.date.toString()}</div>
        <div>Hour Start: {event.startHour}</div>
        <div>Hour End: {event.endHour}</div>
        <div>Title: {event.title}</div>
        <div>Description: {event.description}</div>
        <br/>
        </div>
        )
    })}
        </div>
    )

}

export default Eventos;