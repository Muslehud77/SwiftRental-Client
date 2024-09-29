import { Moon, Palette, Sun } from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "../ThemeProvider";


export function ThemeChanger() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full p-0 bg-foreground dark:bg-muted-foreground hover:bg-muted text-background hover:text-muted-foreground border-0 outline-none"
        >
          <Palette className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger> 
      <DropdownMenuContent align="end" >
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
