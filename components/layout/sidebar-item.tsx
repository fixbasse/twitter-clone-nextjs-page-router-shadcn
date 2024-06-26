import useCurrentUser from "@/hooks/use-current-user";
import useLoginModal from "@/hooks/use-login-modal";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface SidebarItemProps {
    label: string;
    href?: string;
    icon: IconType;
    onClick?: () => void;
    auth?: boolean;
};

export const SidebarItem = ({
    label,
    href,
    icon: Icon,
    onClick,
    auth
}: SidebarItemProps) => {
    const loginHook = useLoginModal();
    const { data: currentUser } = useCurrentUser();
    const router = useRouter();

    const handleClick = useCallback(() => {
        if (onClick) {
            return onClick();
        };

        if (auth && !currentUser) {
            loginHook.onOpen();
        };

        if (href) {
            router.push(href);
        };

    }, [onClick, href, router, currentUser, auth, loginHook]);

    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-2 text-sm cursor-pointer">
            <Icon size={20} />

            <h4 className="hidden md:block">
                {label}
            </h4>
        </div>
    )
}
