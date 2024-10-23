import React from 'react'


const Newpage=()=>{
const [example,setExample]=React.useState("example.com")
    React.useEffect(()=>{
fetchData();
   },[])
const fetchData=async()=>{
    let response=await fetch('http://dummyjson.com/users',{
        method:'GET'
    }).then(data=>{
        console.log(data)
    })

 
}

    return(
        <>
        
        </>
    )
}
export default Newpage;