export interface ClubInfo {
	clubName: string
	registerRole: string
	clubCategories: Array<string>
	category?: Array<string> // sports
	category0?: Array<string> // music and art
	category1?: Array<string> // science and coding
	category2?: Array<string> // additonal categories from user
	streetAddress?: string
	city: string
	state: string
	postalCode: string
	country: string
	description: string
	clubContactName: string // main contact person name
	clubEmail: string
	clubEmailVerified?: boolean
	clubPhone?: string
	socialLink1?: string
	socialLink2?: string
	socialLink3?: string
	ageMin?: number
	ageMax?: number
	boy?: boolean
	girl?: boolean
	onlineClass?: boolean
	freetrialClass?: boolean
	beginnerClass?: boolean
	intermediateClass?: boolean
	advancedClass?: boolean
	privateClass?: boolean
	classSizeMin?: number // main contact person name
	classSizeMax?: number
	priceMin?: number
	priceMax?: number
	priceCurrency?: string
	priceUnit?: string // 'per month' 'per week' or 'per year'
	otherCost?: string
	photoUrls?: Array<string>
	photoThumbUrls?: Array<string>
	isVerified?: boolean
	updatedAt?: Date
	clubid?: string
	recommendations?: number
	active?: boolean
	views?: number
	createdAt?: Date
}

export interface ClublistApiResponse {
	clubdocs: Array<ClubInfo>
	totalDocCount: number
	pageNum: number
	pageSize?: number
}

export interface ClubSimInfo {
	clubid?: string
	clubName: string
	clubEmail: string
	clubEmailVerified?: boolean
	photoURL?: string
	photoUrls?: Array<string>
	photoThumbUrls?: Array<string>
	registerRole: string
	clubCategories: Array<string>
	category?: Array<string> // sports
	category0?: Array<string> // music and art
	category1?: Array<string> // science and coding
	category2?: Array<string> // additonal categories from user
	city: string
	state: string
	country: string
	postalCode: string
	priceCurrency?: string
	priceMin?: number
	priceMax?: number
	updatedAt?: Date
	createdAt?: Date
	active?: boolean
	//userrole: string
	recommendations?: number
	views?: number
}
