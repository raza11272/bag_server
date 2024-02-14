import * as React from "react";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

//@ts-ignore
export function DrawerDialogDemo({ clickComponent, img }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">{clickComponent}</div>
      </DialogTrigger>
      <DialogContent className="w-full">
        <img src={img} className="w-full" alt="img" />
      </DialogContent>
    </Dialog>
  );
}


