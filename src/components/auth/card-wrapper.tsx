import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { Social } from '@/components/auth/social';
import { Brand } from '@/components/auth/brand';
import { AuthFooter } from '@/components/auth/auth-footer';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  footerLabel: string;
  footerHref: string;
  footerDesc: string;
  showSocial?: boolean;
}

export function CardWrapper({
  children,
  headerLabel,
  footerLabel,
  footerHref,
  footerDesc,
  showSocial
}: CardWrapperProps) {
  return (
    <Card className='w-full md:w-[450px] shadow-md'>
      <CardHeader>
        <Brand label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter className='justify-center'>
        <AuthFooter
          label={footerLabel}
          href={footerHref}
          description={footerDesc}
        />
      </CardFooter>
    </Card>
  );
}
