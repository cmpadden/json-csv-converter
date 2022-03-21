import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FileUpload from "../components/FileUpload";
import React, { ReactElement, FC, useEffect } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Typography } from "@mui/material";

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

const Home: FC<any> = (): ReactElement => {
  const [file, setFile] = React.useState<File | null>(null);

  const fileHandler = (files: FileList) => {
    const file = files.item(0);
    setFile(file);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <div>
        <Typography variant="body1" style={{ width: "450px" }} sx={{ mb: 2 }}>
          Drag-and-drop a file into the box below to convert it to another
          filetype. Supported filetypes include XML, CSV, and JSON.
        </Typography>
        <Box
          sx={{
            mb: 2,
          }}
        >
          <FileUpload
            fileHandler={fileHandler}
            fileLimit={1}
            allowedExtensions={["xml"]}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <UploadFileIcon sx={{ fontSize: 45, mr: 1 }} />
              <Typography variant="h5">Drag a File Here...</Typography>
            </Box>
          </FileUpload>
        </Box>
        {file && <FileInfo file={file} />}
      </div>
    </Box>
  );
};

export default Home;
