import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'TaskMatrix — Enterprise Agile Project Management',
  description:
    'TaskMatrix is a modern SaaS project management platform for software teams. Manage projects, tasks, sprints, and team collaboration with ease.',
  keywords: ['project management', 'agile', 'kanban', 'team collaboration', 'SaaS'],
  openGraph: {
    title: 'TaskMatrix — Enterprise Agile Project Management',
    description: 'Manage projects, tasks, and sprints with your team.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} light`} suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background font-sans text-foreground" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
