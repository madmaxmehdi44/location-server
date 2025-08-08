// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <h1>خوش آمدید</h1>
      <p>برای ادامه ابتدا ثبت‌نام یا ورود کنید.</p>
      <Link href="/register"><button>ثبت‌نام</button></Link>
      <Link href="/login"><button style={{ marginLeft: 8 }}>ورود</button></Link>
    </div>
  );
}