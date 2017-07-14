
import { Library } from './library.models';

export class Project {
    id: number;
    active_start_date : Date;
    active_end_date : Date;
    client_name : String;
    description : String;
    git_url : String;
    testing_url : String;
    production_url : String;
    libraries: Library[];
}