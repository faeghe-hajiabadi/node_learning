//sync way to write and read in file

const fs = require("fs"); //fs stands for file system
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// console.log("text is:", textIn);

// const textOut = `this is what we know about avacado:+ ${textIn}. \n Created on ${Date.now()}`;

// fs.writeFileSync("./txt/output.txt", textOut);

//async way to write and read

fs.readFile('./txt/start.txt','utf-8',(error, data1)=>{
    fs.readFile(`./txt/${data1}.txt`,'utf-8',(error, data2)=>{
        console.log("data:",data2)
        fs.readFile(`./txt/append.txt`,'utf-8',(error, data3)=>{
            console.log("data3",data3);
            fs.writeFile('./txt/final.txt',`${data2} + \n ${data3}`,'utf-8', err => {
                console.log("file is written!")
            })
        })
        

});
})
console.log("READ ME !!")