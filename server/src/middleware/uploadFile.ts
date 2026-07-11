import { Request } from 'express';
import multer from 'multer';
import { encryptAES } from "../controller/script"

const storage = multer.diskStorage({
  destination: function(req: Request, file: Express.Multer.File, cb: (error: Error | null, fileName: string) => void){   
    cb(null, 'files');
  },
  filename: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, fileName: string)=>void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = uniqueSuffix + '-' + file.originalname;
    cb(null, fileName);
  }
})

const uploadFile = multer({storage});

export default uploadFile;