import getProjects from "@/app/api/projects/getProjects";
import Card from "../_ui/card";
import { PreviewSite } from "../_ui/preview-site";
import { makeScreenshots } from "@/app/api/projects/makeScreenshots";
import { BrowserSize } from "@/enums/browserSizes";
import { Project } from "@/app/api/projects/project";

export const revalidate = 3600;
const DashboardPage: React.FC = async () => {
  const projects = await getProjects();

  console.log(projects);

  return (
    <div>
      <h1>Dashboard Page</h1>
      {projects.map((project) => (
        <div key={project.id}>
          <PreviewSite
            projectId={project.id}
            projectName={project.name}
            projectHostName={project.websiteUrl}
            images={project.images}
          />
        </div>
      ))}

      {/* Add your page content here */}
    </div>
  );
};

export default DashboardPage;
