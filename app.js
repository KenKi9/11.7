#!/usr/bin/env node
const child_process=require("child_process")

const fs=require('fs')

const path=require('path')

let filename=path.join(__dirname,process.argv[2]);

let childProcess=createProcess()

function createProcess(){
    if(fs.existsSync(filename)){
        let child=child_process.spawn('node',[filename]);
        child.stdout.on('data',data=>{
            console.log(data)
        })
        child.stderr.on('data',err=>{
            console.log(err)
        })
        return child
    }else{
        console.log("此文件不存在")
    }
}
let water=fs.watch(filename);
water.on('change',()=>{
    console.log("server.js变化")
    childProcess.kill();
    childProcess=createProcess()
})
