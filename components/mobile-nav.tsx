"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CalendarIcon, User, LogOut } from "lucide-react"
import { useSupabase } from "@/lib/supabase-provider"
import { useRouter } from "next/navigation"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  user: any
  loading: boolean
}

export function MobileNav({ isOpen, onClose, user, loading }: MobileNavProps) {
  const pathname = usePathname()
  const { supabase } = useSupabase()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="flex items-center gap-2" onClick={onClose}>
              <CalendarIcon className="h-6 w-6" />
              <span className="text-xl font-bold">EventHub</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/"
            className={`flex items-center gap-2 px-2 py-1 rounded-md ${pathname === "/" ? "bg-muted" : ""}`}
            onClick={onClose}
          >
            Home
          </Link>
          <Link
            href="/events"
            className={`flex items-center gap-2 px-2 py-1 rounded-md ${
              pathname === "/events" || pathname.startsWith("/events/") ? "bg-muted" : ""
            }`}
            onClick={onClose}
          >
            Events
          </Link>
          {!loading && user && (
            <>
              <Link
                href="/dashboard"
                className={`flex items-center gap-2 px-2 py-1 rounded-md ${
                  pathname === "/dashboard" || pathname.startsWith("/dashboard/") ? "bg-muted" : ""
                }`}
                onClick={onClose}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/profile"
                className={`flex items-center gap-2 px-2 py-1 rounded-md ${
                  pathname === "/dashboard/profile" ? "bg-muted" : ""
                }`}
                onClick={onClose}
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <Button variant="ghost" className="justify-start px-2" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </Button>
            </>
          )}
          {!loading && !user && (
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/auth/login" onClick={onClose}>
                <Button variant="outline" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/register" onClick={onClose}>
                <Button className="w-full">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
