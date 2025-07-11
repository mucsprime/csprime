import React from "react";
import { GraduationCap, Users, Target, BookOpen } from "lucide-react";

function Page() {
  return (
    <div className="max-w-4xl mx-auto pt-4 pb-12 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2 mt-10">About CSPrime</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Your educational compass for navigating the world of Computer Science
          at Maynooth University.
        </p>
      </header>

      {/* Mission Section */}
      <section className="mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-blue-900">Our Mission</h2>
          </div>
          <p className="text-lg text-blue-800 leading-relaxed">
            CSPrime is dedicated to transforming how Computer Science students
            explore, understand, and connect with their curriculum. We believe
            that education should be interactive, visual, and accessible to
            every student, regardless of their background or experience level.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold">Module Exploration</h3>
            </div>
            <p className="text-gray-600">
              Browse through all Computer Science modules with detailed
              information about content, prerequisites, and learning outcomes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <GraduationCap className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold">Visual Learning</h3>
            </div>
            <p className="text-gray-600">
              Interactive charts and graphs help you understand module
              relationships and curriculum progression.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-6 h-6 text-orange-600" />
              <h3 className="text-lg font-semibold">AI-Powered Chat</h3>
            </div>
            <p className="text-gray-600">
              Get instant answers to your questions about modules, topics, and
              career preparation through our intelligent assistant.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold">Career Guidance</h3>
            </div>
            <p className="text-gray-600">
              Understand which modules are most valuable for internships and
              career development in the tech industry.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Key Features</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold mb-1">
                Comprehensive Module Database
              </h3>
              <p className="text-gray-600 text-sm">
                Access detailed information about every CS module, including
                prerequisites, learning outcomes, and semester scheduling.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold mb-1">Interactive Analytics</h3>
              <p className="text-gray-600 text-sm">
                Visualize module distributions, skill hierarchies, and
                internship requirements through interactive charts and graphs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold mb-1">Topic-Based Learning</h3>
              <p className="text-gray-600 text-sm">
                Explore subjects by topic rather than just modules, helping you
                understand the broader curriculum connections.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h3 className="font-semibold mb-1">AI Chat Assistant</h3>
              <p className="text-gray-600 text-sm">
                Get personalized help and answers to your questions about
                modules, career paths, and academic planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Support */}
      <section className="text-center">
        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-4">
            Have questions, suggestions, or feedback? We'd love to hear from
            you!
          </p>
          <p className="text-sm text-gray-500">
            CSPrime is designed and maintained for the Computer Science
            community at Maynooth University.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Page;
