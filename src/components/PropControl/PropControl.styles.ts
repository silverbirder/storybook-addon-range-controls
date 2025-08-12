import { styled } from "storybook/theming";

export const StyledDetails = styled.details`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
`;

export const StyledSummary = styled.summary`
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 500;
  border-radius: 4px;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &::marker {
    display: none;
  }

  &::-webkit-details-marker {
    display: none;
  }

  &::before {
    content: "▶";
    margin-right: 8px;
    transition: transform 0.2s;
  }

  details[open] &::before {
    transform: rotate(90deg);
  }
`;

export const DetailsContent = styled.div`
  padding: 12px;
`;
