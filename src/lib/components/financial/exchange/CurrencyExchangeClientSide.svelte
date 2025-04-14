<script lang="ts">
	import { onMount } from 'svelte';

	// Define the type for the expected API response structure (optional but good practice)
	interface ExchangeRateResponse {
		result: string;
		provider: string;
		documentation: string;
		terms_of_use: string;
		time_last_update_unix: number;
		time_last_update_utc: string;
		time_next_update_unix: number;
		time_next_update_utc: string;
		time_eol_unix: number;
		base_code: string;
		rates: { [key: string]: number }; // Dictionary of currency codes to rates
	}

	// --- State Variables ---
	let rates: { [key: string]: number } | null = null;
	let baseCode: string | null = null;
	let lastUpdatedUTC: string | null = null;
	let isLoading: boolean = true;
	let error: string | null = null;

	// --- Constants ---
	const CACHE_KEY_DATA = 'exchangeRatesData';
	const CACHE_KEY_TIMESTAMP = 'exchangeRatesTimestamp';
	const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const API_URL = 'https://open.er-api.com/v6/latest/USD';

	// --- Fetch Logic ---
	async function fetchRates() {
		isLoading = true;
		error = null;
		console.log('Attempting to fetch new exchange rates...');

		try {
			const response = await fetch(API_URL);
			if (!response.ok) {
				throw new Error(`API request failed with status: ${response.status}`);
			}
			const data: ExchangeRateResponse = await response.json();

			if (data.result === 'success') {
				rates = data.rates;
				baseCode = data.base_code;
				lastUpdatedUTC = data.time_last_update_utc;

				// Cache the new data and timestamp
				localStorage.setItem(CACHE_KEY_DATA, JSON.stringify(data));
				localStorage.setItem(CACHE_KEY_TIMESTAMP, Date.now().toString());
				console.log('Successfully fetched and cached new rates.');

			} else {
				throw new Error('API returned an error: ' + (data.result || 'Unknown error'));
			}
		} catch (err: any) {
			console.error('Error fetching exchange rates:', err);
			error = err.message || 'Failed to fetch exchange rates.';
			// Optionally clear cache on error? Or keep stale data? Decide based on UX needs.
			// localStorage.removeItem(CACHE_KEY_DATA);
			// localStorage.removeItem(CACHE_KEY_TIMESTAMP);
		} finally {
			isLoading = false;
		}
	}

	// --- Lifecycle Hook ---
	onMount(() => {
		console.log('Component mounted. Checking cache...');
		const cachedTimestampStr = localStorage.getItem(CACHE_KEY_TIMESTAMP);
		const cachedDataStr = localStorage.getItem(CACHE_KEY_DATA);

		if (cachedTimestampStr && cachedDataStr) {
			const cachedTimestamp = parseInt(cachedTimestampStr, 10);
			const now = Date.now();

			if (now - cachedTimestamp < CACHE_DURATION_MS) {
				// Cache is valid
				console.log('Using cached data.');
				try {
                    const cachedData: ExchangeRateResponse = JSON.parse(cachedDataStr);
                    rates = cachedData.rates;
                    baseCode = cachedData.base_code;
                    lastUpdatedUTC = cachedData.time_last_update_utc;
                    isLoading = false;
                } catch (parseError) {
                    console.error("Error parsing cached data:", parseError);
                    // If parsing fails, treat cache as invalid and fetch fresh data
                    localStorage.removeItem(CACHE_KEY_DATA);
                    localStorage.removeItem(CACHE_KEY_TIMESTAMP);
                    fetchRates();
                }
			} else {
				// Cache is stale
				console.log('Cache is stale. Fetching new data...');
				fetchRates();
			}
		} else {
			// No cache found
			console.log('No cache found. Fetching new data...');
			fetchRates();
		}
	});
</script>

<h1>Exchange Rates</h1>

{#if isLoading}
	<p>Loading exchange rates...</p>
{:else if error}
	<p style="color: red;">Error: {error}</p>
	{#if rates}
		<p>(Showing previously loaded data)</p>
		{/if}
{:else if rates && baseCode}
	<p>Base Currency: <strong>{baseCode}</strong></p>
	<p>Last Updated: {lastUpdatedUTC || 'N/A'}</p>
	<h2>Rates:</h2>
	<ul>
		{#each Object.entries(rates) as [currency, rate]}
			<li>{currency}: {rate}</li>
		{/each}
	</ul>
{:else}
    <p>No exchange rate data available.</p>
{/if}

<style>
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		margin-bottom: 0.5em;
		font-family: monospace;
	}
</style>