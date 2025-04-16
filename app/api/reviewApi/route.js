import db from "@/config/mongodbConfig";
import { Review } from "@/_lib/model/review/review";
import { NextResponse } from "next/server";

export async function GET(request) {

    await db.connect()
    let result = [];
    let result1 = [];

    const id = request.nextUrl.searchParams.get('id');

    result = await Review.find()

    result1 = await Review.find({package_id: id})

    return NextResponse.json({ result: result, result1: result1, success: true })

}

export async function POST(request) {
    const success = false;
    const payload = await request.json();
    await db.connect()

    const result = await Review.create(payload);

    return NextResponse.json({ result, success: true })


}