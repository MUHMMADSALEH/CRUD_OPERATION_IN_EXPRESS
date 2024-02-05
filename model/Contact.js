import { Schema, model,mongoose } from "mongoose";
const contactSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: 3,
    maxLength: 20,
    trim: true,
    validate: {
      validator: function (value) {
        const regexName = /^[a-zA-z\s]*$/;
        return regexName.test(value);
      },
      message: "First name must contain only alphabetic character",
    }
  },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
      trim: true,
      validate: {
        validator: function (value) {
          const regexName = /^[a-zA-Z\s]*$/;
          return regexName.test(value);
        },
        message: "last name must contain only alphabetic character",
      },
    },


    emailAddress:{
        type:String,
        required:true,
       unique:true,
        trim:true,
},
age:{
type:Number,
required:false
}

  
});
export default mongoose.model("Contact",contactSchema)