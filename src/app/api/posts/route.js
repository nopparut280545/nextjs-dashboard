import { NextResponse } from "next/server";
import db from '@/lib/db';

export async function POST(req) {
    try {
        const { title, img, content, userEmail } = await req.json();
        
        await db.query(
            'INSERT INTO posts (title, img, content, user_email) VALUES (?, ?, ?, ?)',
            [title, img, content, userEmail]
        );

        return NextResponse.json({ message: "Post created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ message: "Error creating post" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const userEmail = req.nextUrl.searchParams.get("email");
        
        const posts = await db.query(
            'SELECT * FROM posts WHERE user_email = ?',
            [userEmail]
        );

        return NextResponse.json({ posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ message: "Error fetching posts" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        
        await db.query(
            'DELETE FROM posts WHERE id = ?',
            [id]
        );

        return NextResponse.json({ message: "Post deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ message: "Error deleting post" }, { status: 500 });
    }
}