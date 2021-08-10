const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const articlesSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    authors:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamp:true});

const Article=mongoose.model("Article",articlesSchema);
module.exports=Article;
