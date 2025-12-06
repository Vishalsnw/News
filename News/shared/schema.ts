import { z } from "zod";

export const newspaperSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string(),
  epaperUrl: z.string(),
  language: z.string(),
  region: z.string(),
  featured: z.boolean().optional(),
});

export type Newspaper = z.infer<typeof newspaperSchema>;

export const languageSchema = z.object({
  code: z.string(),
  name: z.string(),
  nativeName: z.string(),
});

export type Language = z.infer<typeof languageSchema>;

export const languages: Language[] = [
  { code: "all", name: "All", nativeName: "All" },
  { code: "english", name: "English", nativeName: "English" },
  { code: "hindi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "marathi", name: "Marathi", nativeName: "मराठी" },
  { code: "gujarati", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "tamil", name: "Tamil", nativeName: "தமிழ்" },
  { code: "telugu", name: "Telugu", nativeName: "తెలుగు" },
  { code: "bengali", name: "Bengali", nativeName: "বাংলা" },
  { code: "kannada", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "malayalam", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "punjabi", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
];

export const newspapers: Newspaper[] = [
  // English Newspapers (PDF e-papers only)
  {
    id: "toi",
    name: "Times of India",
    logo: "https://www.google.com/s2/favicons?domain=epaper.timesgroup.com&sz=128",
    epaperUrl: "https://epaper.timesgroup.com/",
    language: "english",
    region: "National",
    featured: true,
  },
  {
    id: "hindu",
    name: "The Hindu",
    logo: "https://www.google.com/s2/favicons?domain=epaper.thehindu.com&sz=128",
    epaperUrl: "https://epaper.thehindu.com/",
    language: "english",
    region: "National",
    featured: true,
  },
  {
    id: "ht",
    name: "Hindustan Times",
    logo: "https://www.google.com/s2/favicons?domain=epaper.hindustantimes.com&sz=128",
    epaperUrl: "https://epaper.hindustantimes.com/",
    language: "english",
    region: "National",
    featured: true,
  },
  {
    id: "deccan",
    name: "Deccan Chronicle",
    logo: "https://www.google.com/s2/favicons?domain=epaper.deccanchronicle.com&sz=128",
    epaperUrl: "https://epaper.deccanchronicle.com/",
    language: "english",
    region: "South",
  },
  {
    id: "telegraph",
    name: "The Telegraph",
    logo: "https://www.google.com/s2/favicons?domain=epaper.telegraphindia.com&sz=128",
    epaperUrl: "https://epaper.telegraphindia.com/",
    language: "english",
    region: "East",
  },
  // Hindi Newspapers (PDF e-papers only)
  {
    id: "dainik-jagran",
    name: "Dainik Jagran",
    logo: "https://www.google.com/s2/favicons?domain=epaper.jagran.com&sz=128",
    epaperUrl: "https://epaper.jagran.com/",
    language: "hindi",
    region: "National",
    featured: true,
  },
  {
    id: "dainik-bhaskar",
    name: "Dainik Bhaskar",
    logo: "https://www.google.com/s2/favicons?domain=epaper.bhaskar.com&sz=128",
    epaperUrl: "https://epaper.bhaskar.com/",
    language: "hindi",
    region: "National",
    featured: true,
  },
  {
    id: "amar-ujala",
    name: "Amar Ujala",
    logo: "https://www.google.com/s2/favicons?domain=epaper.amarujala.com&sz=128",
    epaperUrl: "https://epaper.amarujala.com/",
    language: "hindi",
    region: "North",
  },
  {
    id: "hindustan",
    name: "Hindustan",
    logo: "https://www.google.com/s2/favicons?domain=epaper.livehindustan.com&sz=128",
    epaperUrl: "https://epaper.livehindustan.com/",
    language: "hindi",
    region: "National",
  },
  {
    id: "rajasthan-patrika",
    name: "Rajasthan Patrika",
    logo: "https://www.google.com/s2/favicons?domain=epaper.patrika.com&sz=128",
    epaperUrl: "https://epaper.patrika.com/",
    language: "hindi",
    region: "West",
  },
  // Marathi Newspapers (PDF e-papers only)
  {
    id: "lokmat",
    name: "Lokmat",
    logo: "https://www.google.com/s2/favicons?domain=epaper.lokmat.com&sz=128",
    epaperUrl: "https://epaper.lokmat.com/",
    language: "marathi",
    region: "Maharashtra",
    featured: true,
  },
  {
    id: "loksatta",
    name: "Loksatta",
    logo: "https://www.google.com/s2/favicons?domain=epaper.loksatta.com&sz=128",
    epaperUrl: "https://epaper.loksatta.com/",
    language: "marathi",
    region: "Maharashtra",
  },
  {
    id: "sakal",
    name: "Sakal",
    logo: "https://www.google.com/s2/favicons?domain=epaper.esakal.com&sz=128",
    epaperUrl: "https://epaper.esakal.com/",
    language: "marathi",
    region: "Maharashtra",
  },
  {
    id: "pudhari",
    name: "Pudhari",
    logo: "https://www.google.com/s2/favicons?domain=epaper.pudhari.com&sz=128",
    epaperUrl: "https://epaper.pudhari.com/",
    language: "marathi",
    region: "Maharashtra",
  },
  // Gujarati Newspapers (PDF e-papers only)
  {
    id: "divya-bhaskar",
    name: "Divya Bhaskar",
    logo: "https://www.google.com/s2/favicons?domain=epaper.divyabhaskar.co.in&sz=128",
    epaperUrl: "https://epaper.divyabhaskar.co.in/",
    language: "gujarati",
    region: "Gujarat",
  },
  {
    id: "gujarat-samachar",
    name: "Gujarat Samachar",
    logo: "https://www.google.com/s2/favicons?domain=epaper.gujaratsamachar.com&sz=128",
    epaperUrl: "https://epaper.gujaratsamachar.com/",
    language: "gujarati",
    region: "Gujarat",
  },
  {
    id: "sandesh",
    name: "Sandesh",
    logo: "https://www.google.com/s2/favicons?domain=epaper.sandesh.com&sz=128",
    epaperUrl: "https://epaper.sandesh.com/",
    language: "gujarati",
    region: "Gujarat",
  },
  // Tamil Newspapers (PDF e-papers only)
  {
    id: "dinamalar",
    name: "Dinamalar",
    logo: "https://www.google.com/s2/favicons?domain=epaper.dinamalar.com&sz=128",
    epaperUrl: "https://epaper.dinamalar.com/",
    language: "tamil",
    region: "Tamil Nadu",
  },
  {
    id: "dinamani",
    name: "Dinamani",
    logo: "https://www.google.com/s2/favicons?domain=epaper.dinamani.com&sz=128",
    epaperUrl: "https://epaper.dinamani.com/",
    language: "tamil",
    region: "Tamil Nadu",
  },
  {
    id: "daily-thanthi",
    name: "Daily Thanthi",
    logo: "https://www.google.com/s2/favicons?domain=epaper.dailythanthi.com&sz=128",
    epaperUrl: "https://epaper.dailythanthi.com/",
    language: "tamil",
    region: "Tamil Nadu",
  },
  // Telugu Newspapers (PDF e-papers only)
  {
    id: "eenadu",
    name: "Eenadu",
    logo: "https://www.google.com/s2/favicons?domain=epaper.eenadu.net&sz=128",
    epaperUrl: "https://epaper.eenadu.net/",
    language: "telugu",
    region: "Andhra Pradesh",
  },
  {
    id: "sakshi",
    name: "Sakshi",
    logo: "https://www.google.com/s2/favicons?domain=epaper.sakshi.com&sz=128",
    epaperUrl: "https://epaper.sakshi.com/",
    language: "telugu",
    region: "Telangana",
  },
  {
    id: "andhra-jyothy",
    name: "Andhra Jyothy",
    logo: "https://www.google.com/s2/favicons?domain=epaper.andhrajyothy.com&sz=128",
    epaperUrl: "https://epaper.andhrajyothy.com/",
    language: "telugu",
    region: "Andhra Pradesh",
  },
  // Bengali Newspapers (PDF e-papers only)
  {
    id: "anandabazar",
    name: "Anandabazar Patrika",
    logo: "https://www.google.com/s2/favicons?domain=epaper.anandabazar.com&sz=128",
    epaperUrl: "https://epaper.anandabazar.com/",
    language: "bengali",
    region: "West Bengal",
  },
  {
    id: "bartaman",
    name: "Bartaman",
    logo: "https://www.google.com/s2/favicons?domain=epaper.bartamanpatrika.com&sz=128",
    epaperUrl: "https://epaper.bartamanpatrika.com/",
    language: "bengali",
    region: "West Bengal",
  },
  {
    id: "sangbad-pratidin",
    name: "Sangbad Pratidin",
    logo: "https://www.google.com/s2/favicons?domain=epaper.sangbadpratidin.in&sz=128",
    epaperUrl: "https://epaper.sangbadpratidin.in/",
    language: "bengali",
    region: "West Bengal",
  },
  // Kannada Newspapers (PDF e-papers only)
  {
    id: "prajavani",
    name: "Prajavani",
    logo: "https://www.google.com/s2/favicons?domain=epaper.prajavani.net&sz=128",
    epaperUrl: "https://epaper.prajavani.net/",
    language: "kannada",
    region: "Karnataka",
  },
  {
    id: "vijaya-karnataka",
    name: "Vijaya Karnataka",
    logo: "https://www.google.com/s2/favicons?domain=epaper.vijaykarnataka.com&sz=128",
    epaperUrl: "https://epaper.vijaykarnataka.com/",
    language: "kannada",
    region: "Karnataka",
  },
  {
    id: "udayavani",
    name: "Udayavani",
    logo: "https://www.google.com/s2/favicons?domain=epaper.udayavani.com&sz=128",
    epaperUrl: "https://epaper.udayavani.com/",
    language: "kannada",
    region: "Karnataka",
  },
  // Malayalam Newspapers (PDF e-papers only)
  {
    id: "malayala-manorama",
    name: "Malayala Manorama",
    logo: "https://www.google.com/s2/favicons?domain=epaper.manoramaonline.com&sz=128",
    epaperUrl: "https://epaper.manoramaonline.com/",
    language: "malayalam",
    region: "Kerala",
  },
  {
    id: "mathrubhumi",
    name: "Mathrubhumi",
    logo: "https://www.google.com/s2/favicons?domain=epaper.mathrubhumi.com&sz=128",
    epaperUrl: "https://epaper.mathrubhumi.com/",
    language: "malayalam",
    region: "Kerala",
  },
  {
    id: "madhyamam",
    name: "Madhyamam",
    logo: "https://www.google.com/s2/favicons?domain=epaper.madhyamam.com&sz=128",
    epaperUrl: "https://epaper.madhyamam.com/",
    language: "malayalam",
    region: "Kerala",
  },
  // Punjabi Newspapers (PDF e-papers only)
  {
    id: "ajit",
    name: "Ajit",
    logo: "https://www.google.com/s2/favicons?domain=epaper.ajitjalandhar.com&sz=128",
    epaperUrl: "https://epaper.ajitjalandhar.com/",
    language: "punjabi",
    region: "Punjab",
  },
  {
    id: "jagbani",
    name: "Jagbani",
    logo: "https://www.google.com/s2/favicons?domain=epaper.jagbani.com&sz=128",
    epaperUrl: "https://epaper.jagbani.com/",
    language: "punjabi",
    region: "Punjab",
  },
];

// User type for future features
export const users = {
  id: "",
  username: "",
  password: "",
};

export type User = typeof users;
export type InsertUser = Omit<User, "id">;
