// app/api/upload/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'nodejs'; // ensure Node APIs are allowed

export async function POST(req: Request) {
  try {
    // 1️⃣ Get form data
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const userId = (formData.get('userId') as string) || 'public';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 2️⃣ Prepare upload directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', userId);
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // 3️⃣ Stream file to disk (large files friendly)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = file.name.split('.').pop();
    const filename = `${uuidv4()}.${ext}`;
    const filePath = path.join(uploadsDir, filename);

    await fs.promises.writeFile(filePath, buffer);

    // 4️⃣ Return URL for frontend
    const url = `/uploads/${userId}/${filename}`;
    return NextResponse.json({ url });
  } catch (err) {
    console.error(err);
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