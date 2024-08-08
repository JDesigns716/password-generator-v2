"use client";

import CardWrapper from "@/components/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "@/schema/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  lowercaseLetters,
  numbers,
  specialCharacters,
  uppercaseLetters,
} from "@/config/data";
import { toast } from "sonner";
import ContentHeader from "@/components/content-header";
import { useFormStatus } from "react-dom";

interface FormData {
  passwordLength: number;
  lowercaseLetters: boolean;
  uppercaseLetters: boolean;
  numbers: boolean;
  symbols: boolean;
}

const fieldLabels = {
  passwordLength: "Password Length",
  lowercaseLetters: "Lowercase Letters",
  uppercaseLetters: "Uppercase Letters",
  numbers: "Numbers",
};
type Field = keyof typeof fieldLabels;

const PasswordForm = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passwordLength: 25,
      lowercaseLetters: true,
      uppercaseLetters: true,
      numbers: true,
      symbols: false,
    },
  });

  const showToastError = (message: string) => {
    toast.error(message, {
      position: "top-center",
    });
  };

  const handleFieldChange = (
    field: Field,
    value: any,
    fieldOnChange: Function
  ) => {
    if (field === "passwordLength") {
      if (value < 10) {
        showToastError("Password must be at least 10 characters.");
        setInvalidFields((prev) => [...prev, field]);
      } else if (value > 25) {
        showToastError("Password must be a maximum of 25 characters.");
        setInvalidFields((prev) => [...prev, field]);
      } else {
        setInvalidFields((prev) => prev.filter((f) => f !== field));
      }
    } else {
      if (value) {
        setInvalidFields((prev) => prev.filter((f) => f !== field));
      } else {
        setInvalidFields((prev) => [...prev, field]);
        if (field in fieldLabels) {
          showToastError(`Please select ${fieldLabels[field]} option.`);
        } else {
          showToastError("Please select a valid option.");
        }
      }
    }
    fieldOnChange(value);
  };

  const onSubmit = async (data: FormData) => {
    const missingFields = [];
    if (!data.lowercaseLetters) missingFields.push("lowercaseLetters");
    if (!data.uppercaseLetters) missingFields.push("uppercaseLetters");
    if (!data.numbers) missingFields.push("numbers");

    if (missingFields.length > 0) {
      setInvalidFields(missingFields);
      return;
    }

    setInvalidFields([]);
    try {
      setLoading(true);
      await generatePassword(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const generatePassword = async (data: FormData) => {
    let generatedPassword = "";

    if (data.lowercaseLetters) {
      generatedPassword += lowercaseLetters;
    }

    if (data.uppercaseLetters) {
      generatedPassword += uppercaseLetters;
    }

    if (data.numbers) {
      generatedPassword += numbers;
    }
    if (data.symbols) {
      generatedPassword += specialCharacters;
    }

    setPassword(createPassword(generatedPassword, data.passwordLength));
    setLoading(false);
  };

  const createPassword = (generatedPassword: string, length: number) => {
    let password = "";
    const generatedPasswordLength = generatedPassword.length;

    for (let i = 0; i < length; i++) {
      const passwordIndex = Math.floor(Math.random() * generatedPasswordLength);
      password += generatedPassword[passwordIndex];
    }

    return password;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    // Available positions:
    // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
    toast.success("Password copied to system clipboard", {
      position: "top-center",
    });
  };

  const resetForm = () => {
    form.reset();
    setPassword("");
  };

  const { pending } = useFormStatus();

  return (
    <CardWrapper
      policy="Select all required password options."
      title="Password Generator"
      resetButtonLabel="Reset"
      resetForm={resetForm}
    >
      <div className="bg-primary w-full h-10 flex items-center justify-between px-2 rounded shadow-md mb-6">
        <h3 className="text-primary-foreground text-left tracking-wider">
          {password}
        </h3>
        {password && (
          <button
            className="bg-green-500 p-1 rounded text-white"
            onClick={handleCopy}
          >
            Copy
          </button>
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="passwordLength"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel
                    htmlFor="passwordLength"
                    className={
                      invalidFields.includes("passwordLength")
                        ? "text-red-500"
                        : ""
                    }
                  >
                    Password Length
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="text-left rounded-sm shadow-md w-[60px] max-w-xs"
                      value={field.value}
                      onChange={(e) =>
                        handleFieldChange(
                          "passwordLength",
                          parseInt(e.target.value, 10),
                          field.onChange
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ContentHeader policy="All fields marked by an * are required" />
            <FormField
              control={form.control}
              name="lowercaseLetters"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel
                    htmlFor="lowercase"
                    className={
                      invalidFields.includes("lowercaseLetters")
                        ? "text-red-500"
                        : ""
                    }
                  >
                    <span className="font-extrabold">*</span> Lowercase Letters
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      id="lowercase"
                      checked={field.value}
                      onCheckedChange={(value) =>
                        handleFieldChange(
                          "lowercaseLetters",
                          value,
                          field.onChange
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="uppercaseLetters"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel
                    htmlFor="uppercase"
                    className={
                      invalidFields.includes("uppercaseLetters")
                        ? "text-red-500"
                        : ""
                    }
                  >
                    <span className="font-extrabold">*</span> Uppercase Letters
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      id="uppercase"
                      checked={field.value}
                      onCheckedChange={(value) =>
                        handleFieldChange(
                          "uppercaseLetters",
                          value,
                          field.onChange
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numbers"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel
                    htmlFor="number"
                    className={
                      invalidFields.includes("numbers") ? "text-red-500" : ""
                    }
                  >
                    <span className="font-extrabold">*</span> Numbers
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      id="number"
                      checked={field.value}
                      onCheckedChange={(value) =>
                        handleFieldChange("numbers", value, field.onChange)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="symbols"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel htmlFor="symbols">Symbols</FormLabel>
                  <FormControl>
                    <Checkbox
                      id="symbols"
                      checked={field.value}
                      onCheckedChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            {loading ? "Generating..." : "Generate Strong Password"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
export default PasswordForm;
