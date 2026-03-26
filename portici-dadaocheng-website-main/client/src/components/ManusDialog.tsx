import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

interface ManusDialogProps {
  title?: string;
  logo?: string;
  open?: boolean;
  onLogin: () => void;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}

export function ManusDialog({
  title,
  logo,
  open = false,
  onLogin,
  onOpenChange,
  onClose,
}: ManusDialogProps) {
  const [internalOpen, setInternalOpen] = useState(open);

  useEffect(() => {
    if (!onOpenChange) {
      setInternalOpen(open);
    }
  }, [open, onOpenChange]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(nextOpen);
    } else {
      setInternalOpen(nextOpen);
    }

    if (!nextOpen) {
      onClose?.();
    }
  };

  return (
    <Dialog
      open={onOpenChange ? open : internalOpen}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="w-[400px] gap-0 border-border bg-popover p-0 py-5 text-center text-popover-foreground shadow-lg sm:max-w-[400px]">
        <div className="flex flex-col items-center gap-2 p-5 pt-12">
          {logo ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-card">
              <img
                src={logo}
                alt="Dialog graphic"
                className="h-10 w-10 rounded-md"
              />
            </div>
          ) : null}

          {title ? (
            <DialogTitle className="text-xl font-semibold leading-[26px] tracking-[-0.44px] text-foreground">
              {title}
            </DialogTitle>
          ) : null}
          <DialogDescription className="text-sm leading-5 tracking-[-0.154px] text-muted-foreground">
            Please login with Manus to continue
          </DialogDescription>
        </div>

        <DialogFooter className="px-5 py-5">
          <Button
            onClick={onLogin}
            className="h-10 w-full rounded-md border border-brand-cta bg-brand-cta text-sm font-medium normal-case tracking-normal text-brand-cta-foreground leading-5 hover:opacity-90"
          >
            Login with Manus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
