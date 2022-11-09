import { UserInfo, UserMetadata } from '@firebase/auth-types'
import type { ClubSimInfo } from 'src/types/clubinfo'

export interface User {
	id: string
	uid: string // uid from kidsfuncloud server.
	displayName: string
	avatar: string
	email: string
	name: string
	[key: string]: any
	emailVerified: boolean // added
	photoURL: string
	providerId: string
	providerData: UserInfo[]
	refreshToken: string
	metaData: UserMetadata
	managedClubs?: ClubSimInfo[]
	favoriteClubs?: []
	groups?: []
	mykidsClubs?: []
	recommendations?: []
	role?: typeof Roletypes[keyof typeof Roletypes]
}
export const Roletypes = {
	Owner: 'Owner',
	Staff: 'Staff',
	Parent: 'Parent',
	Unknown: 'Unknown',
} as const
