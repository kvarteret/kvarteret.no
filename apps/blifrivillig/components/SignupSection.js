import React from "react";
import { Typography } from "@mui/material";
import ExternalContent from "./ExternalContent";
import TranslatedField from "./TranslatedField";

const SignupSection = ({ snippet }) => {
  return (
    <div id="signup">
      <Typography variant="h1" component="h1" color="primary" align="center">
        <TranslatedField tKey="blifrivillig-signup-here" />
      </Typography>
      <ExternalContent data={snippet} />
    </div>
  );
};

export default SignupSection;
