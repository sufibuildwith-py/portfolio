import { CinematicHero } from "@/components/hero/CinematicHero";
import { IdentitySection } from "@/components/about/IdentitySection";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { SentinelExperience } from "@/components/sentinel/SentinelExperience";
import { CapabilitiesSection } from "@/components/capabilities/CapabilitiesSection";
import ContactSection from "@/components/ContactSection";
import { ProjectsSection } from "@/app/_sections/projects/ProjectsSection";
import ExperienceSection from "@/app/_sections/experience/ExperienceSection";
import GuideInExperience from "@/components/guidein/GuideInExperience";
import OCRExperience from "@/components/ocr/OCRExperience";
import EducationExperience from "@/components/education/EducationExperience";
import CertificationExperience from "@/components/certificates/CertificationExperience";
export default function Home() {
  return (
    <main>
      <CinematicHero />

      <IdentitySection />

      <CapabilitiesSection />

      <FeaturedProject />

      <SentinelExperience />
       <GuideInExperience />;
       <OCRExperience />
      <ProjectsSection />
      <ExperienceSection />
      <EducationExperience />
      <CertificationExperience />
      <ContactSection />
    </main>
  );
}