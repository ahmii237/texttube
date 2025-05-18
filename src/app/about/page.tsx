"use client";

import Image from "next/image";

import Link from "next/link";
export default function About() {



  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* TextUbe Introduction Section */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-6">About TexTube</h1>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <p className="text-lg mb-4">
            Welcome to TexTube, a revolutionary platform dedicated to creating,
            sharing, and experiencing text-based content in innovative ways.
            Founded with the vision of making written communication more
            engaging and interactive, TexTube bridges the gap between
            traditional text platforms and modern multimedia experiences.
          </p>
          <p className="text-lg mb-4">
            Our platform offers tools for creators to enhance their written
            content with dynamic elements, interactive features, and seamless
            sharing capabilities. Whether you are a blogger, content creator,
            educator, or business professional, TexTube provides you with the
            resources to transform ordinary text into extraordinary experiences.
          </p>
          <p className="text-lg">
            At TexTube, we believe in the power of words to connect, inspire,
            and transform. Join our growing community and discover new ways to
            bring your ideas to life through the art of text.
          </p>
        </div>
      </section>

      {/* Developer Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Meet the Developer</h2>
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-64 h-100 rounded-xl overflow-hidden">
              <Image
                src="/images/profile-image.png"
                alt="Mudasar Ahmad"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <h3 className="text-2xl font-semibold mb-3">Mudasar Ahmad</h3>
            <p className="text-gray-600 mb-2">
              Software Engineering Student | Web Developer
            </p>
            <div className="flex items-center gap-2 mb-4">
              <a
                href="https://www.linkedin.com/in/mudasar-ahmad-836873330/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                LinkedIn
              </a>
              <span className="text-gray-500">|</span>
              <a
                href="mailto:mudasarofficial237@gmail.com"
                className="text-blue-600 hover:text-blue-800"
              >
                mudasarofficial237@gmail.com
              </a>
            </div>
            <p className="text-lg mb-4">
              I am a passionate Software Engineering student at Comsats
              University Islamabad (2022-Present) with expertise in various
              programming languages (C, C++, Java, HTML, CSS, JavaScript, SQL)
              and modern frameworks (React, Next.js, Node.js, Firebase, Flutter,
              Strapi CMS). My academic journey has strengthened my foundation in
              programming fundamentals, web technologies, OOP, database systems,
              and mobile development. I have successfully created several
              projects including a Java-based Tetris game, RailEase railway
              ticket booking platform, and Imagify mobile app for AI image
              generation and editing. As an active member of tech communities
              like RAS CUI Society and GDSC CUI Society, I continuously expand
              my knowledge and network while pursuing innovative solutions in
              software development.
            </p>
            <Link href="/contactus">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Hire Me
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
