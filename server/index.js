const  http = require("http");
const  fs = require("fs");
const { url } = require("inspector");
 

const myServer =http.createServer((req,res)=>{
    const log = `${Date.now()}: ${req.url}  New Req Received \n`
    fs.appendFile("log.txt", log,(err,data)=>{
        switch (req.url) {
            case "/":res.end("Home Page");
                
                break
            case "/about":res.end("i am hello");
                
                break
        
            default:res.end("404 Not Found");
               
        }
        
    });
});

myServer.listen(8000, ()=> console.log("sever Started!"));