export interface QueryState {
	clubCategories?: Array<String>
	sportsCate?: Array<String>
	artCate?: Array<String>
	stemCate?: Array<String>
	moreCate?: Array<String>
	text?: string // key word text search in mongoDB database
	city?: string
	state?: string
	country?: string
	zipcode?: string
}
