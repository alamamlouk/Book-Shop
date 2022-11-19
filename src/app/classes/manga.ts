export class Manga {
    constructor(
        public id:number,
        public name:string,
        public writer:string,
        public vol:String,
        public nb:number,
        public qt:number,
        public img:string
    ){
        this.id=id;
        this.img=img;
        this.writer=writer;
        this.vol=vol;
        this.name=name;
        this.qt;
        this.nb=nb;
    }

}
