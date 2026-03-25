// app/api/upload/[filename]/route.ts

import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export const runtime = 'nodejs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(
  req: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const userId = (formData.get('userId') as string) || 'public';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Use filename from route
    const filename = params.filename;

    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `uploads/${userId}`,
            public_id: filename, // 👈 from [filename]
            resource_type: 'auto',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json({
      url: upload.secure_url,
    });
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
//     const data = await req.formData();

//     const file = data.get('file') as File;
//     const userId = data.get('userId') as string;

//     if (!file) {
//       return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
//     }

//     if (!userId) {
//       return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadDir = path.join(process.cwd(), 'public/uploads', userId);

//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     const ext = path.extname(file.name);
//     const filename = uuidv4() + ext;

//     const filePath = path.join(uploadDir, filename);

//     fs.writeFileSync(filePath, buffer);

//     return NextResponse.json({
//       url: `/uploads/${userId}/${filename}`,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
//   }
// }

