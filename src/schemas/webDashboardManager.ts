import { Schema, model } from 'mongoose';

export default model('DashboardManager', new Schema({

    applicationID: { type: String, required: true },
    serverJoinedCounter: { type: Number, default: 0, required: true },
    deleteRoles: { type: Boolean, default: false, required: true },
    deleteUsers: { type: Boolean, default: false, required: true },
    deleteChannels: { type: Boolean, default: false, requird: true },

}))