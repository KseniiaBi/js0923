'use client'
import Link from 'next/link'
import { usePathname, useRouter } from "next/navigation"
import { useAppStore, useAppSelector } from '@/lib/hooks';

export default function Header(){
    const pathname = usePathname();
    const router = useRouter();
    const store = useAppStore();

    const selectCart = state => state.count;
    const cartCount = useAppSelector(selectCart);

    const selectTotal = state => state.total;
    const cartTotal = useAppSelector(selectTotal);

    return(
        <header>
          <span className='logo'>Electronics Shop</span>
          
          <nav>
            <Link className={`${pathname === '/' ? 'active' : ''}`} href="/">Home</Link>
            <Link className={`${pathname === '/blog' ? 'active' : ''}`} href="/blog">Blog</Link>
            <Link className={`${pathname === '/shop' ? 'active' : ''}`} href="/shop">Shop</Link>
            <Link className={`${pathname === '/cart' ? 'active' : ''}`} href="/cart">Cart <span>{cartCount}</span> <span>{cartTotal}</span></Link>
            <button onClick={() =>router.push('/account/')}>Acc</button>
          </nav>
        </header>
    )
}