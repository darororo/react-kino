import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY!
const MOVIE_DB = {
	metrics: 'metrics',
}


const supabaseClient = createClient(
	SUPABASE_URL,
	SUPABASE_KEY,
)

export const updateSearchCount = async (query: string, movie: Movie) => {
	try {

		const result = await supabaseClient
			.from(MOVIE_DB.metrics)
			.select()
			.eq("searchTerm", query)

		console.log(result)

		if (result.data!.length > 0) {
			const existMovie = result.data![0]

			await supabaseClient.from(MOVIE_DB.metrics)
				.update({
					count: existMovie.count + 1
				})
				.eq('id', existMovie.id)

		} else {
			await supabaseClient
				.from(MOVIE_DB.metrics)
				.insert(
					{
						searchTerm: query,
						movie_id: movie.id,
						title: movie.title,
						count: 1,
						poster_uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
					}
				)
		}
	} catch (error) {
		console.log(error)
		throw (error)
	}

}