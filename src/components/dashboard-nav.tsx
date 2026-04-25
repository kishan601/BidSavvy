'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Briefcase,
  Gavel,
  LayoutGrid,
  Lightbulb,
  MessageSquare,
  PlusCircle,
  User as UserIcon,
} from 'lucide-react';
import type { User } from '@/lib/types';

export function DashboardNav({ user }: { user: User }) {
  const pathname = usePathname();

  const buyerLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { href: '/dashboard/projects', label: 'My Projects', icon: Briefcase },
    { href: '/dashboard/projects/new', label: 'Post a Project', icon: PlusCircle },
    { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
    { href: '/dashboard/profile', label: 'Profile', icon: UserIcon },
  ];

  const sellerLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { href: '/projects', label: 'Find Projects', icon: Briefcase },
    { href: '/dashboard/recommendations', label: 'AI Recommendations', icon: Lightbulb },
    { href: '/dashboard/bids', label: 'My Bids', icon: Gavel },
    { href: '/dashboard/messages', label: 'Messages', icon: MessageSquare },
    { href: '/dashboard/profile', label: 'Profile', icon: UserIcon },
  ];

  const links = user.role === 'buyer' ? buyerLinks : sellerLinks;

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === link.href}
            tooltip={link.label}
          >
            <Link href={link.href}>
              <link.icon />
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
