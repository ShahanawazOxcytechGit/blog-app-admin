
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/database/db';

export async function GET(req, res) {
    try {
        
        const getConn = await pool.getConnection()

        const [rows] = await getConn.execute('CALL getBlogs()');

        console.log('rows inside getallblogs:', rows[0])
        
         return NextResponse.json({ result : rows[0] }, { status: 200 });
        
    } catch (error) {
        console.error('Error during getting blogs data:', error);
        return NextResponse.json({ success1: false, error: 'Failed to get blogs data' }, { status: 500 });
    }
}