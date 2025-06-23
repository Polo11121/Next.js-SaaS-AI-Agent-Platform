import { ReactNode, useState } from "react";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = { id: string; value: string; children: ReactNode };

type CommandSelectProps = {
  options: Option[];
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  isSearchable?: boolean;
  className?: string;
  placeholder?: string;
};

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  className,
  placeholder = "Select an option",
}: CommandSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.id === value);

  const handleSelect = (value: string) => {
    console.log("value", value);
    onSelect(value);
    setIsOpen(false);
  };

  const handleOpen = () => setIsOpen(true);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
        onClick={handleOpen}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon />
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Select an option"
        description="Select an option from the list"
      >
        <CommandInput placeholder="Search.." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty className="text-muted-foreground text-sm">
            No results found
          </CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                className="hover:cursor-pointer"
                key={option.id}
                value={option.id}
                onSelect={handleSelect}
              >
                {option.children}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
