import { styled, background } from "storybook/theming";

export const Container = styled.div`
  padding: ${({ theme }) => theme.layoutMargin}px;
  background: ${background.content};
`;
