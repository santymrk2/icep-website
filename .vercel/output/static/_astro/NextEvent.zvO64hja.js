import{d as a,y as c}from"./hooks.module.Cpa8Z_GP.js";import{u as e}from"./jsxRuntime.module.BUL4quh_.js";import"./preact.module.BYUMaWDY.js";function p(){const[r,l]=a([]),[i,s]=a(!0);return c(()=>{(async()=>{try{s(!0);const o=await(await fetch("/api/events")).json();console.log(o),l(o)}catch(n){console.error("Error fetching events:",n)}finally{s(!1)}})()},[]),i?e("div",{class:"my-28 p-8 m-8 flex justify-center items-center",children:e("div",{class:"relative h-16 w-16",children:e("div",{class:" w-12 h-12 border-5 border-white border-b-transparent rounded-full inline-block box-border animate-spin mx-auto"})})}):e("div",{class:"my-28 p-8 m-8 gap-6 mx-4 sm:mx-10 text-white",children:[r&&r.length>0?r.length===1?e("h2",{class:"text-3xl font-sans font-extrabold text-center mb-8",children:"Próximo evento"}):e("h2",{class:"text-3xl font-sans font-extrabold text-center mb-8",children:"Próximos eventos"}):e("p",{class:"text-center",children:"No hay eventos próximos."}),r&&r.length>0&&r.map((t,n)=>e("div",{class:"flex flex-col justify-center items-center",children:[e("div",{class:`
                                animate-[float3d_6s_ease-in-out_infinite]
                                hover:scale-103 transition-transform duration-500 ease-out
                                ring ring-1
                                ${t.type==="ACTIVADOS"?"ring-green-500 shadow-green-500/60":""}
                                ${t.type==="REUNIÓN DE ENSEÑANZA"?"ring-blue-500 shadow-blue-500/60":""}
                                ${t.type==="ENCUENTRO DE ORACIÓN"?"ring-orange-500 shadow-orange-500/60":""}
                                ${t.type==="ENCUENTRO DE JÓVENES"?"ring-purple-500 shadow-purple-500/60":""}
                                ${t.type==="ENCUENTRO DE MUJERES"?"ring-rose-500 shadow-rose-500/60":""}
                                ${t.type==="ENCUENTRO DE MATRIMONIOS"?"ring-red-500 shadow-red-500/60":""}
                                ${["ACTIVADOS","REUNIÓN DE ENSEÑANZA","ENCUENTRO DE ORACIÓN","ENCUENTRO DE JÓVENES","ENCUENTRO DE MUJERES","ENCUENTRO DE MATRIMONIOS"].includes(t.type)?"":"ring-custom-blue shadow-custom-blue/60"}
                                shadow-lg rounded-xl md:p-2 my-6
                            `,children:e("a",{href:t.pageLink,children:e("h1",{class:"text-4xl p-6 sm:text-6xl font-black text-center",children:t.type})})}),e("p",{class:"text-center font-serif text-gray-400 mt-4",children:t.date}),n<r.length-1&&e("div",{class:"h-px w-full bg-white/30 my-4 mt-8"})]}))]})}export{p as default};
