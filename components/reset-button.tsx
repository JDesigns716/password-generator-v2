import { Button } from "@/components/ui/button";

interface ResetButtonProps {
  label: string;
  onClick: () => void;
}

const ResetButton = ({ label, onClick }: ResetButtonProps) => {
  return (
    <Button
      variant="link"
      className="font-normal w-full"
      size="sm"
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default ResetButton;
