'use client';

import { useState, FormEvent } from 'react';

interface SubmitFormProps {
  csrfToken: string;
  formType: 'ai' | 'gpt';
}

export default function SubmitForm({ csrfToken, formType }: SubmitFormProps) {
  const [toolName, setToolName] = useState('');
  const [toolUrl, setToolUrl] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Construct mailto link
      const subject = `New Submission: ${toolName}`;
      const body = `
Name: ${toolName}
Your Site: ${toolUrl}
Your Mail: ${email}

Description:
${description}
      `.trim();

      const mailtoUrl = `mailto:dc556316@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Open default mail client
      window.location.href = mailtoUrl;

      // Optional: Reset form or show success message (though mailto is external)
      // We'll just reset for now as the user leaves the page context usually
      setToolName('');
      setToolUrl('');
      setDescription('');
      setEmail('');

    } catch (error) {
      console.error('Error opening mail client:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formTitle = formType === 'ai' ? 'AI Tool' : 'GPT';

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 w-full max-w-full">
      {/* Hidden CSRF token - kept for structure but unused in mailto */}
      <input type="hidden" name="csrf_token" value={csrfToken} />

      <div className="w-full">
        <label htmlFor="toolName" className="block text-sm font-medium text-foreground mb-1">
          Name
        </label>
        <input
          type="text"
          id="toolName"
          name="toolName"
          value={toolName}
          onChange={(e) => setToolName(e.target.value)}
          required
          className="block w-full rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground shadow-sm focus:border-ring focus:ring-ring px-3 py-2"
        />
      </div>

      <div className="w-full">
        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="block w-full rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground shadow-sm focus:border-ring focus:ring-ring px-3 py-2 resize-y"
          placeholder={`Describe your ${formTitle} and its key features`}
        />
      </div>

      <div className="w-full">
        <label htmlFor="toolUrl" className="block text-sm font-medium text-foreground mb-1">
          Your Site
        </label>
        <input
          type="url"
          id="toolUrl"
          name="toolUrl"
          value={toolUrl}
          onChange={(e) => setToolUrl(e.target.value)}
          required
          className="block w-full rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground shadow-sm focus:border-ring focus:ring-ring px-3 py-2"
        />
      </div>

      <div className="w-full">
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
          Your Mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full rounded-md border border-border bg-card text-foreground placeholder:text-muted-foreground shadow-sm focus:border-ring focus:ring-ring px-3 py-2"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Opening Mail Client...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}