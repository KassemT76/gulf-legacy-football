import Link from 'next/link';
import { Button } from "./button";
import Image from "next/image"
import logo from '@/images/logo.png'

export default function Header({transparent}: { transparent: boolean}){
  return !transparent ? (
    <div>
      {/* NON TRANSPARENT */}
      <header className="text-foreground z-50 w-full">
        <title>Gulf Legacy Football</title>
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <Link href="/">
          <Image src={logo} alt="alt" width={100} height={100} />
          </Link>
          <nav className="w-full md:w-auto">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 items-stretch">
              <li className="w-full md:w-auto">
                <Link href="/home" className="block w-full">
                  <Button variant="ghost" className="w-full hover:text-primary-foreground hover:bg-primary rounded-xl">
                    Home
                  </Button>
                </Link>
              </li>
              <li className="w-full md:w-auto">
                <Link href="/standings" className="block w-full">
                  <Button variant="ghost" className="w-full hover:text-primary-foreground hover:bg-primary rounded-xl">
                    Standings
                  </Button>
                </Link>
              </li>
              <li className="w-full md:w-auto">
                <Link href="/schedule" className="block w-full">
                  <Button variant="ghost" className="w-full hover:text-primary-foreground hover:bg-primary rounded-xl">
                    Schedule
                  </Button>
                </Link>
              </li>
              <li className="w-full md:w-auto">
                <Link href="/guidelines" className="block w-full">
                  <Button variant="ghost" className="w-full hover:text-primary-foreground hover:bg-primary rounded-xl">
                    Guidelines
                  </Button>
                </Link>
              </li>
              <li className="w-full md:w-auto">
                <Link href="/blog" className="block w-full">
                  <Button variant="ghost" className="w-full hover:text-primary-foreground hover:bg-primary rounded-xl">
                    Blog
                  </Button>
                </Link>
              </li>
              <li className="w-full md:w-auto">
                <Link href="/register" className="block w-full">
                  <Button variant="secondary" className="w-full bg-accent text-secondary-foreground hover:text-accent-foreground hover:bg-accent/75">
                    Register Now!
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  ) : (
    <div>
      <header className="text-primary-foreground z-50 w-full">
        <title>Gulf Legacy Football</title>
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
          <Link href="/">
          <Image src={logo} alt="alt" width={100} height={100} />
          </Link>
          <nav className="w-full md:w-auto">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 items-stretch">
              <li className="w-full md:w-auto">
                <Link href="/home" className="block w-full">
                  <Button variant="ghost" className="rounded-xl w-full hover:text-primary hover:bg-primary-foreground">
                    Home
                  </Button>
                </Link>
              </li>
              <li className="w-full md:w-auto">
                <Link href="/standings" className="block w-full">
                  <Button variant="ghost" className="rounded-xl w-full hover:text-primary hover:bg-primary-foreground">
                    Standings
                  </Button>
                </Link>
              </li>
              <li className="w-full md:w-auto">
                <Link href="/schedule" className="block w-full">
                  <Button variant="ghost" className="rounded-xl w-full hover:text-primary hover:bg-primary-foreground">
                    Schedule
                  </Button> 
                </Link>
              </li>
              <li className="w-full md:w-auto">
                <Link href="/guidelines" className="block w-full">
                  <Button variant="ghost" className="rounded-xl w-full hover:text-primary hover:bg-primary-foreground">
                    Guidelines
                  </Button>
                </Link>
              </li>
              <li className="w-full md:w-auto">
                <Link href="/blog" className="block w-full">
                  <Button variant="ghost" className="rounded-xl w-full hover:text-primary hover:bg-primary-foreground">
                    Blog
                  </Button>
                </Link>
              </li>
              <li className="w-full md:w-auto">
                <Link href="/register" className="block w-full ">
                  <Button variant="secondary" className="w-full bg-accent text-primary hover:text-accent-foreground/75 hover:bg-accent/75 rounded-xl">
                    Register Now!
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        </header>
    </div>
  )
}