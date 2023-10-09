import { Schema, model } from 'mongoose';

export default model('ApplicationManager', new Schema({

    applicationID: { type: String, required: true },
    serverTargetId: { type: String, required: true },
    deleteRoles: { type: Boolean, default: false, required: true },
    deleteUsers: { type: Boolean, default: false, required: true },
    deleteChannels: { type: Boolean, default: false, requird: true },

}))