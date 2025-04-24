"use client";

import { useMemo, useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ChevronDown2, Close } from "../icons";
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
  onChange: (value: string) => void;
}

const OptionList = ({
  options,
  selected,
  toggleOption,
}: {
  options: IDisplayOption[];
  selected: IDisplayOption[];
  toggleOption: (value: string) => void;
}) => (
  <>
    {options.map((option) => (
      <label key={option.value} className="block mb-2">
        <input
          type="checkbox"
          checked={selected.some((s) => s.value === option.value)}
          onChange={() => toggleOption(option.value)}
          className="mr-2"
        />
        {option.label}
      </label>
    ))}
  </>
);

export const Selector: React.FC<SelectorProps> = ({
  options,
  placeholder,
  onChange,
}) => {
  const optionsToDisplay = useMemo(
    () => [{ value: "All", label: "All" }, ...options],
    [options]
  );

  const [selectedOptions, setSelectedOptions] = useState<IDisplayOption[]>([]);
  const [open, setOpen] = useState(false);

  const toggleOption = (value: string) => {
    if (value === "All") {
      const allSelected = selectedOptions.length === options.length;
      const newSelection = allSelected ? [] : options;
      setSelectedOptions(newSelection);
      onChange("");
      return;
    }

    const isSelected = selectedOptions.some((opt) => opt.value === value);
    const newValue = isSelected
      ? selectedOptions.filter((opt) => opt.value !== value)
      : [...selectedOptions, options.find((opt) => opt.value === value)!];

    setSelectedOptions(newValue);
    onChange(newValue.map((opt) => opt.value).join(","));
  };

  const selectedLabel =
    selectedOptions.length > 0
      ? `${selectedOptions.length} selecionado(s)`
      : placeholder;

  return (
    <div>
      {/* Mobile (Drawer) */}
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="gradient" className="rounded-[42px]">
              <ChevronDown2 /> <span className="truncate">{selectedLabel}</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="inset-0 !mt-0">
            <DrawerTitle>
              <div className="flex items-center justify-between mx-6">
                <h2 className="text-2xl font-bold">{placeholder}</h2>
                <DrawerClose>
                  <Close />
                </DrawerClose>
              </div>
            </DrawerTitle>
            <div className="px-12 py-[46px]">
              <OptionList
                options={optionsToDisplay}
                selected={selectedOptions}
                toggleOption={toggleOption}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop (Dropdown) */}
      <div className="hidden md:block">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="gradient" className="rounded-[42px] max-w-34">
              <ChevronDown2 />
              <span className="truncate">{selectedLabel}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-34 z-50 fade-in text-white rounded-sm my-1 px-2 py-1 overflow-y-auto transition-all duration-200 bg-gradient-to-r from-[#0056A6] to-[#0587FF]">
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
                <label className="block mb-2">
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
