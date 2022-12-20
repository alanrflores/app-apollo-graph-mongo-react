const { model, Schema} = require('mongoose');

const talkSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
});


module.exports = model('Task', talkSchema);