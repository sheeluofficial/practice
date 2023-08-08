
export const firstWare = (store)=>(next)=>(action)=>{
    console.log(" hi action",action)
    next({...action,payload:5})

}