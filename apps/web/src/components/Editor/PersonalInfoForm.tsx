import { useResumeStore } from '../../store/resumeStore';
import TextField from '../FormFields/TextField';

export default function PersonalInfoForm() {
  const { resume, setPersonalInfo } = useResumeStore();
  const { personal } = resume;

  const handleChange = (field: string, value: string) => {
    setPersonalInfo({ [field]: value } as Record<string, string>);
  };

  return (
    <div className="space-y-4">
      <TextField
        label="Full Name"
        placeholder="John Doe"
        value={personal.name}
        onChange={(value) => handleChange('name', value)}
        helperText="Your full name as it should appear on your resume"
      />
      <TextField
        label="Email"
        type="email"
        placeholder="john@example.com"
        value={personal.email}
        onChange={(value) => handleChange('email', value)}
      />
      <TextField
        label="Phone"
        type="tel"
        placeholder="+1 (555) 123-4567"
        value={personal.phone}
        onChange={(value) => handleChange('phone', value)}
      />
      <TextField
        label="Location"
        placeholder="New York, NY"
        value={personal.location}
        onChange={(value) => handleChange('location', value)}
      />
    </div>
  );
}
