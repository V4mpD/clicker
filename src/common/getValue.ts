const getValue = (udata: any[], id:string) =>{
    console.log(udata.find((item: any) => item.id === id))
    return udata.find((item: any) => item.id === id)?.value
  }

  export default getValue;