import ModuleBlock from "@/components/ModuleBlock";
import module_json from "../module_info.json";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-gray-50 to-white pb-20 pt-16 flex flex-col items-center border-b border-gray-100">
        <div className="max-w-3xl w-full flex flex-col items-center text-center px-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 mt-8 tracking-tight bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
            Your Educational Compass
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Planting the seeds of knowledge for a flourishing degree and career.{" "}
            <br />
            Explore, connect, and master computer science with CSPrime.
          </p>
          <Link href="/modules">
            <button className="bg-black hover:bg-gray-900 py-3 px-8 text-white rounded-full text-lg font-semibold shadow transition-all">
              Get Started
            </button>
          </Link>
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
