import { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";

import FileUpload from "../components/FileUpload";

const Home: FC<any> = (): ReactElement => {
  const fileHandler = (files: FileList) => {
    console.log(files);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Typography variant="body1" style={{ width: "450px" }} sx={{ mb: 2 }}>
          Drag-and-drop a file into the box below to convert it to another
          filetype. Supported filetypes include XML, CSV, and JSON.
        </Typography>
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
      </div>
    </Box>
  );
};

export default Home;
