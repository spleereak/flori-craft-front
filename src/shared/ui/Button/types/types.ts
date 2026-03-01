export type ButtonAppearance = "primary" | "secondary" | "accent";

export interface ButtonProps {
  className?: string;
  appearance?: ButtonAppearance;
  disabled?: boolean;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}
