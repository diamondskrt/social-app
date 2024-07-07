import { Suspense, lazy } from 'react';

import { Loader2, type LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = lazy(dynamicIconImports[name]);

  const fallback = <Loader2 className="animate-spin" {...props} />;

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
}
