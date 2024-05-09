export interface Stat extends Document{
    readonly users: Number,
    readonly articles: Number,
    readonly categories: Number,
    readonly createdAt: String,
}