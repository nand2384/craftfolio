/**
 * This registry automatically scans all template subdirectories for a default data file.
 * It uses Vite's import.meta.glob to find and eagerly import all 'data/data.ts' files.
 */

interface TemplateData {
  data: any;
  links: any;
}

interface TemplateDataRegistry {
  [key: string]: TemplateData;
}

// Automatically scan for matching data files
// { eager: true } ensures the data is imported immediately at runtime
const dataModules: any = import.meta.glob('../templates/*/data/data.ts', { eager: true });

export const templateDataMap: TemplateDataRegistry = {};

// Process discovered modules to populate the map
Object.entries(dataModules).forEach(([path, module]: [string, any]) => {
  // Extract folder name from path: ../templates/FOLDER_NAME/data/data.ts
  const match = path.match(/\.\.\/templates\/(.+)\/data\/data\.ts/);
  
  if (match) {
    const templateName = match[1];
    templateDataMap[templateName] = {
      data: module.data,
      links: module.links
    };
  }
});

/**
 * Utility to get default data for a template by its blueprint key (folder name)
 */
export const getDefaultTemplateData = (blueprintKey: string): TemplateData | undefined => {
  return templateDataMap[blueprintKey];
};
