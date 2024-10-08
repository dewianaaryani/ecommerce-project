
import { getUser } from '@/lib/auth';
import Link from 'next/link';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, Settings, Settings2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LogoutUser from './logoutUser';

export default async function Navbar() {
    const { session, user } = await getUser();

    return (
        <nav className="container max-w-[1130px] mx-auto flex items-center justify-between bg-[#0D5CD7] p-5 rounded-3xl">
            <div className="flex shrink-0">
                <Link href="/"><img src="/assets/logos/logo.svg" alt="icon" /></Link>
            </div>
            <ul className="flex items-center gap-[30px]">
                <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 font-bold text-[#FFC736]">
                    <Link href="/catalogs">Shop</Link>
                </li>
                <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
                    <Link href="/">Categories</Link>
                </li>
                <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
                    <Link href="/">Testimonials</Link>
                </li>
                <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
                    <Link href="/">Rewards</Link>
                </li>
            </ul>
            <div className="flex items-center gap-3 relative"> {/* Add relative for dropdown positioning */}
                <Link href="/carts">
                    <div className="w-12 h-12 flex shrink-0">
                        <img src="/assets/icons/cart.svg" alt="icon" />
                    </div>
                </Link>
                {session && user.role === "customer" ? (
                    <>
                        <p className="text-white">Hi, {user.name}</p>
                        
                        <DropdownMenu.Root>
                            {/* Using an image as the trigger */}
                            <DropdownMenu.Trigger asChild>
                            <div className="w-[52px] h-[52px] flex shrink-0 rounded-full p-1 border border-[#E5E5E5] overflow-hidden justify-center items-center bodrer-white">
                                <div className="w-[44px] h-[44px] flex shrink-0 rounded-full p-1 border border-[#E5E5E5] overflow-hidden justify-center items-center bg-white">
                                {/* <img src="/assets/photos/p4.png" className="w-full h-full object-cover rounded-full" alt="photo" /> */}
                                <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                </div>
                                </div>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Content className="w-50 absolute right-0 bg-white rounded-2xl shadow-lg p-2 mt-2 flex-row border-blue-500 border-2 z-[50]">
                                <DropdownMenu.Item className="px-3 py-1 hover:bg-gray-100 flex items-center gap-2"> 
                                    <Link href='/' className="flex items-center gap-2">
                                        <Settings width={30} height={30} /> 
                                        Profile Settings
                                    </Link> 
                                </DropdownMenu.Item>

                                <DropdownMenu.Separator className="my-1 h-[1px] bg-gray-200" />
                                <DropdownMenu.Item className="py-1 hover:bg-gray-100 flex items-center gap-2"> 
                                    <LogoutUser />
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </>
                ) : (
                    <>
                        <Link href="/sign-in" className="p-[12px_20px] bg-white rounded-full font-semibold">
                            Sign In
                        </Link>
                        <Link href="/sign-up" className="p-[12px_20px] bg-white rounded-full font-semibold">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
