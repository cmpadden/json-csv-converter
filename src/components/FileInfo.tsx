import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Papa from "papaparse";
import React, { ReactElement, FC, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const downloadStringAsFile = (
  filename: string,
  content: string,
  contentType: "text/csv" | "application/json"
) => {
  const element = document.createElement("a");
  const file = new Blob([content], {
    type: contentType,
  });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

interface FileInfoProps {
  file: File;
}

const FileInfo: FC<FileInfoProps> = ({ file }): ReactElement => {
  const [parsedFile, setParsedFile] = React.useState<any>(null);

  useEffect(() => {
    const loadAndParseFile = async () => {
      if (file) {
        const data = await file.text();

        if (file.type === "text/csv") {
          Papa.parse(file, {
            header: true,
            complete: (results, _file) => {
              setParsedFile({
                filename: file.name.replace(".csv", ".json"),
                content: JSON.stringify(results.data, null, 2),
                contentType: "application/json",
                original: data,
              });
            },
          });
        } else if (file.type === "application/json") {
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onload = () => {
            if (reader.result) {
              if (typeof reader.result === "string") {
                const result = Papa.unparse(JSON.parse(data));
                setParsedFile({
                  filename: file.name.replace(".json", ".csv"),
                  content: result,
                  contentType: "text/csv",
                  original: data,
                });
              }
            }
          };
        }
      }
    };
    loadAndParseFile();
  });

  return (
    <Card sx={{ width: 450 }}>
      <CardContent sx={{ pb: 0 }}>
        <Typography sx={{ mb: 2 }} variant="h5" component="div">
          {file.name}
        </Typography>
        <Typography color="text.secondary">
          Last Modified {new Date(file.lastModified).toLocaleString()}
        </Typography>
        <Typography color="text.secondary">{file.size} bytes</Typography>
        <Divider sx={{ my: 2 }} />
        {parsedFile && (
          <>
            <Typography color="text.secondary">Original</Typography>
            <Box
              color="text.primary"
              sx={{
                border: "1px lightgrey solid",
                p: 2,
                mb: 2,
                height: "250px",
                overflowY: "scroll",
              }}
            >
              <pre style={{ marginTop: 0 }}>{parsedFile.original}</pre>
            </Box>
            <Typography color="text.secondary">Converted</Typography>
            <Box
              color="text.primary"
              sx={{
                border: "1px lightgrey solid",
                p: 2,
                height: "250px",
                overflowY: "scroll",
              }}
            >
              <pre style={{ marginTop: 0 }}>{parsedFile.content}</pre>
            </Box>
          </>
        )}
      </CardContent>
      {parsedFile && (
        <CardActions>
          <Button
            size="small"
            onClick={() =>
              downloadStringAsFile(
                parsedFile.filename,
                parsedFile.content,
                parsedFile.contentType
              )
            }
          >
            Download Converted File
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default FileInfo;
