// AUTO-GENERATED — do not edit manually. Re-run optimize.sh to regenerate.
const MEDIA = {
  hero: {
    video:    "videos/hero-reel.mp4",
    poster:   "images/hero/hero-reel-poster.webp",
    fallback: "images/hero/hero-bg.webp"
  },
  weddings:  Array.from({length:92},(_,i)=>({img:`images/weddings/wedding-${String(i+1).padStart(2,'0')}.webp`,cat:"wedding",title:"Wedding"})).concat([
    {video:"videos/haldi-reel.mp4",      poster:"images/weddings/haldi-poster.webp",           cat:"wedding", title:"Haldi Reel"},
    {video:"videos/reception-reel.mp4",  poster:"images/weddings/reception-poster.webp",       cat:"wedding", title:"Reception Reel"},
    {video:"videos/wedding-teaser.mp4",  poster:"images/weddings/wedding-teaser-poster.webp",  cat:"wedding", title:"Wedding Teaser"},
    {video:"videos/sonali-teaser.mp4",   poster:"images/weddings/sonali-poster.webp",          cat:"wedding", title:"Sonali Teaser"}
  ]),
  birthdays: Array.from({length:10},(_,i)=>({img:`images/birthdays/birthday-${String(i+1).padStart(2,'0')}.webp`,cat:"birthday",title:"Birthday"})).concat([
    {video:"videos/birthday-video.mp4",  poster:"images/birthdays/birthday-poster.webp", cat:"birthday", title:"Birthday Film"}
  ]),
  products:  Array.from({length:36},(_,i)=>({img:`images/products/product-${String(i+1).padStart(2,'0')}.webp`,cat:"product",title:"Product Shoot"})),
  events: [
    {video:"videos/home-ceremony.mp4", poster:"images/events/event-poster.webp", cat:"event", title:"Home Opening Ceremony"},
    {video:"videos/event-vid.mp4",     poster:"images/events/event-poster.webp", cat:"event", title:"Event Coverage"}
  ],
  instagram: Array.from({length:6},(_,i)=>`images/instagram/insta-${String(i+1).padStart(2,'0')}.webp`)
};