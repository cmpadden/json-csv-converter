import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, { ReactElement, FC, useEffect } from "react";
import { Typography } from "@mui/material";

interface FileInfoProps {
  file: File;
}

const FileInfo: FC<FileInfoProps> = ({ file }): ReactElement => {
  const [fileContent, setFileContent] = React.useState<
    string | ArrayBuffer | null
  >("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        setFileContent(reader.result);
      };
    }
  });

  return (
    <Card sx={{ width: 450 }}>
      <CardContent>
        <Typography sx={{ mb: 2 }} variant="h5" component="div">
          {file.name} ({file.type})
        </Typography>
        <Typography color="text.secondary">
          Last Modified {new Date(file.lastModified).toLocaleString()}
        </Typography>
        <Typography color="text.secondary">{file.size} bytes</Typography>
        <Typography
          color="text.primary"
          sx={{
            border: "1px lightgrey solid",
            p: 2,
            mt: 2,
            height: "250px",
            overflowY: "scroll",
          }}
        >
          {fileContent}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FileInfo;
