"use client";

import { motion } from "framer-motion";
import { Activity, Building2, Wrench } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Meteors } from "@/components/ui/meteors";

const skills = [
  {
    category: "Healthcare Technology",
    icon: Activity,
    items: "AI-Powered Remote Patient Monitoring, EMR/CMS Platform Implementation, Medical Device Deployment, Government Healthcare Procurement",
    span: "md:col-span-2",
  },
  {
    category: "Enterprise Management",
    icon: Building2,
    items: "Strategic Account Management, End-to-end Client Lifecycle Management, Multi-Stakeholder Alignment, Revenue Operations & ARR Growth, Executive Relationship Building, Cross-Functional Leadership, Performance Metrics Optimization, Commercial Acumen",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    category: "Technical & Tools",
    icon: Wrench,
    items: "HubSpot, LeadSquared, ZOHO, Data-Driven Decision Making, Project Management, Sales Strategies",
    span: "md:col-span-2",
  }
];

export default function Competencies() {
  return (
    <section className="bg-black py-24 px-6 sm:px-12 lg:px-24 relative z-30 overflow-hidden">
      <Meteors number={20} />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Core Competencies
          </h3>
          <p className="text-white/50 text-lg font-light max-w-xl">
            Specialised in navigating complex procurement, healthcare ecosystem management, and team leadership in highly regulated environments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={skill.span}
            >
              <SpotlightCard className="h-full p-8 flex flex-col justify-start align-top">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-white/10 rounded-xl text-white/80">
                    <skill.icon size={22} />
                  </div>
                  <h4 className="text-white font-semibold text-xl">{skill.category}</h4>
                </div>
                <p className="text-white/60 font-light leading-relaxed">
                  {skill.items}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
