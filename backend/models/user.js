const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const {Schema}=mongoose;
const userSchema=Schema({
    googleID:{type:String,required:false},
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    photo:String,
    verified:{type:Boolean,required:true}
})
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
mongoose.model("users",userSchema);