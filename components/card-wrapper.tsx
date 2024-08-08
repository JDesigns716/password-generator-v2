"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import FormHeader from "@/components/form-header";
import ResetButton from "@/components/reset-button";

interface CardWrapperProps {
  title: string;
  policy: string;
  resetButtonLabel: string;
  resetForm: () => void;
  children: React.ReactNode;
}

const CardWrapper = ({
  title,
  resetButtonLabel,
  resetForm,
  children,
}: CardWrapperProps) => {
  return (
    <Card className="xl:w-1/4 md:w-1/2 shadow-md">
      <CardHeader>
        <FormHeader title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <ResetButton label={resetButtonLabel} onClick={resetForm} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
