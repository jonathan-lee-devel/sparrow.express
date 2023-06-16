import {FC} from "react";
import {Button, buttonVariants} from "@/components/ui/Button";
import UserAuthForm from "@/components/UserAuthForm";
import {cn} from "@/lib/utils";
import {ChevronLeft} from "lucide-react";
import Link from "next/link";

interface LoginModalProps {
    isVisible: boolean;
}

const LoginModal: FC<LoginModalProps> = ({isVisible}) => {
    if (!isVisible) return null

    return (
        <>
            <div className="flex container items-center">
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b rounded-t">
                            <h3 className="text-base font-semibold text-gray-900 lg:text-xl">
                                Sign In
                            </h3>
                        </div>
                        <div className="p-6">
                            <p className="font-normal text-gray-500 dark:text-gray-400">Connect your Google account in
                                order to sign in</p>
                            <p className={'italic semibold'}>By connecting your Google account you agree to our terms of
                                service.</p>
                            <ul className="my-4 space-y-3">
                                <li>
                                    <UserAuthForm/>
                                </li>
                            </ul>
                            <Link href='/' className={cn(buttonVariants({variant: 'outline'}))}>
                                <ChevronLeft/>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginModal
