/*
 * Free My TV for Samsung (Tizen): default settings.
 *
 * Everything here can also be changed on the TV (the gear button), and what you set there wins.
 * This file is public on GitHub: do NOT put your TMDB key here. Type it on the TV, in Settings.
 */
var FMT_CONFIG = {
  // Your city, for the weather and the sunset that turns the screen dark at night.
  city: "São Paulo",
  latitude: -23.5505,
  longitude: -46.6333,

  // Country (two letters): which titles are on which streaming app.
  tmdbRegion: "BR",

  // "pt" or "en"
  language: "pt",

  // Crypto prices: BRL, USD or EUR. In BRL the US dollar is shown too.
  currency: "BRL",

  // "C" or "F"
  temperature: "C",

  // "auto" (follows the sunset), "light" or "dark"
  look: "auto",

  // Minutes without touching the remote before the screensaver (0 = off).
  screensaverMinutes: 10,

  // Shelf order. Only the ones installed on the TV show up (up to 7).
  shelf: ["netflix", "youtube", "globoplay", "prime", "disney", "max", "appletv",
          "paramount", "crunchyroll", "spotify", "plutotv", "twitch"],

  // If the TV doesn't tell which apps it has, the shelf uses these Tizen app ids instead.
  // Find an app's id in Settings → "Apps found on the TV". Example: { youtube: "9Ur5IzDKqV.TizenYouTube" }
  appIds: {}
};
