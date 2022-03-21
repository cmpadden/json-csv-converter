import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, { ReactElement, FC, useEffect } from "react";
import { Typography } from "@mui/material";
import Papa from "papaparse";

interface FileInfoProps {
  file: File;
}

const FileInfo: FC<FileInfoProps> = ({ file }): ReactElement => {
  const [parsedFileContent, setParsedFileContent] = React.useState<any>(null);

  useEffect(() => {
    if (file) {
      if (file.type === "text/csv") {
        Papa.parse(file, {
          header: true,
          complete: (results, _file) => {
            setParsedFileContent(JSON.stringify(results.data, null, 4));
          },
        });
      } else if (file.type === "application/json") {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          if (reader.result) {
            if (typeof reader.result === "string") {
              const result = Papa.unparse(JSON.parse(reader.result));
              setParsedFileContent(result);
            }
          }
        };
      }
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
          {parsedFileContent}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FileInfo;
