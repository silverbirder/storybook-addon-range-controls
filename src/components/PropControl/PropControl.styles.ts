import { Badge } from "storybook/internal/components";
import { styled, color, background, typography } from "storybook/theming";

export const StyledDetails = styled.details`
  border: 1px solid ${color.border};
  border-radius: ${({ theme }) => theme.input.borderRadius}px;
  margin-bottom: ${({ theme }) => theme.layoutMargin}px;
  background: ${background.content};
`;

export const StyledSummary = styled.summary`
  padding: ${({ theme }) => theme.layoutMargin}px;
  cursor: pointer;
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.s2}px;
  border-radius: ${({ theme }) => theme.input.borderRadius}px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${color.defaultText};
  background: ${background.content};

  &:hover {
    background: ${background.hoverable};
  }

  &::marker {
    display: none;
  }

  &::-webkit-details-marker {
    display: none;
  }

  &::before {
    content: "▶";
    margin-right: ${({ theme }) => theme.layoutMargin}px;
    transition: transform 0.2s;
    color: ${color.mediumdark};
  }

  details[open] > &::before {
    transform: rotate(90deg);
  }
`;

export const DetailsContent = styled.div`
  padding: ${({ theme }) => theme.layoutMargin}px;
  background: ${background.content};
  border-top: 1px solid ${color.border};
  color: ${color.defaultText};
  font-size: ${typography.size.s2}px;
`;

export const SummaryContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
`;

export const SummaryTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const TypeLabel = styled.span`
  font-size: ${typography.size.s1}px;
  color: ${color.mediumdark};
  margin-left: ${({ theme }) => theme.layoutMargin / 2}px;
`;

export const SummaryBadge = styled(Badge)`
  margin-left: auto;
`;
