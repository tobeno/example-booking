import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { Button } from "@material-ui/core";

const WrappedLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps<any>, ref: React.Ref<any>) => (
    <Link innerRef={ref} {...props} />
  ),
);

const ButtonLink: React.FC<any> = props => (
  <Button component={WrappedLink} {...props} />
);

export default ButtonLink;
