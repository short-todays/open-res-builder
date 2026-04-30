import { useResumeStore } from '../../store/resumeStore';
import TextField from '../FormFields/TextField';

export default function SummaryForm() {
  const { resume, setSummary } = useResumeStore();

  return (
    <TextField
      label="Professional Summary"
      placeholder="Brief overview of your professional background, skills, and career goals..."
      value={resume.summary}
      onChange={setSummary}
      multiline
      rows={4}
      helperText="2-3 sentences highlighting your key qualifications and what you're looking for"
    />
  );
}
