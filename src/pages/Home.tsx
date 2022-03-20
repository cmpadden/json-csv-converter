import { ReactElement, FC } from "react";
import { Box } from "@mui/material";
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
      <FileUpload
        fileHandler={fileHandler}
        fileLimit={1}
        allowedExtensions={["xml"]}
      >
        Drag a File In Here...
      </FileUpload>
    </Box>
  );
};

export default Home;
