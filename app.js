require('dotenv').config()
const express=require('express')
const mongoose=require("mongoose")
const cors=require("cors")
const dotenv=require('dotenv')
const Article=require('./models/Articles')

const port=process.env.PORT || 5000
const app=express()
mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false })
.then(res=>{
    app.listen(port)
    console.log(`Server running on ${port}`);
})
.catch(err=>console.log(err))


//middelwares
app.use(express.json());
app.use(cors())

app.post('/form',(req,res)=>{

    const article=new Article(req.body);
    article.save()
    .then(result=>{
        res.send({redirect:'/',data:'added'})
    })
    .catch(err=>console.log(err))
})

app.get('/articles',(req,res)=>{
    Article.find().sort({createdAt:-1})
    .then((result)=>{
        res.send(result)
    })
    .catch(err=>console.log(err))
})

//delete
app.delete('/article/:id',async (req,res)=>{
    try{
        const id=req.params.id
       await Article.findByIdAndDelete(id,{useFindAndModify:true})
        res.send({redirect:"/",data:'deleted succesfuly'})
    }catch{
        ((err)=>console.log(err))
    }
})
//getting article by id
app.get('/article/:id',(req,res)=>{
    const id=req.params.id;
    Article.findById(id)
    .then(result=>{
      res.send({redirect:'/article',data:result})
    })
    .catch(err=>console.log(err))
})
//get update article
app.get('/edit/:id',async (req,res)=>{
    try{
        const id=req.params.id
        result =await Article.findById(id) 
        res.send({redirect:'/article',data:result})
    }catch{
        ((err)=>console.log(err))
    }
})

//update
app.put('/edit/:id',async (req,res)=>{
    try{
       
        const id=req.params.id;
        await Article.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        res.send({redirect:'/',data:"updated succesfuly"})    
    }catch{
        ((err)=>console.log(err))
    }
})