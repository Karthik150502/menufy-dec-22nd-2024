import { Server } from 'lucide-react';

import { UserInfo } from '@/components/user-info';
import { currentUser } from '@/auth/getUserData';

export default async function ServerPage() {
  const user = await currentUser();

  return <UserInfo icon={Server} label='Server component' user={user} />;
}
