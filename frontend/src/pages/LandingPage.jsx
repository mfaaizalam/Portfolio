import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    { title: "Nomadic Vision", category: "Brand Identity", year: "2024" },
    { title: "Empire Builder", category: "Web Experience", year: "2024" },
    { title: "Silk Road Digital", category: "E-Commerce", year: "2023" },
    { title: "Khan's Archive", category: "Documentation", year: "2023" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="bg-zinc-950 text-gray-100 overflow-x-hidden font-serif">
      {/* Animated Cursor */}
      <motion.div
        className="fixed w-5 h-5 border-2 border-amber-500 rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-200 origin-left z-50"
        style={{ scaleX: smoothProgress }}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-4 sm:px-8 overflow-hidden">
        <motion.div 
          className="max-w-7xl w-full z-10 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="font-mono text-xs sm:text-sm tracking-[0.15em] uppercase text-amber-500 mb-8"
            variants={itemVariants}
          >
            Portfolio 2024 — Creative Studio
          </motion.div>
          
          <motion.h1 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-[0.9] mb-8 tracking-tight"
            variants={itemVariants}
          >
            <span className="block">Golden</span>
            <span className="block text-amber-500 italic">Horde</span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg lg:text-xl leading-relaxed text-gray-400 max-w-2xl mx-auto mb-12 font-serif"
            variants={itemVariants}
          >
            Crafting digital experiences that conquer the modern landscape.
            <br />Where tradition meets innovation.
          </motion.p>
          
          <motion.div 
            className="flex gap-4 justify-center flex-wrap"
            variants={itemVariants}
          >
            <button className="px-10 py-4 text-base font-mono bg-amber-500 text-zinc-950 uppercase tracking-wider font-semibold hover:bg-amber-300 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2 group">
              View Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="px-10 py-4 text-base font-mono bg-transparent text-amber-500 border-2 border-amber-500 uppercase tracking-wider font-semibold hover:bg-amber-500/10 transition-all duration-300 hover:-translate-y-1">
              Get in Touch
            </button>
          </motion.div>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="absolute w-full h-full top-0 left-0 z-0 overflow-hidden">
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full blur-[80px] opacity-15 bg-gradient-radial from-amber-500 to-transparent -top-48 -right-48"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-[80px] opacity-15 bg-gradient-radial from-amber-700 to-transparent -bottom-64 -left-64"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light mb-16 text-center tracking-tight">
            Selected Works
          </h2>
          
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white/[0.02] border border-amber-500/10 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 transition-all duration-400 cursor-pointer hover:bg-amber-500/5 hover:border-amber-500/30 hover:scale-[1.02]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
              >
                <div className="font-mono text-4xl sm:text-5xl text-amber-500 opacity-30 font-light">
                  0{index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal mb-2 tracking-tight">
                    {project.title}
                  </h3>
                  <div className="flex gap-8 font-mono text-sm text-gray-500">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                </div>
                <motion.div 
                  className="text-3xl sm:text-4xl text-amber-500"
                  whileHover={{ x: 5 }}
                >
                  →
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-8 bg-gradient-to-b from-zinc-950 to-zinc-900">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-4xl mb-20">
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-light mb-8 tracking-tight"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Building Digital Empires
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-400 font-serif"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Like the legendary warriors of the steppes, we move swiftly and strike with precision. 
              Our creative studio merges ancestral wisdom with cutting-edge technology to build 
              unforgettable digital experiences.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-light text-amber-500 mb-2">
                50+
              </div>
              <div className="font-mono text-sm text-gray-500 uppercase tracking-wider">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-light text-amber-500 mb-2">
                15+
              </div>
              <div className="font-mono text-sm text-gray-500 uppercase tracking-wider">
                Countries Reached
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-light text-amber-500 mb-2">
                98%
              </div>
              <div className="font-mono text-sm text-gray-500 uppercase tracking-wider">
                Client Satisfaction
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-4 sm:px-8 border-t border-amber-500/10">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
            <div className="lg:col-span-2">
              <h3 className="text-2xl sm:text-3xl text-amber-500 mb-2">Golden Horde</h3>
              <p className="text-gray-500 font-serif">Conquering the digital frontier</p>
            </div>
            
            <div>
              <h4 className="text-base font-semibold mb-4 text-amber-500 font-mono uppercase tracking-wider">
                Connect
              </h4>
              <a href="#twitter" className="block text-gray-400 mb-2 hover:text-amber-500 transition-colors font-serif">
                Twitter
              </a>
              <a href="#instagram" className="block text-gray-400 mb-2 hover:text-amber-500 transition-colors font-serif">
                Instagram
              </a>
              <a href="#linkedin" className="block text-gray-400 mb-2 hover:text-amber-500 transition-colors font-serif">
                LinkedIn
              </a>
            </div>
            
            <div>
              <h4 className="text-base font-semibold mb-4 text-amber-500 font-mono uppercase tracking-wider">
                Contact
              </h4>
              <a href="#email" className="block text-gray-400 mb-2 hover:text-amber-500 transition-colors font-serif">
                hello@goldenhorde.co
              </a>
              <a href="#phone" className="block text-gray-400 mb-2 hover:text-amber-500 transition-colors font-serif">
                +1 (555) 123-4567
              </a>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-white/5 font-mono text-sm text-gray-600">
            <p>© 2024 Golden Horde. All rights reserved.</p>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default Landing;