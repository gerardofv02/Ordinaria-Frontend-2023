import Link from "next/link";


export default function Home() {
  return (
    <>
      <h1> Qué desea hacer?</h1>
      <Link href="/getEvents">Ver eventos</Link>
      <br/>
      <Link href="/deleteEvent">Eliminar eventos</Link>
      <br/>
      <Link href="/addEvent">Añadir eventos</Link>
      <br/>
      <Link href="/updateEvent">Actualizar eventos</Link>
      <br/>


      
    </>
  )
}
