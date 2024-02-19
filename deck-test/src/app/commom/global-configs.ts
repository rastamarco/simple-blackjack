import  configs from '../../assets/configs.json';
import { ConfigProject } from '../models/config-project';

export class GlobalConfigs {
    private config: ConfigProject

    constructor () { 
        this.config = { ...configs }
    }

    getConfig(): ConfigProject {
        return this.config
    }
}