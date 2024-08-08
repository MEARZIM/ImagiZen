"use client"

import React, { useEffect, useState } from 'react'
import { Zap } from 'lucide-react';

import { MAX_FREE_COUNTS } from '@/constant';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useProModal } from '@/hooks/use-pro-modal';
import { Card, CardContent } from '@/components/ui/card';

interface FreeCounterProps {
  apiLimitCount: number;
  isPro: boolean;
}

const FreeCounter = ({
  apiLimitCount = 0,
  isPro = false
}: FreeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return null;
  }

  return (
    <div className='px-3'>
      <Card className='bg-zinc-900 border-0'>
        <CardContent className='py-6'>
          <div className='text-center text-sm text-white mb-4 space-y-2'>
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress
              className='h-3'
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button className='w-full' variant="premium" onClick={() => {
              proModal.onOpen();
            }
          }>
            Upgrade
            <Zap className='h-4 w-4 ml-2 fill-white' />
          </Button>
        </CardContent>

      </Card>
    </div>
  )
}

export default FreeCounter
