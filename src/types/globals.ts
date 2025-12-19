export type Project = {
  title: string;
  featuredImage: string;
  images: string[];
  description: string;
  technologies: string[];
  roles: string[];
  aspectRatio: string;
  links?: ProjectLink[];
};

export type ProjectLink = {
  title: string;
  url: string;
};
