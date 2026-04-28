import React from "react";

export type DataState = {
  templateId: string;
  craftId: string | null;
  craftName: string | null;
  data: any;
  links: any;
  userCrafts: any[] | [];
  loadingCrafts: boolean;
};

export type AuthState = {
  jwt: string;
  role_id: number;
  userData: {
    first_name: string;
    last_name: string;
    email: string;
    avatar_url: string;
  },
  loading: boolean;
  error: string;
};

export type OtpState = {
  email: string;
  otp: number;
  loading: boolean;
}

export type RegisterData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
}

export interface Template {
  template_id: number;
  name: string;
  profession_id: number;
  profession_slug: string;
  thumbnail: string;
  description: string;
  blueprint_key: string;
}

export interface TemplateState {
  templates: Template[];
  loading: boolean;
  error: string | null;
}

export type ViewMode = 'desktop' | 'tablet' | 'mobile';

export interface TemplateRegistry {
  [key: string]: React.LazyExoticComponent<React.ComponentType<any>>;
}
