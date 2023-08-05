import { cn } from '@/lib';
import { Nunito } from 'next/font/google';

const FontSans = Nunito({ subsets: ['latin'], variable: '--font-sans' });

export const font = cn(FontSans.variable);
