import multer from 'multer';

export class UploadImage {
  singleImage(filedName: string) {
    const multerStorage = multer.memoryStorage();

    console.log(filedName);
    const upload = multer({ storage: multerStorage });
    return upload.single(filedName);
  }
}
