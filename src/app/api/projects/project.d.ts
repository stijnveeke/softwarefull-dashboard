export type Project = {
  id: string;
  name: string;
  websiteUrl: string;
  images: {
    dark: {
      desktop?: string;
      tablet?: string;
      mobile?: string;
    };
    light: {
      desktop?: string;
      tablet?: string;
      mobile?: string;
    };
  };
};
