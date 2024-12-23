import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RoleSelector } from '../RoleSelector';
import { LocationSelector } from '../LocationSelector';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AvailabilityProps {
  data: {
    availability: {
      status: string;
      isAvailable: boolean;
      roles?: any[];
      workStyles?: string[];
      locations?: any[];
    };
  };
  onChange: (field: string, value: any) => void;
}

export function Availability({ data, onChange }: AvailabilityProps) {
  const handleAvailabilityChange = (updates: any) => {
    onChange('availability', { ...data.availability, ...updates });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Search Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Looking for Work?</Label>
            <p className="text-sm text-muted-foreground">Make your profile visible to recruiters</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={!data.availability.isAvailable ? 'text-muted-foreground font-medium' : ''}>No</span>
            <Switch
              checked={data.availability.isAvailable}
              onCheckedChange={(checked) => handleAvailabilityChange({ isAvailable: checked })}
            />
            <span className={data.availability.isAvailable ? 'text-muted-foreground font-medium' : ''}>Yes</span>
          </div>
        </div>

        {data.availability.isAvailable && (
          <>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={data.availability.status}
                onValueChange={(value) => handleAvailabilityChange({ status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="actively-looking">Actively Looking</SelectItem>
                  <SelectItem value="open">Open to Opportunities</SelectItem>
                  <SelectItem value="casually-looking">Casually Looking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <RoleSelector
              roles={data.availability.roles || []}
              onRolesChange={(roles) => handleAvailabilityChange({ roles })}
            />

            <div className="space-y-2">
              <Label>Work Style Preferences</Label>
              <div className="flex flex-wrap gap-2">
                {['remote', 'hybrid', 'inPerson'].map((style) => (
                  <Button
                    key={style}
                    type="button"
                    variant={data.availability.workStyles?.includes(style) ? 'default' : 'outline'}
                    onClick={() => {
                      const currentStyles = data.availability.workStyles || [];
                      handleAvailabilityChange({
                        workStyles: currentStyles.includes(style)
                          ? currentStyles.filter(s => s !== style)
                          : [...currentStyles, style]
                      });
                    }}
                  >
                    {style === 'inPerson' ? 'In Person' : style.charAt(0).toUpperCase() + style.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {data.availability.workStyles?.some(style => 
              style === 'hybrid' || style === 'inPerson'
            ) && (
              <LocationSelector
                workStyle={data.availability.workStyles.includes('hybrid') ? 'hybrid' : 'inPerson'}
                locations={data.availability.locations || []}
                onLocationsChange={(locations) => handleAvailabilityChange({ locations })}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}