import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Button } from "../../../ui/button";
import { Eye, EyeOff } from 'lucide-react';

interface ContactSectionProps {
  data: {
    email?: string;
    phoneNumber?: string;
    location?: string;
    showEmail?: boolean;
    showPhone?: boolean;
    showLocation?: boolean;
  };
  onChange: (field: string, value: any) => void;
}

export function ContactSection({ data, onChange }: ContactSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Email</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange('showEmail', !data.showEmail)}
              className="text-muted-foreground"
            >
              {data.showEmail ? (
                <><Eye className="h-4 w-4 mr-2" /> Public</>
              ) : (
                <><EyeOff className="h-4 w-4 mr-2" /> Private</>
              )}
            </Button>
          </div>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Phone Number</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange('showPhone', !data.showPhone)}
              className="text-muted-foreground"
            >
              {data.showPhone ? (
                <><Eye className="h-4 w-4 mr-2" /> Public</>
              ) : (
                <><EyeOff className="h-4 w-4 mr-2" /> Private</>
              )}
            </Button>
          </div>
          <Input
            type="tel"
            value={data.phoneNumber}
            onChange={(e) => onChange('phoneNumber', e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Location</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange('showLocation', !data.showLocation)}
              className="text-muted-foreground"
            >
              {data.showLocation ? (
                <><Eye className="h-4 w-4 mr-2" /> Public</>
              ) : (
                <><EyeOff className="h-4 w-4 mr-2" /> Private</>
              )}
            </Button>
          </div>
          <Input
            value={data.location}
            onChange={(e) => onChange('location', e.target.value)}
            placeholder="Enter your location"
          />
        </div>
      </CardContent>
    </Card>
  );
}