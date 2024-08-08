"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { MAX_FREE_COUNTS } from '@/constant';
import { Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react'

interface FreeCounterProps {
  apiLimitCount: number;
}

const FreeCounter = ({
  apiLimitCount = 0
}: FreeCounterProps) => {

  const [mounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!mounted) {
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
          <Button className='w-full' variant="premium">
            Upgrade
            <Zap className='h-4 w-4 ml-2 fill-white' />
          </Button>
        </CardContent>

      </Card>
    </div>
  )
}

export default FreeCounter
