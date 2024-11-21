import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Twitter, Youtube, LucideIcon } from 'lucide-react';

interface ContactInfo {
  icon: LucideIcon;
  content: string;
}

interface SocialLink {
  icon: LucideIcon;
  handle: string;
  href: string;
}

const contactInfo: ContactInfo[] = [
  { icon: Phone, content: "(647) 806-4618" },
  { icon: Mail, content: "oj@ojfootball.com" },
  { icon: MapPin, content: "123 Main St, Mississauga, Canada" },
];

const socialLinks: SocialLink[] = [
  { icon: Instagram, handle: "@gulflegacyfootball", href: "https://www.instagram.com/" },
  { icon: Youtube, handle: "@gulflegacyfootball", href: "https://www.youtube.com/" },
  { icon: Twitter, handle: "@gulflegacyfootball", href: "https://www.twitter.com/" },
];

export default function Footer() {
  return (
    <footer className="bg-green-950 px-4 text-primary-foreground py-16 flex flex-col items-center justify-between w-full">
      <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
        {contactInfo.map((info, index) => (
          <div key={index} className="flex items-center">
            <info.icon className="mr-2" />
            <span>{info.content}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 px-4 py-4">
        {socialLinks.map((link, index) => (
          <div key={index} className="flex items-center">
            <Link href={link.href} className="flex items-center w-full">
              <link.icon className="mr-2" />
              <span>{link.handle}</span>
            </Link>
          </div>
        ))}
      </div>-
      <p>&copy; {new Date().getFullYear()} Gulf Legacy Football League. All rights reserved.</p>
    </footer>
  );
}