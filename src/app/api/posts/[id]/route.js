import { NextResponse } from "next/server";
import db from '@/lib/db';

export async function GET(req, { params }) {
    try {
        const { id } = params;
        
        const post = await db.query(
            'SELECT * FROM posts WHERE id = ?',
            [id]
        );

        if (!post || post.length === 0) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ post: post[0] }, { status: 200 });
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ message: "Error fetching post" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const { newTitle: title, newImg: img, newContent: content } = await req.json();

        await db.query(
            'UPDATE posts SET title = ?, img = ?, content = ? WHERE id = ?',
            [title, img, content, id]
        );

        return NextResponse.json({ message: "Post updated" }, { status: 200 });
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ message: "Error updating post" }, { status: 500 });
    }
}