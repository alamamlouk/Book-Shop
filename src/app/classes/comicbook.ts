export class Comicbook {
    constructor(
        public name:string,
        public writer:string,
        public issue:String,
        public nb:number,
        public qt:number,
        public img:string,
        public world:string
    ){
        this.img=img;
        this.writer=writer;
        this.issue=issue;
        this.name=name;
        this.qt;
        this.nb=nb;
        this.world=world;
    }

}
