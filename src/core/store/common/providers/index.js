import { UserProvider } from './UserProvider'
import { AlertProvider } from './AlertProvider'
import { ConfirmProvider } from './ConfirmProvider'

export const commonProviderArray = [UserProvider, AlertProvider, ConfirmProvider].reverse()
