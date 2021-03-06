// Copied from https://github.com/githubocto/flat-demo-bitcoin-price

// Helper library written for useful postprocessing tasks with Flat Data
// Has helper functions for manipulating csv, txt, json, excel, zip, and image files
import { readJSON, writeJSON } from 'https://deno.land/x/flat@0.0.10/mod.ts' 

// Step 1: Read the downloaded_filename JSON
const filename = Deno.args[0] // Same name as downloaded_filename `const filename = 'btc-price.json';`
const json = await readJSON(filename)
console.log(json)

// Step 2: Filter specific data we want to keep and write to a new JSON file
const currencyRates = Object.values(json.bpi); // convert property values into an array
const filteredCurrencyRates = currencyRates.map((rate) => ({ 
    currency: rate.description,
    bitcoinRate: rate.rate_float,
    symbol: rate.symbol
}));

// Step 3. Write a new JSON file with our filtered data
const newFilename = `btc-price-postprocessed.json` // name of a new file to be saved
await writeJSON(newFilename, filteredCurrencyRates) // create a new JSON file with just the Bitcoin price
console.log("Wrote a post process file")