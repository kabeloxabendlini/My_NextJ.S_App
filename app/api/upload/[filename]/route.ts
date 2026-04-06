// app/api/upload/[filename]/route.ts

import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export const runtime = 'nodejs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  // Step 1: Check env vars
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  console.log('ENV CHECK:', {
    cloud_name: cloudName ? '✅ set' : '❌ MISSING',
    api_key: apiKey ? '✅ set' : '❌ MISSING',
    api_secret: apiSecret ? '✅ set' : '❌ MISSING',
  });

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: 'Missing Cloudinary config' }, { status: 500 });
  }

  try {
    // Step 2: Parse form data
    let formData: FormData;
    try {
      formData = await req.formData();
      console.log('FormData parsed ✅');
    } catch (e) {
      console.error('FormData parse failed:', e);
      return NextResponse.json({ error: 'Failed to parse form data' }, { status: 400 });
    }

    // Step 3: Get file
    const file = formData.get('file') as File;
    console.log('File received:', file ? `${file.name} (${file.size} bytes)` : '❌ MISSING');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Step 4: Convert to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('Buffer created ✅, size:', buffer.length);

    // Step 5: Upload to Cloudinary
    console.log('Starting Cloudinary upload...');
    const upload = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: 'profile_pictures', resource_type: 'image' },
          (error, result) => {
            if (error) {
              console.error('Cloudinary error:', JSON.stringify(error));
              reject(error);
            } else {
              console.log('Cloudinary upload ✅:', result?.secure_url);
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    return NextResponse.json({ url: upload.secure_url });

  } catch (err: any) {
    console.error('UPLOAD ERROR:', err?.message || err);
    return NextResponse.json({ error: err?.message || 'Upload failed' }, { status: 500 });
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

