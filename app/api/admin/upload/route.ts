import { NextResponse } from 'next/server';
import { writeFile, unlink, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.name.replace(/\.[^/.]+$/, "") + '-' + uniqueSuffix + path.extname(file.name);
    
    const uploadDir = path.join(process.cwd(), 'public/images/uploads');
    
    // Ensure the directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Ignore if directory already exists
    }

    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    const imageUrl = `/images/uploads/${filename}`;
    
    return NextResponse.json({ 
      success: true, 
      url: imageUrl,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload file' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ success: false, error: 'No URL provided' }, { status: 400 });
    }

    // Only allow deletion from our uploads folder for security
    if (!url.startsWith('/images/uploads/')) {
      return NextResponse.json({ success: false, error: 'Invalid file path' }, { status: 400 });
    }

    const filepath = path.join(process.cwd(), 'public', url);

    await unlink(filepath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    // Ignore ENOENT if the file was already deleted or doesn't exist
    if (error && typeof error === 'object' && 'code' in error && (error as any).code === 'ENOENT') {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: 'Failed to delete file' }, { status: 500 });
  }
}
