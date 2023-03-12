import { Box, Paper, Stack } from "@mui/material";

const VerticalStack = ({ children }) => {
  return (
    <Box p={2}>
      <Paper sx={{ p: 2, maxWidth: 310, m: "auto" }}>
        <Stack spacing={2}>{children}</Stack>
      </Paper>
    </Box>
  );
};

export default VerticalStack;
