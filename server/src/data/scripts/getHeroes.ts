const puppeteer = require("puppeteer");
import { writeFile } from "fs";
import { resolve } from "path";
import Hero from "../../models/hero";

async function getHeroes() {
	const START_URL = "https://www.marvel.com/characters";
	const heroes: Hero[] = [];

	const browser = await puppeteer.launch({
		headless: true,
	});
	const page = await browser.newPage();
	await page.setUserAgent(
		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
	);

	console.log("Getting heroes from website", START_URL);
	await page.goto(START_URL);
	await page.waitForSelector("body");

	// Get URLs for heros from Marvel

	let heroUrls = await page.$$eval(
		"#filter_grid-7 > .full-content > .content-grid > .grid-base > .mvl-card",
		(links) => {
			links = links.map((el) => el.querySelector("a").href);
			return links.splice(5, 12);
		}
	);

	// Map through heroUrls to add data to heros[]

	for (let i = 0; i < heroUrls.length; i++) {
		const urlAddress = heroUrls[i];
		await page.goto(urlAddress);
		await page.waitForSelector("body");
		const name: string = await page.$eval(
			".masthead__headline",
			(el) => el.innerText
		);
		const photo: string = await page.$eval(
			".masthead__background__wrapper > figure > .built__background",
			(el) => getComputedStyle(el).backgroundImage
		);
		const bio: string = await page.$eval(
			".content-block__body > .text",
			(el) => el.innerHTML
		);
		heroes.push({
			id: i.toString(),
			name: name,
			photo: photo.match(/url\("(.*)"/)[1],
			bio: bio,
		});
	}

	await browser.close();

	// Write File

	writeFile(
		resolve(__dirname, "../heroes.json"),
		JSON.stringify(heroes, null, 2),
		(err) => {
			if (err) {
				throw err;
			}
			console.log("Finished writing file");
		}
	);
}

getHeroes();
