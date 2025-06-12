"use client";

import { useCallback, useEffect, useState } from "react";
import { DashboardCommand } from "@/modules/dashboard/ui/components/dashboard-command";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export const DashboardNavbar = () => {
  const { toggleSidebar, isMobile, state } = useSidebar();
  const [open, setOpen] = useState(false);

  const toggleCommand = useCallback(
    () => setOpen((prevState) => !prevState),
    []
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleCommand();
      }
    };

    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [toggleCommand]);

  return (
    <>
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
        <Button
          className="size-9 hover:cursor-pointer"
          variant="outline"
          onClick={toggleSidebar}
        >
          {state === "collapsed" && isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleCommand}
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground hover:cursor-pointer"
        >
          <SearchIcon className="size-4" />
          <kbd className="ml-auto pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </nav>
      <DashboardCommand open={open} setOpen={toggleCommand} />
    </>
  );
};
