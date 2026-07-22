import React from 'react';
import Skills from '../components/Skills';

export default function SkillsPage({ skills }) {
  return (
    <div style={{ paddingTop: '120px' }}>
      <Skills skills={skills} />
    </div>
  );
}
