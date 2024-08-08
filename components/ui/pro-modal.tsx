import { Check, ImageIcon, Zap } from "lucide-react";

import { Modal } from "./modal"
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/use-pro-modal";
import { Button } from "./button";

export const ProModal = () => {
    const proModal = useProModal();
    const links = [
        {
            label: "Image Genetation",
            href: "/image",
            icon: (
                <ImageIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            bgColor: "bg-pink-700/10"
        },
    ];


    return (
        <>
            <Modal title={"Update to Pro"}
                description={"update to pro for better performance"}
                isOpen={proModal.isOpen}
                onClose={proModal.onClose}
                badge="Pro"
            >
                {
                    links.map((link) => (

                        <Card
                            key={link.label}
                            className="p-3 border-black/5 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-fit rounded-md", link.bgColor)}>
                                    {link.icon}
                                </div>
                                <div className="font-semibold text-sm">
                                    {link.label}
                                </div>
                            </div>
                            <Check className="text=primary w-5 h-5"/>
                        </Card>
                    ))
                }

                <div className="my-2 flex justify-end">
                    <Button 
                    className="bg-violet-600 hover:bg-violet-500 w-full"
                    size="lg"
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </div>
            </Modal>
        </>
    )
}