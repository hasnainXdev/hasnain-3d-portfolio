import { NextResponse } from 'next/server';
import { sendMessageViaGmail } from '@/lib/gmail';

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  try {
    await sendMessageViaGmail({ name, email, message });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
