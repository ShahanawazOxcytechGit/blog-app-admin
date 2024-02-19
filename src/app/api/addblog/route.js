
import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs, { writeFile } from 'fs';
import path from 'path';
import multer from 'multer';
import { join } from 'path';
import pool from '@/database/db';

  
  export async function POST(req) {
    try {

        const data = await req.formData()
        console.log('data is: ', data)
        const image = data.get('image')
        const title = data.get('title')
        const content = data.get('content')
        if(!image) {
            return NextResponse.json({success1 : false})
        }

        const slug = title
        .toLowerCase()                 // Convert the title to lowercase
        .replace(/[^\w\s-]/g, '')      // Remove non-word characters (excluding spaces and dashes)
        .trim()                        // Trim leading and trailing spaces
        .replace(/\s+/g, '-')          // Replace spaces with dashes
        .replace(/-+/g, '-')

        const filenameParts = image.name.split('.');
        const fileExtension = filenameParts[filenameParts.length - 1];

         const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes)

        const path = `./public/blog_images/${slug}.${fileExtension}`
        await new Promise((resolve, reject) => {
            fs.writeFile(path, buffer, (err) => {
              if (err) reject(err);
              else resolve();
            });
          });

        const imagePath =  `/blog_images/${slug}.${fileExtension}`

        console.log('image is: ', image)
        console.log('image.name is: ', image.name)
        
      // Save the data to the database or perform other operations
      console.log('Title:', title);
      console.log('Content:', content);
      console.log('Image Path:', path);

    const getConn = await pool.getConnection()

        const [rows] = await getConn.execute("CALL addBlogs(?, ?, ?, ?)", [title, content, slug, imagePath]);

        console.log('rows data is:', rows)
        
return NextResponse.json({ result : rows }, { status: 200 });
  
      // Respond with success message
      } catch (error) {
        console.error('Error during blog addition:', error);
        return NextResponse.json({ success1: false, error: 'Failed to add blog' }, { status: 500 });
    }
  };

