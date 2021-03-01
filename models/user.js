var mongoose=require("mongoose");
var passportlocalmongoose=require("passport-local-mongoose");
var UserSchema=mongoose.Schema({
username: String,
Password: String,
favorites: String
});

UserSchema.plugin(passportlocalmongoose);
module.exports=mongoose.model("User", UserSchema);
