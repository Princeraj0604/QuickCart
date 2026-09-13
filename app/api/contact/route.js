import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Contact from "@/models/Contact";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all fields.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    await Contact.create({
      name,
      email,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}