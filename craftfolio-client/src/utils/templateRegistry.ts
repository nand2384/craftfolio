import React from 'react';

// Vite feature to automatically scan the templates directory
// This finds any Index.tsx file inside a subdirectory of src/templates
const modules = import.meta.glob('../templates/*/Index.tsx');

interface TemplateRegistry {
  [key: string]: React.LazyExoticComponent<React.ComponentType<any>>;
}

export const templateMap: TemplateRegistry = {};

// Process the discovered modules to create a dynamic lookup map
Object.entries(modules).forEach(([path, loader]) => {
  // Extract the folder name (e.g., 'template1') from the file path
  const match = path.match(/\.\.\/templates\/(.+)\/Index\.tsx/);
  if (match) {
    const templateName = match[1];
    // Create a lazy-loaded component for each template
    templateMap[templateName] = React.lazy(loader as any);
  }
});

/**
 * Use this map to dynamically render templates based on their directory name.
 * Example: <templateMap['template1'] />
 */
