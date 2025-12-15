export type ButtonAppearance = "primary" | "outline" | "accent";

export interface ButtonProps {
  className?: string;
  appearance?: ButtonAppearance;
  disabled?: boolean;
  onClick?: () => void;
}
