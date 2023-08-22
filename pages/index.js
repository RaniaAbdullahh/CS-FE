import Head from "next/head"

import { useAuth } from "@/contexts/auth"
import useResource from "@/hooks/useResource"



export default function Home() {
  
  const {login,user,logout} = useAuth()
  const {resource,loading,createResource,deleteResource} = useResource()

  // const user = null
  // const user = {
  //   username:"rania",
  //   password : "123456"
  // }

  return (
   <div>
    <Head>
      <title>cookie stand demo</title>
    </Head>
    <main className="p-4 space-y-8 text-center">
     <h1 className = "text-4xl">Fetching data from Authenticated API</h1>
     
     
     { user ? (
      <>
      <button className="p-2 text-white bg-gray-500 rounded"  onClick={()=>logout()}>Logout</button>
     <h2>welcome {user.username}</h2>
     <CreateForm createResource={createResource}/>
     <StandList data={resource} loading={loading} onDelete={deleteResource}/>
      </>
     ) :(

        <>
        <button className="p-2 text-white bg-gray-500 rounded"  onClick={()=>login("admin","admin")}>Login</button>
        <h2>needs to login</h2>
        </>
     )
      
     }
    </main>
   </div>
  )
}

function StandList({data,loading,onDelete}){
  return (
    <div className="text-xl" >
    Cookies Stand List
    
    {loading ? <h3>loading .... </h3> :  data.map(item=>{
      return(
        
      <>
      <li key={item.id}>
        <span>{item.location}</span> <span onClick={()=>onDelete(item.id)}> X </span>
      </li>
      </>
      )
    })}
    </div>
  )
}

function CreateForm({createResource}){

  function handleSubmit(e){
    e.preventDefault();
    const newLocation ={
      location : e.target.location.value,
      minimum_customers_per_hour: e.target.min.value,
      maximum_customers_per_hour: e.target.max.value,
      average_cookies_per_sale: e.target.avg.value
    }
    createResource(newLocation)
  }

  
  return (
    <>
    <h3 className="text-xl">create new location</h3>
    <form onSubmit={handleSubmit}>
      <input  className ="border border-black"type="text" name="location" placeholder="enter location" />
      <input className ="border border-black" type="text" name="min" placeholder="enter min" />
      <input className ="border border-black" type="text" name="max" placeholder="enter max" />
      <input className ="border border-black " type="text" name="avg" placeholder="enter avg" />
      <button className="p-2 text-white bg-gray-500 rounded ">Create </button>

    </form>
    </>
  )
  
}