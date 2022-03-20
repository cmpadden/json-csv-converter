import React, { FC, ReactElement } from "react";
import "./FileUpload.css";

interface FileUploadProps {
  fileHandler(files: FileList): void;
  fileLimit?: number;
  allowedExtensions?: Array<string>;
}

/**
 * Handle file upload via dragging file(s) into the defined area
 *
 * Heavily influenced by the awesome tutorial at https://betterprogramming.pub/how-to-implement-files-drag-and-drop-in-react-22cf42b7a7ef
 *
 */
const FileUpload: FC<FileUploadProps> = ({
  children,
  fileHandler,
  fileLimit,
  allowedExtensions,
}): ReactElement => {
  const [hovering, setHovering] = React.useState(false);

  const handleDragover = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!hovering) {
      setHovering(true);
    }
  };

  // const handleDragEnter = (event: DragEvent) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   setHovering(true);
  // };

  const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setHovering(false);
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setHovering(false);

    if (event.dataTransfer) {
      const { files } = event.dataTransfer;

      if (fileLimit && files.length > fileLimit) {
        throw Error(
          `Provided ${files.length} files, when the maximum number of allowed files is ${fileLimit}`
        );
      }

      if (allowedExtensions) {
        const extPattern = new RegExp(
          `.(${allowedExtensions.join("|")})$`,
          "i"
        );
        for (let i = 0; i < files.length; i++) {
          const file = files.item(i);
          if (file && !extPattern.exec(file.name)) {
            throw Error(
              `File, ${file.name}, has an unsupported file extension`
            );
          }
        }
      }

      if (files && files.length) {
        fileHandler(files);
      }
    }
  };

  const fileUploadRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    fileUploadRef?.current?.addEventListener("dragover", handleDragover);
    // fileUploadRef?.current?.addEventListener("dragenter", handleDragEnter);
    fileUploadRef?.current?.addEventListener("dragleave", handleDragLeave);
    fileUploadRef?.current?.addEventListener("drop", handleDrop);
  }, []);

  return (
    <div
      ref={fileUploadRef}
      className={hovering ? "file-area file-hovering" : "file-area"}
    >
      {children}
    </div>
  );
};

export default FileUpload;
