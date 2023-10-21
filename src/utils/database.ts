import knex from 'knex';

export default class Database {

    private connection = new knex.Client({
        client: 'mysql2',
        connection: {
            host: process.env.SQL_HOST,
            port: parseInt(process.env.SQL_PORT!),
            user: process.env.SQL_USER,
            password: process.env.SQL_PASS,
            database: process.env.SQL_HINT
        }
    });

    //==============================================
    //CONNECTION
    //==============================================

    public async connect() {
        await this.connection.acquireConnection();
    }

    public async serverInsertBuilder(serverId: string, query: string) {
        await this.connection.queryBuilder().insert([ {serverId: serverId} ]).into(query);
    }
}

    
