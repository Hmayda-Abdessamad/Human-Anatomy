import {Categorie} from "./categorie";

export interface Organ {
    id:number;
    name:string;
    image?:string,
    data?:string,
    description:string,
    categorie:number
}
