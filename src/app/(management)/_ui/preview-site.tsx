"use client";
import { useState, useEffect } from "react";
import PreviewSVG from "./previewSVG";
import { Button, Icon, Text, useColorMode } from "@chakra-ui/react";
import Error from "next/error";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export const PreviewSite = ({
  projectId,
  projectName,
  projectHostName,
  images,
}: {
  projectId: string;
  projectName: string;
  projectHostName: string;
  images: {
    light: {
      desktop?: string;
      tablet?: string;
      mobile?: string;
    };
    dark: {
      desktop?: string;
      tablet?: string;
      mobile?: string;
    };
  };
}) => {
  const [previewData, setPreviewData] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewColorMode, setPreviewColorMode] = useState<"light" | "dark">(
    "light"
  );
  // const url = "https://dieren-manieren.nl";
  const { colorMode } = useColorMode();
  console.log(images);

  useEffect(() => {
    const fetchData = async () => {
      if (!projectHostName) return;
      try {
        const response = await fetch("https://" + projectHostName);
        const data = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const title = doc.querySelector("title")
          ? doc.querySelector("title")?.innerText || ""
          : "No title found";
        const description = doc.querySelector("meta[name='description']")
          ? doc
              .querySelector("meta[name='description']")
              ?.getAttribute("content") || ""
          : "No description found";

        setPreviewData({
          title,
          description,
        });
        setLoading(false);
      } catch (error: any) {
        if (error.message === "Failed to fetch") {
          setPreviewData({
            title: projectName,
            description: "Failed to fetch",
          });
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId, projectHostName, projectName, images]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!previewData) {
    return <div>No preview data found</div>;
  }

  const handleClick = () => {
    window.open("https://" + projectHostName, "_blank");
  };

  console.log(images);

  return (
    <>
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg"
        style={{ cursor: "pointer" }}
      >
        <PreviewSVG
          onClick={handleClick}
          darkMode={previewColorMode === "dark"}
          imageUrls={images}
        />
        <div className="px-6 py-4">
          <div
            className={
              "font-bold text-xl mb-2" +
              (colorMode === "dark" ? " text-white" : " text-black")
            }
          >
            {previewData.title}
          </div>
          <p
            className={
              "text-gray-700 text-base" +
              (colorMode === "dark" ? " text-white" : " text-black")
            }
          >
            {previewData.description}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span
            className={
              "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 right" +
              (colorMode === "dark" ? " text-white" : " text-black")
            }
          >
            <Button
              onClick={() =>
                setPreviewColorMode(
                  previewColorMode === "light" ? "dark" : "light"
                )
              }
            >
              <Icon
                as={previewColorMode === "light" ? MdDarkMode : MdLightMode}
                boxSize="6"
              />
            </Button>
          </span>
        </div>
      </div>
    </>
  );
};
