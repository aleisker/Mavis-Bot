import { SqlReader } from 'node-sql-reader';
import mysql from 'mysql';

export default class Database {

    private connection: mysql.Connection|null = null;

    //==============================================
    //CONNECTION
    //==============================================

    public connect() {
        this.connection = mysql.createConnection({
            database: process.env.SQL_HINT,
            password: process.env.SQL_PASS,
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            port: parseInt(process.env.SQL_PORT!),
        });
        
        this.connection.connect();
    }

    private insertServerBuilder(query: string, serverId: string): void {
        let queries = SqlReader.parseSqlString(`INSERT INTO ${query}(serverId) VALUES ('${serverId}')`);
        queries.forEach(query => {
            this.connection?.query(query);
        });    
    }

    private getterServerBuilder(query: string, serverId: string): string[] {
        let array: string[] = [];
        let queries = SqlReader.parseSqlString(`SELECT * FROM ${query} WHERE serverId = '${serverId}'`);
        queries.forEach(query => {
            array = this.connection?.query(query).values!;
        })
        return array;
    }

    private insertMemberBuilder(query: string, memberId: string): void {
        let queries = SqlReader.parseSqlString(`INSERT INTO ${query}(memberId) VALUES ('${memberId}')`);
        queries.forEach(query => {
            this.connection?.query(query);
        });    
    }

    private getterMemberBuilder(query: string, memberId: string): string[] {
        let array: string[] = [];
        let queries = SqlReader.parseSqlString(`SELECT * FROM ${query} WHERE memberId = '${memberId}'`);
        queries.forEach(query => {
            array = this.connection?.query(query).values!;
        })
        return array;
    }

    private insertMemberServerBuilder(query: string, serverId: string, memberId: string): void {
        let queries = SqlReader.parseSqlString(`INSERT INTO ${query}(serverId, memberId) VALUES ('${serverId}, ${memberId}')`);
        queries.forEach(query => {
            this.connection?.query(query);
        });    
    }

    //==============================================
    //SERVER SIDE
    //==============================================

    public async insertGuild(serverId: string) {
        this.insertServerBuilder('Servers', serverId);
    }

    public insertModules(serverId: string) {
        this.insertServerBuilder('Modules', serverId);
    }

    public getModules(serverId: string): string[] {
        return this.getterServerBuilder('Modules', serverId);
    }

    public insertChannels(serverId: string) {
        this.insertServerBuilder('Channels', serverId);
    }

    public getChannels(serverId: string): string[] {
        return this.getterServerBuilder('Channels', serverId);
    }

    public insertAntiraid(serverId: string) {
        this.insertServerBuilder('AntiRaid', serverId);
    }

    public getAntiraid(serverId: string): string[] {
        return this.getterServerBuilder('AntiRaid', serverId);
    }

    //==============================================
    //USER SIDE
    //==============================================

    public insertUser(ServerId: string, memberId: string) {
        this.insertMemberServerBuilder('Users', ServerId, memberId);
    }

    public insertEconomy(memberId: string) {
        this.insertMemberBuilder('Economy', memberId);
    }

    public insertLeveling(memberId: string) {
        this.insertMemberBuilder('AntiRaid', memberId);
    }

    public insertModeration(serverId: string, memberId: string) {
        this.insertMemberServerBuilder('Moderation', serverId, memberId);
    }
}