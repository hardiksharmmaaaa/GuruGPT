import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid once
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'loose',
  themeVariables: {
    primaryColor: '#3b82f6',
    primaryTextColor: '#1f2937',
    primaryBorderColor: '#2563eb',
    lineColor: '#6b7280',
    secondaryColor: '#f3f4f6',
    tertiaryColor: '#e5e7eb',
    background: '#ffffff',
    mainBkg: '#ffffff',
    secondBkg: '#f9fafb',
    tertiaryBkg: '#f3f4f6',
  },
  fontFamily: 'Inter, system-ui, sans-serif',
});

const MermaidDiagram = ({ chart, id }) => {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!chart) return;

      try {
        // Generate a unique ID if not provided
        const uniqueId = id || `mermaid-${Math.random().toString(36).substr(2, 9)}`;

        // Clear previous error
        setError(null);

        // Render the diagram
        const { svg } = await mermaid.render(uniqueId, chart);
        setSvg(svg);
      } catch (err) {
        // Set error state to silently fail rendering
        setError(err.message || 'Failed to render diagram');
      }
    };

    renderDiagram();
  }, [chart, id]);

  if (error) {
    // Silently fail by returning null, without logging to the console.
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidDiagram;
