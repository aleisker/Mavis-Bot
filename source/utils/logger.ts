import chalk from "chalk";
import moment from "moment";
import { name, version } from '../../package.json';

export default class Logger {

    private index(): string {
        return "[ " + chalk.bold.red(moment().format("LT")) + " " + chalk.yellow(name+"@"+version)+" ] : ";
    }

    public send(content: string, statut: string) {
        switch(statut.toUpperCase()) {
            case "ERROR":
                console.log(this.index() + "[" + chalk.bgRed('ERROR') + "] > " + chalk.gray(content));
            break;
            case "ALERT":
                console.log(this.index() + "[" + chalk.bgYellow('ALERT') + "] > " + chalk.gray(content));
            break;
            case "READY":
                console.log(this.index() + "[" + chalk.bgGreen('READY') + "] > " + chalk.gray(content));
            break;
            case "NOTIF":
                console.log(this.index() + "[" + chalk.bgCyan('NOTIF') + "] > " + chalk.gray(content));
            break;
        }
    }
}