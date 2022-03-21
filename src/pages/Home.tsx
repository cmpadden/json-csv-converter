import FileUpload from "../components/FileUpload";
import FileInfo from "../components/FileInfo";
import React, { ReactElement, FC } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";

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
        {!file && (
          <>
            <Typography
              variant="body1"
              style={{ width: "450px" }}
              sx={{ mb: 2 }}
            >
              Convert a CSV to JSON, or JSON to a CSV, by dragging-and-dropping
              it into the box below!
            </Typography>
            <Box
              sx={{
                mb: 2,
              }}
            >
              <FileUpload
                fileHandler={fileHandler}
                fileLimit={1}
                allowedExtensions={["csv", "json"]}
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
          </>
        )}
        {file && (
          <>
            <Button size="small" onClick={() => setFile(null)}>
              Back
            </Button>
            <FileInfo file={file} />
          </>
        )}
      </div>
    </Box>
  );
};

export default Home;
