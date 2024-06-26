import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { SidebarItem } from "./sidebar-item"
import { TweetButton } from "./tweet-button";
import { CiLogout } from "react-icons/ci";

import useCurrentUser from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";


export const Sidebar = () => {
    const { data: currentUser } = useCurrentUser(); // useSession()
    
    const items = [
        {
            label: 'Home',
            href: '/',
            icon: FaHome
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: FaRegBell,
            auth: true
        },
        {
            label: 'Profile',
            href: `/users/${currentUser?.id}`,
            icon: FaRegUser,
            auth: true
        },
    ];

    return (
        <div className="flex flex-col max-md:items-center gap-6 font-bold">
            {items.map((item) => (
                <SidebarItem
                    key={item.href}
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                    auth={item.auth}
                />
            ))}

            {currentUser && (
                <SidebarItem
                    icon={CiLogout}
                    label="Signout"
                    onClick={() => signOut()}
                />
            )}


            <TweetButton />
        </div>
    )
}
