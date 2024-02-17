

export function checkDateValidation({from,to}){
    if (from ===''){
        from ='2000-01-01'
      }
      if (to ===''){
        to ='2100-01-01'
      }
      return {from,to}
}