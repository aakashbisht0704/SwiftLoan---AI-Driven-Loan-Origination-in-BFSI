import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center bg-black">
      {/* Background Wave Image */}
      <div id="hero" className="absolute top-0 left-0 w-full">
        <Image
          src="/light_rays.png"
          alt="Wave Effect"
          layout="intrinsic"
          width={1920}
          height={400}
          className="w-full object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-6">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold">
          AI That Understands Your <br />
          <span className="text-purple-400">Financial Needs</span>
        </h1>
        <p className="text-white/70 text-lg md:text-xl mt-4">
          Stay on Track with Your Loan. Borrow with Confidence.
        </p>

        {/* CTA Buttons */}
        <div className="mt-16 flex space-x-4 justify-center text-center items-center">
          <Link href="#features"><button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full">
            Features
          </button>
          </Link>

          <Link href="#pricing">
            <button className="px-6 py-3 border border-white/30 hover:border-white text-white rounded-full">
              View Pricing
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
