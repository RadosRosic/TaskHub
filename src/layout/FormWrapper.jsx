import { Paper, Box } from "@mui/material";

const FormWrapper = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Paper
        sx={{
          maxWidth: "550px",
          px: 4,
          py: 2,
        }}
        elevation={5}
      >
        {props.children}
      </Paper>
    </Box>
  );
};

export default FormWrapper;
