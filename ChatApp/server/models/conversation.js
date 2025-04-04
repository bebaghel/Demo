const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        default: ""
    },
  imageURL:   {
        type: String,
        default: ""
    },
    videoURL: {
        type: String,
        default: ""
    },
    seen: {
        type:String,
        default: false
    }
},
{
    timestamps: true
})

const conversationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    messages:
    {
        type: mongoose.Schema.ObjectId,
        ref: "Message"
    },
}, {
    timestamps: true
}
)

const messageModel = mongoose.model('messages', messageSchema)
const conversation = mongoose.model('conversations', conversationSchema)

exports.default = { messageModel, conversation}