import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const MermaidDiagram = ({ chart, id }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Initialize mermaid with configuration
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
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
      fontSize: 14,
      flowchart: {
        curve: 'linear',
        padding: 20,
      },
      sequence: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
      },
    });

    // Render the diagram
    if (chartRef.current && chart) {
      const renderDiagram = async () => {
        try {
          chartRef.current.innerHTML = '';
          const { svg } = await mermaid.render(id || 'mermaid-diagram', chart);
          chartRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Error rendering Mermaid diagram:', error);
          chartRef.current.innerHTML = `
            <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p class="text-red-600 text-sm">Error rendering diagram</p>
            </div>
          `;
        }
      };

      renderDiagram();
    }
  }, [chart, id]);

  return (
    <div className="my-6 p-4 bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
      <div ref={chartRef} className="flex justify-center" />
    </div>
  );
};

export default MermaidDiagram; 