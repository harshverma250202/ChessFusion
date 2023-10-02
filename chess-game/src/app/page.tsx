import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-24 bg-gray-100">
      {/* Header */}
      <header className="text-4xl font-bold mb-10">
        Welcome to ChessFusion
      </header>

      {/* Main Content */}
      <section className="flex flex-col items-center justify-center w-full">
        
        {/* Description */}
        <div className="mb-10 text-center">
          <p className="text-lg">
            Master the game of kings and queens with ChessFusion. 
          </p>
          <p className="text-lg">
            Choose your mode to get started!
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <Link href="/online"className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Play Online
           
          </Link>
          <Link href="/computer" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Play Computer
          
          </Link>
          <Link href="/1v1"className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Play With Friend
          
          </Link>
        </div>

        {/* Image */}
        <div className="mb-10">
          <Image 
            src="/path/to/your/chess/image.jpg"
            alt="Chess board and pieces"
            width={500}
            height={300}
          />
        </div>

      </section>

      {/* Footer */}
      <footer className="text-center w-full border-t p-4">
        <p className="text-sm">
          &copy; 2023 ChessFusion. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
