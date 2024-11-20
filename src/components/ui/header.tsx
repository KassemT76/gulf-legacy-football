import Link from 'next/link';
import { Button } from "./button";

export default function Header(){
  return (
    <div>
    <header className="bg-green-950 text-primary-foreground shadow-md">
      <title>Gulf Legacy Football</title>
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <Link href="/">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Gulf Legacy Football</h1>
        </Link>
        <nav className="w-full md:w-auto">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 items-stretch">
            <li className="w-full md:w-auto">
              <Link href="/" className="block w-full">
                <Button variant="ghost" className="w-full text-primary-foreground hover:text-primary hover:bg-primary-foreground">
                  Home
                </Button>
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link href="/standings" className="block w-full">
                <Button variant="ghost" className="w-full text-primary-foreground hover:text-primary hover:bg-primary-foreground">
                  Standings
                </Button>
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link href="/schedule" className="block w-full">
                <Button variant="ghost" className="w-full text-primary-foreground hover:text-primary hover:bg-primary-foreground">
                  Schedule
                </Button>
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link href="/guidelines" className="block w-full">
                <Button variant="ghost" className="w-full text-primary-foreground hover:text-primary hover:bg-primary-foreground">
                  Guidelines
                </Button>
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link href="/blog" className="block w-full">
                <Button variant="ghost" className="w-full text-primary-foreground hover:text-primary hover:bg-primary-foreground">
                  Blog
                </Button>
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link href="/register" className="block w-full">
                <Button variant="secondary" className="w-full bg-secondary text-secondary-foreground hover:text-primary hover:bg-secondary/200">
                  Register Now!
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    </div>
  );
}