import mongoose from "mongoose";
const FormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
       
    },
    project: {
        type: String,

    },
    message:{
        type:String,
        required: true
    }   


},{timestamps: true});
const Form = mongoose.model('Form', FormSchema);
export default Form;
