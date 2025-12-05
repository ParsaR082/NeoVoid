export type Project = {
  id: string;
  title: string;
  summary: string;
  tech?: string[];
  links?: Record<string, string>;
  status?: string;
  featured?: boolean;
  order?: number;
  createdAt?: number;
  updatedAt?: number;
};

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags?: string[];
  featured?: boolean;
  publishedAt: number;
  updatedAt?: number;
};

export type Member = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  links?: Record<string, string>;
  order?: number;
  status?: string;
};
