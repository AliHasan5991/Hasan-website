"use client";

import { motion } from "framer-motion";

export default function FooterContact() {
  return (
    <footer className="bg-black py-24 px-6 sm:px-12 lg:px-24 border-t border-white/5 relative z-30 pb-40">
      <div className="max-w-4xl mx-auto flex flex-col justify-center text-center">
        
        {/* Education & Certs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h4 className="text-white text-3xl font-semibold mb-12">Education & Professional Development</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left glass-panel p-8 rounded-3xl">
            <div>
              <p className="text-accent font-semibold tracking-wide mb-1">Bachelor of Mass Media</p>
              <p className="text-white/60 text-sm">Mumbai University - 2013</p>
            </div>
            
            <div>
              <p className="text-accent font-semibold tracking-wide mb-1">Diploma in Applied Psychology</p>
              <p className="text-white/60 text-sm">Professional Certification</p>
            </div>

            <div>
              <p className="text-accent font-semibold tracking-wide mb-1">Clinical Healthcare Training</p>
              <p className="text-white/60 text-sm leading-relaxed">
                80+ hours in cardiac & pulmonary anatomy, physiology, and clinical terminology.
              </p>
            </div>
          </div>
        </motion.div>

      </div>

      <div className="max-w-6xl mx-auto mt-12 text-center">
        <p className="text-white/30 text-xs font-mono uppercase tracking-widest">
          © {new Date().getFullYear()} Hasan Ali Shaikh. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
