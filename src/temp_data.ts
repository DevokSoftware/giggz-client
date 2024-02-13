import { Comedian } from "./models/Comedian";
import { Content } from "./models/Content";
import { Show } from "./models/Show";

// Example show data
export const shows: Show[] = [
  {
    date: "10 de Outubro, 22:00h ",
    name: "Pata de Ganso",
    poster:
      "https://comunidadeculturaearte.com/wp-content/uploads/2023/09/Pedro-Teixeira-da-Mota-regressa-aos-palcos-com-espetaculo-22Pata-de-Ganso22.png",
    location: {
      name: "Lisboa Comedy Club",
      address: "Av. Duque de Loulé 3A, 1050-085 Lisboa",
    },
  },
  {
    date: "25 de Abril, 21:00h",
    name: "Pata de Ganso",
    poster:
      "https://comunidadeculturaearte.com/wp-content/uploads/2023/09/Pedro-Teixeira-da-Mota-regressa-aos-palcos-com-espetaculo-22Pata-de-Ganso22.png",
    location: {
      name: "Teatro Villaret",
      address: "Av. Fontes Pereira de Melo 30A, 1050-122 Lisboa",
    },
  },
  {
    date: "25 de Abril, 21:00h",
    name: "Pata de Ganso",
    poster:
      "https://comunidadeculturaearte.com/wp-content/uploads/2023/09/Pedro-Teixeira-da-Mota-regressa-aos-palcos-com-espetaculo-22Pata-de-Ganso22.png",
    location: {
      name: "Teatro Villaret",
      address: "Av. Fontes Pereira de Melo 30A, 1050-122 Lisboa",
    },
  },
];

export const contents: Content[] = [
  {
    name: "watch.tm - Podcast",
    contenttype: "SPOTIFY",
    url: "https://open.spotify.com/show/2OSrNmY2aRczyjLyRPJqxM",
  },
  {
    name: "ask.tm - Podcast",
    contenttype: "SPOTIFY",
    url: "https://open.spotify.com/show/47e6U4LEsJBj2cdbFCpdjw",
  },
  {
    name: "Patreon",
    contenttype: "PATREON",
    url: "https://www.patreon.com/pedrotmota/",
  },
  {
    name: "Impasse - Stand Up Comedy",
    contenttype: "YOUTUBE",
    url: "https://www.youtube.com/watch?v=t1nDOuGyT7U",
  },
  {
    name: "Conversas de Miguel - Podcast",
    contenttype: "YOUTUBE",
    url: "https://www.youtube.com/@ConversasdeMiguel",
  },
  {
    name: "Bumerangue - Sketches",
    contenttype: "YOUTUBE",
    url: "https://www.youtube.com/@sobumeranguenaodava",
  },
];

export const comedian: Comedian = {
  id: 1,
  name: "Pedro Teixeira da Mota",
  description: "Uma descrição muito crazy.",
  image:
    "https://pbs.twimg.com/profile_images/1340074211545665544/Kyp4dDeg_400x400.jpg",
  social: {
    tiktok: "https://www.tiktok.com/@delmotta",
    youtube: "https://www.youtube.com/@PedroTeixeiraDaMota",
    instagram: "https://www.instagram.com/pedrotmota/",
    twitter: "https://twitter.com/pedrotmota",
  },
};

export const comediansData = [
  {
    id: 1,
    name: "Pedro Teixeira da Mota",
    description: "A funny comedian.",
    image:
      "https://pbs.twimg.com/profile_images/1340074211545665544/Kyp4dDeg_400x400.jpg", // Example image, replace with actual image URL
  },
  {
    id: 2,
    name: "Vítor Sá",
    description: "A funny comedian.",
    image:
      "https://media.licdn.com/dms/image/C4D03AQF9w0POJ8CiHg/profile-displayphoto-shrink_800_800/0/1661855607791?e=2147483647&v=beta&t=Bksi6LhyyCVgQ9wc5K_fhYyUWKgdl1FuU30iO0EWz5g", // Example image, replace with actual image URL
  },
  {
    id: 3,
    name: "Ricardo Araújo Pereira",
    description: "A funny comedian.",
    image:
      "https://www.vip.pt/wp-content/uploads/2023/11/Destaque-VIP-2023-11-20T134409.896.jpg", // Example image, replace with actual image URL
  },
  {
    id: 4,
    name: "Bruno Nogueira",
    description: "A funny comedian.",
    image:
      "https://media.licdn.com/dms/image/C4D12AQFUhVRySsUkXQ/article-cover_image-shrink_720_1280/0/1590082795380?e=2147483647&v=beta&t=a5nbs9kFb8VKyRwyIfDqZAD8W_f8F4ypMW_B2F5p7FA", // Example image, replace with actual image URL
  },
  {
    id: 5,
    name: "João Pedro Pereira",
    description: "A funny comedian.",
    image:
      "https://bucket.ruc.pt/wp-content/uploads/2022/02/22110114/Captura-de-ecra%CC%83-2022-02-22-a%CC%80s-10.32.16.png", // Example image, replace with actual image URL
  },
  {
    id: 6,
    name: "André Pinheiro",
    description: "A funny comedian.",
    image:
      "https://www.festivalf.pt/util/imgLoader2.ashx?w=500&h=500&img=/upload_files/client_id_1/website_id_6/ArtistasHome/2022/Stand%20Up/Andre%20Pinheiro%20Festival%20F.png", // Example image, replace with actual image URL
  },
  {
    id: 7,
    name: "Salvador Martinha",
    description: "A funny comedian.",
    image:
      "https://m.media-amazon.com/images/M/MV5BNTUyMmI4MTgtYTg1Yi00YzJjLTg0YmEtZWI1ZDM1YmNjYTk4XkEyXkFqcGdeQXVyNjYzNDE4ODA@._V1_.jpg", // Example image, replace with actual image URL
  },
  {
    id: 8,
    name: "Carlos Coutinho Vilhena",
    description: "A funny comedian.",
    image: "https://ovilaverdense.b-cdn.net/2023/09/transferir-1.jpeg", // Example image, replace with actual image URL
  },
  {
    id: 9,
    name: "Diogo Batáguas",
    description: "A funny comedian.",
    image:
      "https://www.cm-almada.pt/sites/default/files/styles/image_main_news_events/public/2023-11/Falsos%20Lentos%20202308122929_0.jpg?h=fae764ac&itok=PdZkhUrQ", // Example image, replace with actual image URL
  },
  {
    id: 10,
    name: "Manuel Cardoso",
    description: "A funny comedian.",
    image:
      "https://comunidadeculturaearte.com/wp-content/uploads/2021/06/Manuel-Cardoso.png", // Example image, replace with actual image URL
  },
];
