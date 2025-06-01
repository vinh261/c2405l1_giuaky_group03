import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { buttonVariants } from "./ButtonVariants";
import type { ButtonProps } from "../../types/models.types";
import { cn } from "../../types/cn";


export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
