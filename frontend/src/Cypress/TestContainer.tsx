import { type FC } from "react";
import { Stack } from "@mui/material";

export const TestContainer: FC<WithChildren> = ({ children }) => <Stack
  display='flex'
  width='100vw'
  height='100vh'
>
  {children}
</Stack>