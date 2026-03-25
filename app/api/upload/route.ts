// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export const runtime = 'nodejs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    return NextResponse.json({ url: upload.secure_url });
  } catch (err) {
    console.error('UPLOAD ERROR:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get('file') as File;
//     const userId = (formData.get('userId') as string) || 'public';

//     if (!file) {
//       return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadsDir = path.join(process.cwd(), 'public', 'uploads', userId);

//     if (!fs.existsSync(uploadsDir)) {
//       fs.mkdirSync(uploadsDir, { recursive: true });
//     }

//     const ext = file.name.split('.').pop();
//     const filename = `${uuidv4()}.${ext}`;
//     const filePath = path.join(uploadsDir, filename);

//     fs.writeFileSync(filePath, buffer);

//     const url = `/uploads/${userId}/${filename}`;

//     return NextResponse.json({ url });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
//   }
// }