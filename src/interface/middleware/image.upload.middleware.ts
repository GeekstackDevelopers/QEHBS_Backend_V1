import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import multer from "multer";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
});

export const uploadSingleImage = async (file: any, folderName: string) => {
  if (!file) throw new Error("No file uploaded");
  console.log(" while uploading ")

  const key = `${folderName}/${Date.now()}-${file.originalname}`;

  const uploadCommand = new Upload({
    client: s3,
    params: {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: "public-read" // optional
    },
  });

  await uploadCommand.done();

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};

export const uploadMultipleImages = async (files: any[], folderName: string) => {
  if (!files || files.length === 0) throw new Error("No files uploaded");

  const fileUrls: string[] = [];

  for (const file of files) {
    const key = `${folderName}/${Date.now()}-${file.originalname}`;

    const uploadCommand = new Upload({
      client: s3,
      params: {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    await uploadCommand.done();

    fileUrls.push(`https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`);
  }

  return fileUrls;
};

// Multer middleware
export const courseCoverImageUpload = upload.single("coverImage");
export const quizThumbnailImageUpload = upload.single(" ");
export const manualOrderListImageUpload = upload.array("manualOrderImage",4)
export const deliveryPartnerDocumentUpload = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "documents[aadhar][image]", maxCount: 1 },
  { name: "documents[drivingLicense][image]", maxCount: 1 },
  { name: "documents[vehicleRegistration][image]", maxCount: 1 },
  { name: "documents[pan][image]", maxCount: 1 },
]);
