import { styled } from "storybook/theming";

export const Container = styled.div`
  padding: ${({ theme }) => theme.layoutMargin}px;
  background: ${({ theme }) => theme.background.content};
`;
