const {
    Schema,
    model
} = require("mongoose");

const DairySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    story: {
        type: String,
        required: true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{versionKey:false,timestamps:true});

const Dairy = model("Dairy", DairySchema)

module.exports = Dairy