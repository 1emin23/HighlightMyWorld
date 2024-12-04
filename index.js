import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

const app = express();

// Configure dotenv to load variables
dotenv.config();
const port = process.env.PORT || 3000;

const db = new pg.Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  database: "world",
  port: 5432,
});

db.connect()
  .then(() => {
    console.log("basarılı bir sekilde veritabanina baglandı");
  })
  .catch(() => {
    console.log("bir sorun olustu !!");
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function visitedCountries() {
  const result = await db.query("select country_code from visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

//* Home page
app.get("/", async (req, res) => {
  const countries = await visitedCountries();
  console.log("backend countries: ", countries);
  res.render("index.ejs", { total: countries.length, countries: countries });
});

//* Insert new Country
app.post("/add", async (req, res) => {
  let { country } = req.body;
  try {
    const result = await db.query(
      "select country_code from countries where LOWER(country_name) like '%' || $1 || '%'",
      [country.toLowerCase()]
    );
    console.log("result from db: ", result.rows);
    const data = result.rows[0];
    const country_code = data.country_code;
    try {
      await db.query(
        "insert into visited_countries (country_code) values($1)",
        [country_code]
      );
      res.redirect("/");
    } catch (error) {
      const countries = await visitedCountries();
      res.render("index.ejs", {
        total: countries.length,
        countries: countries,
        error: "country has been already added, try again.",
      });
    }
  } catch (error) {
    const countries = await visitedCountries();
    res.render("index.ejs", {
      total: countries.length,
      countries: countries,
      error: "country name does not exist, try again.",
    });
  }
});

app.delete("/delete", async (req, res) => {
  await db.query("DELETE FROM visited_countries");
  res.json({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
