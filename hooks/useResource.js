import { useAuth } from "@/contexts/auth";
import { useState } from "react"
import useSWR from 'swr';

export  default function useResource(){
    const url = process.env.NEXT_PUBLIC_RESOURCE_URL
    const {token,logout} = useAuth()
   console.log(token)
    // const [data,setData] = useState()
    const {data, error,mutate} = useSWR(([url,token]),fetchResource)

    async function fetchResource(){
        if(!token){
            return
        }
        try{
            const response = await fetch(url,config());
            const jsonResponse = await response.json();
            console.log(jsonResponse)
            return jsonResponse
            // setData(jsonResponse)


        }catch(error){
            console.log(error)
            handleError(error)
        }
    }


    async function createResource(newLocation){
        if(!token){
            return
        }
        try{
            const options= config()
            options.method = "POST"
            options.body = JSON.stringify(newLocation)
            await fetch(url,options);
            mutate()
           
           


        }catch(error){
            console.log(error)
            handleError(error)
        }
    }


    async function deleteResource(id){

        if(!token){
            return
        }
        try{
            const deleteUrl = url+id
            const options= config()
            options.method = "DELETE"
  
            await fetch(deleteUrl,options);
            mutate()
           
        }catch(error){
            console.log(error)
            handleError(error)
        }

    }
    function config(){

        return{
          
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token.access
        }
        }

    }
    function handleError(error){
        console.log("Error: " + error);
        logout();
        
    }

    return(
        {
            resource : data,
            loading : token && !error && !data,
            createResource,
            deleteResource

        }
    )

}