import { User } from '@/utils/types'

export type AuthContextValue = {
  authUser: User | null
  onLogout: () => void
}
