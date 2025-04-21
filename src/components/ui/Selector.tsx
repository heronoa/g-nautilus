"use client";

import { SetStateAction, useState } from "react";
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

const options: {
  value: string;
  label: string;
}[] = [
  { value: "option1", label: "Opção 1" },
  { value: "option2", label: "Opção 2" },
  { value: "option3", label: "Opção 3" },
];

interface SelectorProps {
  placeholder?: string;
  options?: {
    value: string;
    label: string;
  }[];
  onChange?: SetStateAction<
    {
      value: string;
      label: string;
    }[]
  >;
}
export const Selector: React.FC<SelectorProps> = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <div>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="gradient" className="rounded-[42px]">
              Abrir Seleção
            </Button>
          </DrawerTrigger>
          <DrawerContent className="inset-0 !mt-0">
            <DrawerTitle>
              <div className="flex items-center justify-between mx-4">
                <h2 className="text-xl font-bold ">Selecione as opções</h2>
                <DrawerClose>
                  <Close />
                </DrawerClose>
              </div>
            </DrawerTitle>
            <div className="p-6  ">
              {options.map((option) => (
                <label key={option.value} className="block mb-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option.value)}
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
                : "Type"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-34 fade-in text-white rounded-sm mt-1 p-4 transition-all duration-200 bg-gradient-to-r from-[#0056A6] to-[#0587FF]">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {options.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={selectedOptions.includes(option.value)}
                onSelect={(evt) => evt.preventDefault()}
              >
                <label key={option.value} className="block mb-2">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option.value)}
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
