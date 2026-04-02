"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Senior Customer Success Manager, West Zone",
    company: "Turtle Shell Technologies Private LTD (Dozee)",
    date: "Jan 2024 – Present",
    domain: "AI-Powered Remote Patient Monitoring",
    points: [
      "Executed India's largest contactless patient monitoring deployment: 1,800 AI devices across 20 government medical colleges, managing complex procurement processes and hospital deans.",
      "Managed 7 enterprise hospital accounts (Apollo Group, Hinduja, Sahyadri, etc.), maintaining above-benchmark retention.",
      "Led nationwide product launch, reducing avg deployment time from 6 to 4 weeks via standardised protocols.",
      "Built and scaled a CSM team from 0 to 12 members in 18 months, reducing escalations by 40% and improving CSAT from 82% to 91%.",
      "Generated Rs 2.8 Cr in ARR through upselling, contributing to 35% YoY territory growth."
    ]
  },
  {
    role: "Area Manager – Mumbai",
    company: "Tatvacare (Digi Care Healthcare Solutions)",
    date: "Dec 2022 – Dec 2023",
    domain: "EMR Platform",
    points: [
      "Directed team of 10 Key Account Managers, improving doctor adoption from 65% to 85% and reducing churn to 5%.",
      "Partnered with Boston Consulting Group (BCG) on My-Tatva pilot program serving 500+ practitioners, generating Rs 95 Lakhs ARR.",
      "Built dedicated 6-member specialist team, creating CS playbooks adopted across 4 regional teams nationwide."
    ]
  },
  {
    role: "Area Manager – Mumbai",
    company: "Docon Technologies (Api Holdings)",
    date: "Jan 2020 – Aug 2022",
    domain: "CMS Platform",
    points: [
      "Led CMS pilot across 25 clinics generating Rs 1 Cr revenue, securing board approval for Rs 8 Cr expansion across 200+ facilities.",
      "Expanded client portfolio from 150 to 210 facilities (15% YoY growth).",
      "Supervised 9 success managers managing Rs 1 Cr+ in MRR, improving quota attainment from 78% to 89%.",
      "Architected lifecycle management framework adopted by 40 success managers nationwide, reducing implementation time by 3 weeks."
    ]
  },
  {
    role: "Marketing Coordinator & Client Expert",
    company: "Cafe Crux Designs Agency LLP",
    date: "Jan 2016 – Dec 2019",
    domain: "",
    points: [
      "Managed marketing strategy and client relationships for BFSI clients (HDFC Bank, PayNearBy), developing strong stakeholder management."
    ]
  },
  {
    role: "Customer Care Champion",
    company: "Convergys Stream PVT LTD",
    date: "Jun 2013 – Dec 2015",
    domain: "",
    points: [
      "Resolved international client queries, delivering exceptional customer-centric service."
    ]
  }
];

export default function Experience() {
  return (
    <section className="bg-black py-24 px-6 sm:px-12 lg:px-24 relative z-30">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Professional Experience
          </h3>
        </motion.div>

        <div className="space-y-12 md:space-y-16">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                {/* Timeline metadata */}
                <div className="md:w-1/3 shrink-0">
                  <div className="sticky top-24">
                    <p className="text-white/40 font-mono text-sm mb-2">{exp.date}</p>
                    <h4 className="text-white font-semibold text-lg">{exp.company}</h4>
                    {exp.domain && (
                      <p className="text-white/60 text-sm mt-1">{exp.domain}</p>
                    )}
                  </div>
                </div>

                {/* Role Details */}
                <div className="md:w-2/3 glass-panel rounded-3xl p-8 transition-all duration-300 hover:bg-white/5 hover:-translate-y-1 shadow-[0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                  <h4 className="text-accent text-xl font-medium mb-6">{exp.role}</h4>
                  <ul className="space-y-4">
                    {exp.points.map((point, i) => (
                      <li key={i} className="text-white/70 font-light leading-relaxed flex items-start">
                        <span className="text-accent/50 mr-4 mt-[0.35rem] text-xs">◆</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
