import React from 'react'
import { LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { Settings } from 'lucide-react'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Heading from '@/components/layouts/Heading/Heading'
import { checkSubscription } from '@/lib/subscription';
import { SubscriptionButton } from '@/components/ui/subscription-button';
import { Button } from '@/components/ui/button';

const SettingsPage = async () => {

    const isPro = await checkSubscription();

    return (
        <div className='my-10'>
            <Heading
                title='Settings'
                description='Manage account settings'
                icon={Settings}
                iconColor='text-gray-700'
                bgColor='text-gray-700/10'
            />
            <div className='px-4 lg:px-8 space-y-4'>
                <div className='text-muted-foreground text-sm'>
                    {isPro ? 'You are currently on a Pro Plan' : 'You are currently on a Free Plan'}
                </div>

                <SubscriptionButton isPro={isPro} />
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <SignOutButton>
                                    <Button
                                        variant={"default"}
                                    >
                                        <div className='flex items-center gap-2'>
                                            Logout
                                            <LogOut className="h-4 w-4" />
                                        </div>
                                    </Button>
                                </SignOutButton>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Logout</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
