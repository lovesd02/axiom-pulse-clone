import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';

type Props = ComponentPropsWithoutRef<'div'> & {
  rounded?: 'sm' | 'md' | 'lg' | 'full';
};

export default function Skeleton({ rounded = 'md', className, ...rest }: Props) {
  return (
    <div
      className={clsx(
        'bg-slate-800/60 skeleton',
        rounded === 'sm' && 'rounded',
        rounded === 'md' && 'rounded-md',
        rounded === 'lg' && 'rounded-lg',
        rounded === 'full' && 'rounded-full',
        className
      )}
      {...rest}
    />
  );
}
