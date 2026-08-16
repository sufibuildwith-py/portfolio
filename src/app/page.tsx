import { CinematicHero } from "@/components/hero/CinematicHero";
import { IdentitySection } from "@/components/about/IdentitySection";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { SentinelExperience } from "@/components/sentinel/SentinelExperience";
import { CapabilitiesSection } from "@/components/capabilities/CapabilitiesSection";
import ContactSection from "@/components/ContactSection";
import { ProjectsSection } from "@/app/_sections/projects/ProjectsSection";
import ExperienceSection from "@/app/_sections/experience/ExperienceSection";
export default function Home() {
  return (
    <main>
      <CinematicHero />

      <IdentitySection />

      <CapabilitiesSection />

      <FeaturedProject />

      <SentinelExperience />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}