import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { User, Mail, FileText, GraduationCap, Briefcase, Award, Settings } from 'lucide-react';

interface ProfileEditSidebarProps {
  // No props needed anymore
}

const sections = [
  {
    id: 'profile-information',
    label: 'Profile Information',
    icon: User,
  },
  {
    id: 'contact-information',
    label: 'Contact Information',
    icon: Mail,
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: FileText,
  },
  {
    id: 'education',
    label: 'Education',
    icon: GraduationCap,
  },
  {
    id: 'work-experience',
    label: 'Work Experience',
    icon: Briefcase,
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: Award,
  },
  {
    id: 'additional-sections',
    label: 'Additional Sections',
    icon: Settings,
  },
];

export function ProfileEditSidebar({}: ProfileEditSidebarProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const header = document.querySelector('header');
      const headerOffset = header ? header.offsetHeight : 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="space-y-1">
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <Button
            key={section.id}
            variant="ghost"
            className={cn(
              "w-full justify-start",
              "hover:bg-muted transition-colors duration-200",
              "focus:bg-muted"
            )}
            onClick={() => scrollToSection(section.id)}
          >
            <Icon className="h-4 w-4 mr-2" />
            {section.label}
          </Button>
        );
      })}
    </nav>
  );
}