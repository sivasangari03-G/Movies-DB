const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

//Connect:
const connect = () => {
	return mongoose.connect(
		"mongodb+srv://sivasangari:sivasangari@cluster0.ow1vy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
	);
};

//Schema:
const movieSchema = new mongoose.Schema(
	{
		id: { type: Number, require: true },
		movie_name: { type: String, require: true },
		movie_genre: { type: String, require: true },
		production_year: { type: Number, require: true },
		budget: { type: Number, require: true },
	},
	{
		versionKey: false, 
		timestamps: true,
	}
);

//Model:
let Movie;
try {
    Movie = mongoose.model("movies", movieSchema); //("movie" is collection name)
} catch (err) {
	console.log(err.message);
}

//Movie CRUD:

//Get All Movies:
app.get("/movies", async(req, res) => {
    try {
        const getMovies = await Movie.find();
        return res.status(200).send(getMovies);
    } catch (err) {
        return res.send(500).send(err.message)
    }
})

//Get Movie:
app.get("/movies/:id", async (req, res) => {
    try {
		const getMovie = await Movie.findById(req.params.id);
		return res.status(200).send(getMovie);
	} catch (err) {
		return res.send(500).send(err.message);
	}
})

//Create Movie:
app.post("/movies", async (req, res) => {
    try {
        const createMovie = await Movie.create(req.body);
        return res.status(200).send(createMovie);
    } catch (err) {
        return res.send(500).send(err.message)
    }
})

// Update Movie:
app.patch("/movies/:id", async (req, res) => {
    try {
        const updateMovie = await Movie.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).send(updateMovie);
    } catch (err) {
        return res.send(500).send(err.message);
        
    }
})

//Delete Movie:
app.delete("/movies/:id", async (req, res) => {
    try {
        const deleteMovie = await Movie.findByIdAndDelete(req.params.id);
        return res.status(200).send(deleteMovie);
    } catch (err) {
        return res.send(500).send(err.message);
    }
})

app.listen(8000, async () => {
	try {
		await connect();
		console.log(`App is Listening on Port 8000`);
	} catch (err) {
		console.log(err.message);
	}
});
