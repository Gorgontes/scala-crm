import type { ReactNode } from 'react'
import { AppSidebar } from "@/app/_components/nav-bar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Bell, Calendar, Plus, User } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border">
          <div className="flex items-center gap-2 px-4 grow">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center space-x-4 px-4 ml-auto">
              <Button variant="ghost" size="icon" className="">
                <Calendar className="h-5 w-5" />
                <span className="sr-only">Calendario</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-5 w-5" />
                    <span className="sr-only">Acceso rápido</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Crear nuevo</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/crear-lead">Crear Lead</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/crear-oportunidad">Crear Oportunidad</Link>
                  </DropdownMenuItem>
                  {/* Agrega más opciones según sea necesario */}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notificaciones</span>
              </Button>
              
            </div>
          </div>
        </header>
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

