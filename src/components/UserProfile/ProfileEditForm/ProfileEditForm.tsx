import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { ProfileEditSidebar } from './ProfileEditSidebar';
import { BasicInfo } from './sections/BasicInfo/BasicInfo';
import { ContactSection } from './sections/ContactSection';
import { ResumeSection } from './sections/ResumeSection';
import { EducationSection } from './sections/EducationSection';
import { WorkExperienceSection } from './sections/WorkExperienceSection';
import { SkillsSection } from './sections/SkillsSection';
import { AdditionalSectionsManager } from './sections/AdditionalSectionsManager';
import type { User } from '../../../types/user';

interface ProfileEditFormProps {
  user: User;
  onSave: (updates: Partial<User>) => void;
  onCancel: () => void;
}

export function ProfileEditForm({ user, onSave, onCancel }: ProfileEditFormProps) {
  const [formData, setFormData] = useState(user);
  const navigate = useNavigate();
  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    onCancel();
    navigate(`/profile/${user.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                onClick={() => onSave(formData)}
                className="bg-[#52789e] hover:bg-[#6b9cc3] text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-[5.5rem]">
            <ProfileEditSidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-16">
          <div id="profile-information">
            <BasicInfo 
              data={formData} 
              onChange={handleFieldChange} 
            />
          </div>
          
          <div id="resume">
            <ResumeSection 
              data={formData} 
              onChange={handleFieldChange} 
            />
          </div>
          
          <div id="education">
            <EducationSection
              education={formData.education || []}
              onEducationChange={(education) => 
                handleFieldChange('education', education)
              }
            />
          </div>
          
          <div id="work-experience">
            <WorkExperienceSection
              experience={formData.experience || []}
              onExperienceChange={(experience) => 
                handleFieldChange('experience', experience)
              }
            />
          </div>
          
          <div id="skills">
            <SkillsSection
              skills={formData.skills || []}
              onSkillsChange={(skills) => 
                handleFieldChange('skills', skills)
              }
            />
          </div>
          
          <div id="additional-sections">
            <AdditionalSectionsManager
              sections={formData.additionalSections || []}
              onSectionsChange={(sections) => 
                handleFieldChange('additionalSections', sections)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}