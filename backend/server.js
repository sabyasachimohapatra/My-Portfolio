import app from "./app.js"


let PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server listen at port:${PORT}`)
})