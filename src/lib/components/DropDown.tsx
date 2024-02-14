import * as React from "react";

// import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  //   DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

//@ts-ignore

export function DropdownMenuRadioGroupDemo({ name, links }: DropProps) {
  //@ts-ignore
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="my-2 inline-flex capitalize font-semibold hover:text-primary  items-end md:mx-4 md:my-0 cursor-pointer ">
          {name}
          <ChevronDown size={20} />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {links &&
            //@ts-ignore
            links.map((item, index) => (
              //@ts-ignore
              <div className="px-4 py-2" key={index} value="bottom">
                {item.link}
              </div>
            ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
