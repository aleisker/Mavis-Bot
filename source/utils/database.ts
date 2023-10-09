import applicationmanager from "../cluster/applicationmanager";

export default class Database {

    public async createApplicationDatabase(applicationId: string) {
        return await new applicationmanager({ 
            applicationID: applicationId,
            serverTargetId: "0000000000000000000",
            deleteRoles: false,
            deleteUsers: false,
            deleteChannels: false
        }).save();
    }

}