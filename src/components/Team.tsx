"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./Team.module.css";

const TEAM = [
  {
    name: "Patrick Alpaugh, MBA",
    role: "Co-Founder & CEO",
    bio: "Patrick works directly with clients to identify high-impact AI opportunities and turn them into working systems. He brings a sharp focus on measurable outcomes \u2014 if it doesn\u2019t move the needle, it doesn\u2019t make the roadmap.",
    image: "/images/team/patrick_headshot.jpeg",
  },
  {
    name: "James Parker, MBA",
    role: "Co-Founder & COO",
    bio: "James drives client strategy and business development, connecting organizations with the right AI solutions for their specific challenges. He ensures every engagement starts with a clear understanding of the problem and ends with measurable results.",
    image: "/images/team/james_headshot.jpeg",
  },
  {
    name: "Keegan Whitney, MBA",
    role: "Co-Founder & CAIO",
    bio: "Keegan architects and builds the AI systems that power client engagements \u2014 from intelligent automation to custom integrations. He ensures every solution is production-grade, maintainable, and delivering value from day one.",
    image: "/images/team/keegan_headshot.jpeg",
  },
  {
    name: "Gavan Hanspal",
    role: "Co-Founder & CRO",
    bio: "Gavan leads growth strategy and digital operations, bringing hands-on experience scaling tech ventures and optimizing marketing through data-driven decision-making. He ensures every client engagement is backed by sharp execution and a clear path to revenue.",
    image: "/images/team/gavan_headshot.jpeg",
  },
];

export default function Team() {
  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.content}`}>
        <ScrollReveal>
          <p className="section-label">Our Team</p>
          <h2 className="section-title">Meet the Team</h2>
        </ScrollReveal>

        <div className={styles.grid}>
          {TEAM.map((member, i) => (
            <ScrollReveal key={member.name} delay={200 + i * 200}>
              <div className={styles.card}>
                <div className={styles.avatar}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className={styles.headshot}
                  />
                </div>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.bio}>{member.bio}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
