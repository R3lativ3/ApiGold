import { v4 as uuidv4 } from "uuid";
import path from 'path'
import sharp from 'sharp'

export default class Resize{

    constructor(public folder: string){
    }

    async save(buffer: Buffer){
        try{
            const fileName = this.filename()
            const filePath = this.filePath(fileName)
    
            await sharp(buffer).resize(300,300, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .toFile(filePath)
    
            return fileName
        }
        catch(exception){
            throw exception
        }
    }

    filename(){
        return `${uuidv4()}.png`;
    }

    filePath(filename: string){
        return path.resolve(`${this.folder}/${filename}`)
    }

}