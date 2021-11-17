import { UserApiProvider } from './UserApiProvider'
import { BoxOfficeApiProvider } from './BoxOfficeApiProvider'

export const apiProviderArray = [UserApiProvider, BoxOfficeApiProvider].reverse()
