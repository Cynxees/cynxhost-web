"use client";

import { useEffect, useState } from "react";
import { useNode } from "@/app/_lib/hooks/useNode";
import { DownloadFile, ListDirectory, RemoveFile } from "@/app/_lib/services/node/fileService";
import { File as CustomFile } from "@/types/model/response";
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Breadcrumbs,
  BreadcrumbItem,
} from "@heroui/react";
import Loading from "@/app/loading";

export default function FilesPage() {
  const [files, setFiles] = useState<CustomFile[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [loading, setLoading] = useState<boolean>(false);
  const node = useNode().state.node;

  // Fetch files for the current directory with loading state
  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const response = await ListDirectory(node.ServerAlias, {
          directoryPath: currentPath,
        });
        setFiles(response.data?.Files || []);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    if (node?.ServerAlias) {
      fetchFiles();
    }
  }, [node, currentPath]);

  const handleDownload = async (filename: string) => {
    const filePath = `${currentPath}${filename}`;
    await DownloadFile(node.ServerAlias, { filePath });
  };

  const handleDelete = async (filename: string) => {
    const filePath = `${currentPath}${filename}`;
    await RemoveFile(node.ServerAlias, { filePath });
    // Refresh directory after deletion
    const updatedResponse = await ListDirectory(node.ServerAlias, { directoryPath: currentPath });
    setFiles(updatedResponse.data?.Files || []);
  };

  // When a directory is clicked, update the current path
  const handleDirectoryClick = (directoryName: string) => {
    setCurrentPath(directoryName);
  };

  // Generate breadcrumbs from the current path, filtering out any "home" segments.
  const generateBreadcrumbs = () => {
    console.log("currentPath", currentPath);
    if (currentPath === "/") {
      return [{ name: "root", path: "/" }];
    }

    const pathParts = currentPath.split("/").filter((part) => part !== "");
    console.log("pathParts", pathParts);
    const breadcrumbs = [{ name: "root", path: "/" }];
    let accumulatedPath = "/";
    pathParts.forEach((part) => {
      accumulatedPath += part + "/";
      breadcrumbs.push({ name: part, path: accumulatedPath });
    });
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleBreadcrumbClick = (path: string) => {
    setCurrentPath(path);
  };

  return (
    <div className="h-full p-5">
      {/* Heroui Breadcrumbs */}
      <Breadcrumbs variant="solid">
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem
            key={index}
            onClick={() => handleBreadcrumbClick(crumb.path)}
            className={`cursor-pointer `}
            color="primary"
          >
            {crumb.name}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>

      {/* Loading Indicator */}
      {loading ? (
        <Loading></Loading>
      ) : (
        <Table
          classNames={{
            base: "bg-background",
            table: "bg-content2 rounded-lg",
            wrapper: "bg-content2 rounded-sm drop-shadow-heavy",
          }}
          radius="sm"
          className="!h-[100%] pb-10"
          isStriped
        >
          <TableHeader>
            <TableColumn>Filename</TableColumn>
            <TableColumn>Created At</TableColumn>
            <TableColumn>Updated At</TableColumn>
            <TableColumn>Size (bytes)</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {files.map((file) => {
              // Determine if file is a directory by checking if the filename contains a period.
              const isDirectory = !file.Filename.includes(".");
              return (
                <TableRow key={file.Filename} className="cursor-pointer hover:bg-content3-50">
                  <TableCell>
                    {isDirectory ? (
                      <span
                        onClick={() => handleDirectoryClick(file.Filename)}
                        style={{ color: "blue", textDecoration: "underline" }}
                      >
                        {file.Filename.replace(currentPath, "")}
                      </span>
                    ) : (
                      file.Filename.replace(currentPath, "")
                    )}
                  </TableCell>
                  <TableCell>{file.CreatedAt}</TableCell>
                  <TableCell>{file.UpdatedAt}</TableCell>
                  <TableCell>{file.Size}</TableCell>
                  <TableCell>
                    {/* Only display actions for files */}
                    {!isDirectory && (
                      <>
                        <Button
                          onClick={() => handleDownload(file.Filename)}
                          style={{ marginRight: "8px" }}
                        >
                          Download
                        </Button>
                        <Button onClick={() => handleDelete(file.Filename)}>Delete</Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
