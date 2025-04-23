"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Close } from "../icons";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { IDisplayOption } from "@/types";

interface SelectorProps {
  placeholder: string;
  options: IDisplayOption[];
  onChange: Dispatch<
    SetStateAction<
      {
        value: string;
        label: string;
      }[]
    >
  >;
}
export const Selector: React.FC<SelectorProps> = ({
  options,
  placeholder,
  onChange,
}) => {
  const optionsToDisplay: IDisplayOption[] = [
    { value: "All", label: "All" },
    ...options,
  ];

  const [selectedOptions, setSelectedOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [open, setOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (option === "All") {
      setSelectedOptions((prev) => {
        if (prev.length === optionsToDisplay.length) {
          return [];
        }
        return optionsToDisplay;
      });
      onChange((prev) => {
        if (prev.length === optionsToDisplay.length) {
          return [];
        }
        return optionsToDisplay;
      });
      return;
    }

    setSelectedOptions((prev) =>
      prev.some((op) => op.value === option)
        ? prev.filter((item) => item.value !== option)
        : [...prev, options.find((opt) => opt.value === option)!]
    );

    onChange((prev) => {
      const selectedOption = options.find((opt) => opt.value === option);
      if (selectedOption) {
        return prev.some((op) => op.value === option)
          ? prev.filter((item) => item.value !== option)
          : [...prev, options.find((opt) => opt.value === option)!];
      }
      return prev;
    });
  };

  return (
    <div>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="gradient" className="rounded-[42px]">
              {placeholder}
            </Button>
          </DrawerTrigger>
          <DrawerContent className="inset-0 !mt-0">
            <DrawerTitle>
              <div className="flex items-center justify-between mx-6">
                <h2 className="text-2xl font-bold ">{placeholder}</h2>
                <DrawerClose>
                  <Close />
                </DrawerClose>
              </div>
            </DrawerTitle>
            <div className="px-12 py-[46px]">
              {optionsToDisplay.map((option) => (
                <label key={option.value} className="block mb-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.some(
                      (selected) => selected.value === option.value
                    )}
                    onChange={() => toggleOption(option.value)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden md:block">
        <DropdownMenu open={open} onOpenChange={setOpen} defaultOpen={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="gradient" className="rounded-[42px] !min-w-34">
              {selectedOptions.length > 0
                ? `${selectedOptions.length} selecionado(s)`
                : placeholder}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-34 fade-in text-white rounded-sm my-1 px-2 py-1 overflow-y-auto transition-all duration-200 bg-gradient-to-r from-[#0056A6] to-[#0587FF]">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {optionsToDisplay.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={selectedOptions.some(
                  (selected) => selected.value === option.value
                )}
                onSelect={(evt) => evt.preventDefault()}
              >
                <label key={option.value} className="block mb-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.some(
                      (selected) => selected.value === option.value
                    )}
                    onChange={() => toggleOption(option.value)}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
