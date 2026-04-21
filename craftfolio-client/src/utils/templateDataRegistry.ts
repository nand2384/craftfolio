import { data as template1Data, links as template1Links } from '../templates/template1/data/data';

interface TemplateData {
  data: any;
  links: any;
}

interface TemplateDataRegistry {
  [key: string]: TemplateData;
}

export const templateDataMap: TemplateDataRegistry = {
  template1: {
    data: template1Data,
    links: template1Links
  }
  // Add other templates here as they are created
};
