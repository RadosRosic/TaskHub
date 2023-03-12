import { Stack } from "@mui/material";

const HorizontalStack = ({ children }) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="flex-end"
    spacing={1}
  >
    {children}
  </Stack>
);

export default HorizontalStack;
