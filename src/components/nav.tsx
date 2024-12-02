"use client";

import { usePathname } from "next/navigation";
import { Home, User, Target } from "lucide-react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import Link from "next/link";

export function Navigation() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 border-t z-10 dark:bg-background">
            <div className="flex justify-around items-center max-w-md mx-auto relative">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <Home className="w-6 h-6" />
                    </Button>
                </Link>

                <Link href="/profile" className="-mt-8">
                    <Button
                        size="icon"
                        className={cn(
                            "w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 shadow-lg relative z-10",
                            pathname === "/profile" && "bg-green-700"
                        )}
                    >
                        <User className="w-8 h-8" />
                    </Button>
                </Link>

                <Link href="/goals">
                    <Button variant="ghost" size="icon">
                        <Target className="w-6 h-6" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
