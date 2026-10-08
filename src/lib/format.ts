export const money=(v:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(v);
export const number=(v:number)=>new Intl.NumberFormat('en-IN').format(v);
export const nowLabel=()=>new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'});
