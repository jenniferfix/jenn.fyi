import firaCodeFontUrl from "@fontsource/fira-code/files/fira-code-latin-400-normal.woff2?url";
import spaceGroteskFontUrl from "@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2?url";

const latinUnicodeRange =
	"U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";

const criticalCss = `
@font-face{font-family:"Space Grotesk Variable";font-style:normal;font-display:swap;font-weight:300 700;src:url("${spaceGroteskFontUrl}") format("woff2-variations");unicode-range:${latinUnicodeRange}}
@font-face{font-family:"Fira Code Variable";font-style:normal;font-display:swap;font-weight:300 700;src:url("${firaCodeFontUrl}") format("woff2-variations");unicode-range:${latinUnicodeRange}}
:root{--background:oklch(1 0 0);--foreground:oklch(.141 .005 285.823);--muted:oklch(.967 .001 286.375);--muted-foreground:oklch(.552 .016 285.938);--rainbow-text:135deg,#c00 0%,#c00 13.67%,#eea500 19.67%,#eea500 30.33%,#dddd00 36.33%,#dddd00 47%,green 53%,green 63.67%,blue 69.67%,blue 79.33%,violet 87.33%,violet 100%;--glow:270 100% 85%}
.dark{--background:oklch(.141 .005 285.823);--foreground:oklch(.985 0 0);--muted:oklch(.274 .006 286.033);--muted-foreground:oklch(.705 .015 286.067);--rainbow-text:135deg,red 0%,red 13.67%,orange 19.67%,orange 30.33%,yellow 36.33%,yellow 47%,green 53%,green 63.67%,blue 69.67%,blue 79.33%,violet 87.33%,violet 100%;--glow:270 100% 10%}
*{box-sizing:border-box}
html{scroll-snap-type:y mandatory}
body{min-height:100vh;margin:0;overflow-x:clip;background-color:var(--background);background-image:radial-gradient(ellipse,hsl(var(--glow)) 10%,var(--background) 90%);color:var(--foreground);font-family:"Space Grotesk Variable","Space Mono",Verdana,sans-serif}
#hero{display:flex;min-height:100vh;align-items:center;justify-content:center;scroll-snap-align:start}
#hero>div{display:flex;flex-direction:column}
#hero figure{display:flex;justify-content:center;margin:0 0 2rem}
#hero figure img{width:9rem;height:9rem;border-radius:9999px;object-fit:cover;object-position:center 20%}
#hero>div>div>div:first-child{font-family:"Fira Code Variable",monospace;font-size:1.5rem;line-height:2rem}
#hero>div>div>div:nth-child(2){margin-block:.5rem;font-size:2.25rem;line-height:2.5rem}
#hero>div>div>div:nth-child(2)>span:first-child{color:oklch(.777 .152 181.912)}
.rainbowtext{background-image:linear-gradient(var(--rainbow-text));background-clip:text;color:transparent}
#hero>div>div>div:last-child{display:flex;gap:.25rem}
#hero>div>div>div:last-child>a,#hero>div>div>div:last-child>button{display:inline-flex;width:4.5rem;height:4.5rem;align-items:center;justify-content:center;border:0;border-radius:9999px;background:transparent;color:inherit}
#hero>div>div>div:last-child svg{width:2.25rem;height:2.25rem}
.fixed{position:fixed}.inline-block{display:inline-block}.top-6{top:1.5rem}.right-14{right:3.5rem}
@media (width>=40rem){#hero>div>div>div:nth-child(2){font-size:3rem;line-height:1}#hero>div>div>div:last-child svg{width:2.5rem;height:2.5rem}}
@media (width>=48rem){#hero>div{flex-direction:row}#hero figure{margin:0 2rem 0 0;margin-block:auto}#hero>div>div>div:first-child{font-size:1.25rem;line-height:1.75rem}}
@media (width>=64rem){.lg\\:top-8{top:2rem}.lg\\:right-16{right:4rem}}
`;

export { criticalCss, firaCodeFontUrl, spaceGroteskFontUrl };
