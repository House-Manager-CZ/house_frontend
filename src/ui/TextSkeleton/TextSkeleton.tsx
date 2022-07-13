import React from "react";
import { Skeleton, SkeletonProps, styled } from "@mui/material";
// eslint-disable-next-line no-restricted-imports
import { Variant } from "@mui/material/styles/createTypography";

export type TTextSkeletonProps = SkeletonProps & {
  textVariant?: Variant;
};

export const TextSkeletonStyled = styled(Skeleton, {
  shouldForwardProp: (prop) => prop !== "textVariant",
})<TTextSkeletonProps>(({ theme, textVariant }) => {
  return {
    ...(textVariant && { ...theme.typography[textVariant] }),
  };
});

const TextSkeleton: React.FC<TTextSkeletonProps> = (
  props: TTextSkeletonProps
): React.ReactElement => {
  const { textVariant, ...restProps } = props;

  return <TextSkeletonStyled {...restProps} textVariant={textVariant} />;
};

TextSkeleton.defaultProps = {
  textVariant: "body1",
};

export default TextSkeleton;
