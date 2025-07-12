import ModuleBlock from "@/components/ModuleBlock";
import module_json from "../module_info.json";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-100 overflow-hidden flex items-center">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-slate-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gray-400 rounded-full mix-blend-multiply filter blur-xl opacity-25"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-zinc-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center text-center w-full">
          {/* Main heading with enhanced gradient */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 bg-clip-text text-transparent">
              Navigate Your CS
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-800 via-slate-800 to-neutral-800 bg-clip-text text-transparent">
              Journey
            </span>
          </h1>

          {/* Enhanced subtitle */}
          <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-3xl leading-relaxed">
            Explore 50+ modules, visualize connections, and get instant help.
            <br className="hidden sm:block" />
            <span className="font-semibold text-gray-800">
              Your complete Computer Science learning companion.
            </span>
          </p>

          {/* Enhanced CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/modules">
              <button className="group relative bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-gray-900 py-4 px-8 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-slate-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
            <Link href="/chat">
              <button className="group flex items-center gap-2 px-6 py-4 text-slate-600 hover:text-slate-800 font-medium transition-all duration-300 hover:scale-105">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Ask Questions
              </button>
            </Link>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-12 text-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="currentColor"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </section>

      {/* Value Props */}
      <section className="w-full flex flex-col md:flex-row justify-center gap-8 py-10 px-4 bg-white">
        <div className="flex-1 max-w-xs mx-auto text-center">
          <div className="text-3xl mb-2">🚀</div>
          <h3 className="font-bold text-lg mb-1">Interactive Learning</h3>
          <p className="text-gray-600 text-sm">
            Chat, visualize, and explore modules and topics in a way that
            sticks.
          </p>
        </div>
        <div className="flex-1 max-w-xs mx-auto text-center">
          <div className="text-3xl mb-2">🔗</div>
          <h3 className="font-bold text-lg mb-1">Connected Curriculum</h3>
          <p className="text-gray-600 text-sm">
            See how modules and topics build on each other, from first year to
            final year.
          </p>
        </div>
        <div className="flex-1 max-w-xs mx-auto text-center">
          <div className="text-3xl mb-2">💡</div>
          <h3 className="font-bold text-lg mb-1">For Every Student</h3>
          <p className="text-gray-600 text-sm">
            Whether you’re just starting or prepping for an internship, CSPrime
            is your guide.
          </p>
        </div>
      </section>

      {/* Featured Modules Grid */}
      <section className="w-full bg-gray-50 py-12 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto w-full px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Featured Modules
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {Object.entries(module_json)
              .slice(0, 6)
              .map(([code, data]) => (
                <ModuleBlock
                  key={code}
                  code={code}
                  title={data.title}
                  year={data.year}
                  semester={data.semester}
                />
              ))}
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/modules">
              <button className="px-6 py-2 rounded-full border border-gray-300 bg-white hover:bg-gray-100 font-semibold text-gray-700 transition-all shadow">
                View All Modules
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            How CSPrime Works
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            <div className="flex-1 max-w-xs mx-auto text-center flex flex-col items-center">
              <div className="text-4xl mb-2">1️⃣</div>
              <h4 className="font-bold mb-1">Explore Modules & Topics</h4>
              <p className="text-gray-600 text-sm min-h-[48px] flex items-center justify-center">
                Browse the curriculum, see prerequisites, and discover what each
                module covers.
              </p>
            </div>
            <div className="flex-1 max-w-xs mx-auto text-center flex flex-col items-center">
              <div className="text-4xl mb-2">2️⃣</div>
              <h4 className="font-bold mb-1">Visualize Connections</h4>
              <p className="text-gray-600 text-sm min-h-[48px] flex items-center justify-center">
                Use interactive graphs and charts to understand how your
                learning journey fits together.
              </p>
            </div>
            <div className="flex-1 max-w-xs mx-auto text-center flex flex-col items-center">
              <div className="text-4xl mb-2">3️⃣</div>
              <h4 className="font-bold mb-1">Get Instant Help</h4>
              <p className="text-gray-600 text-sm min-h-[48px] flex items-center justify-center">
                Ask questions in the chat, get tips, and access resources
                tailored to your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="w-full py-12 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            What Students Say
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="flex-1 max-w-xs bg-white rounded-xl shadow p-6 border border-gray-100">
              <div className="text-2xl mb-2">“</div>
              <p className="text-gray-700 mb-4">
                CSPrime made it so much easier to plan my degree and understand
                what I need for my internship!
              </p>
              <div className="font-bold text-gray-900">
                — A Computer Science Student
              </div>
            </div>
            <div className="flex-1 max-w-xs bg-white rounded-xl shadow p-6 border border-gray-100">
              <div className="text-2xl mb-2">“</div>
              <p className="text-gray-700 mb-4">
                The visualizations and chat are a game changer. I wish I had
                this in first year!
              </p>
              <div className="font-bold text-gray-900">
                — Final Year Student
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
