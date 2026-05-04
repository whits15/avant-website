"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./Team.module.css";

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const TEAM = [
  {
    name: "Patrick Alpaugh, MBA",
    location: "London, Ontario",
    role: "Founder & CEO",
    bio: [
      "A seasoned analyst in both private equity and venture capital, he has also held sales and operations roles within PE and VC-backed companies. In his most recent role he introduced a breakthrough AI-powered inventory counting solution to the largest restaurant groups in Canada—and personally owned and serviced every one of those accounts.",
      "Patrick founded this firm to bring that same technical mastery and proven commercial discipline to Canadian PE, VC, and family offices. The mission is simple: ship working AI workflows in weeks, not quarters — so Canadian funds can move on opportunity at the speed the modern deal cycle demands.",
    ],
    image: "/images/team/patrick_headshot.jpeg",
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

        <div className={styles.teamContainer}>
          {TEAM.map((member, i) => (
            <ScrollReveal key={member.name} delay={200 + i * 200}>
              <div className={styles.memberCard}>
                <div className={styles.memberHeader}>
                  <h3 className={styles.name}>{member.name}</h3>
                  <div className={styles.location}>
                    <MapPinIcon />
                    <span>{member.location}</span>
                  </div>
                </div>

                <hr className={styles.dividerFull} />

                <div className={styles.memberBody}>
                  <div className={styles.memberLeft}>
                    <p className={styles.role}>{member.role}</p>
                    <div className={styles.avatar}>
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={220}
                        height={220}
                        className={styles.headshot}
                      />
                    </div>
                  </div>
                  <div className={styles.memberRight}>
                    {member.bio.map((paragraph, index) => (
                      <p key={index} className={styles.bioParagraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
