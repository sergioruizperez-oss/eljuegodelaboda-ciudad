import { useEffect, useMemo, useState } from 'react';

const RAW_CITIES = [
  ['Ámsterdam','Países Bajos','recorrer los canales en barco, visitar museos y cafés junto al agua'],
  ['Atenas','Grecia','ver la Acrópolis, pasear por Plaka y comer delicias griegas al sol'],
  ['Barcelona','España','disfrutar de las playas, la Sagrada Familia y tapas hasta caer de espaldas'],
  ['Basilea / Mulhouse / Freiburg','Suiza / Francia / Alemania','saltar de un país a otro casi sin darse cuenta'],
  ['Bilbao','España','ver el Guggenheim, tapear de pintxos y hacer alguna excursión cerca'],
  ['Bordeaux','Francia','probar vinos, pasear junto al Garona y admirar el centro histórico'],
  ['Bruselas','Bélgica','comer gofres, chocolate y perderse por la Grand Place'],
  ['Copenhague','Dinamarca','pasear por Nyhavn, montarse en Tivoli y presumir de diseño nórdico'],
  ['Cracovia','Polonia','recorrer el casco antiguo medieval y subir al castillo de Wawel'],
  ['Gdansk','Polonia','ver el puerto histórico, la arquitectura báltica y pasear junto al mar'],
  ['Ginebra','Suiza','ver el lago Lemán, probar chocolate y disfrutar de las vistas alpinas'],
  ['Helsinki','Finlandia','alternar entre saunas, arquitectura y naturaleza del archipiélago'],
  ['Lisboa','Portugal','subir en tranvía, ver miradores y comer pastéis de nata'],
  ['Londres','Reino Unido','visitar museos gratuitos, parques enormes y mercados míticos'],
  ['Málaga','España','ir a la playa, ver a Picasso y zamparse un buen pescaíto frito'],
  ['Marsella','Francia','recorrer el puerto viejo, ver arte callejero y probar bouillabaisse'],
  ['Nantes','Francia','pasear junto al Loira y probar buen marisco'],
  ['Niza / Côte d’Azur','Francia','mezclar playas, glamour y pueblecitos preciosos alrededor'],
  ['Oslo','Noruega','acercarse a los fiordos, ver arquitectura nórdica y museos curiosos'],
  ['Varsovia','Polonia','pasear por una ciudad reconstruida y por parques enormes'],
  ['Porto','Portugal','ver la Ribeira, cruzar puentes y brindar con vino de Oporto'],
  ['Praga','República Checa','cruzar puentes, ver castillos y sentirse en un cuento'],
  ['Roma','Italia','ver Coliseo, Foro, Vaticano y comer pasta para llorar de felicidad'],
  ['Sevilla','España','pasear por Santa Cruz, ver la Giralda y tapear sin piedad'],
  ['Estocolmo','Suecia','saltar entre islas, palacios y museos vikingos'],
  ['Zúrich','Suiza','ver lago, montaña y tiendas de diseño muy peligrosas para la tarjeta'],
  ['Turín','Italia','pasear por cafés históricos y probar gastronomía piamontesa'],
  ['Venecia','Italia','perderse por canales, puentes y rincones románticos']
];

const SOFIA = [
  'Sofía',
  'Bulgaria',
`✨🎉 ¡Siiiiii! ¡Muy bien! ¡Habéis acertado! 🎉✨

Os vais a Sofía. En diciembre hace una media de 2–3 °C, así que esperamos que llevéis gorros, guantes, abrigos... y un pato de goma, of course! 🦆🧣🧤

🛬 Llegaréis a las 22:45 hora local (crucemos los dedos para que WizzAir —NO RYANAIR— sea puntual 🤞). Pasaréis dos noches en el Hotel Aurora Sofia. El desayuno está incluido.

🚇 Para llegar al hotel, podéis tomar la línea M4 de metro, dirección Slivnitsa. Son 13 paradas hasta Opaltchenska y luego unos 5 minutos andando. Descargad el mapa offline por si acaso. 😉

🏛️ En Sofía os recomendamos la Catedral Aleksandr Nevski, la Iglesia de Santa Sofía, la Rotonda de San Jorge... No os preocupéis, os mandaremos todos los detalles por WhatsApp una vez desvelado el misterio.

✈️ La vuelta será el domingo 23 a las 15:00 (hora de Sofía), esta vez con Bulgaria Air.

🍽️ La cena también está incluida en vuestro pack bodil. Tenéis mesa en Manastirska Magernitsa, un restaurante tradicional búlgaro. Eso sí, cenaréis en horario europeo: a las 19:00.

💖 Muchísimas gracias por seguirnos el juego. Sentimos “mucho” haberos hecho sufrir, pero esperamos que os hayáis divertido tanto como nosotros.

Con esto, queda concluido oficialmente el JUEGO DE LA BODA. 💍✨`
];

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value) {
  document.cookie = name + '=' + encodeURIComponent(value) + ';path=/;max-age=31536000';
}

function launchConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;

  (function frame() {
    const colors = ['#ff6b6b', '#ffe066', '#4c1d95', '#5b21b6'];
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.opacity = 1;
    particle.style.borderRadius = '50%';
    particle.style.transition = 'transform 2s ease-out, opacity 2s ease-out';
    document.body.appendChild(particle);

    requestAnimationFrame(() => {
      particle.style.transform = 'translateY(200px) rotate(720deg)';
      particle.style.opacity = 0;
    });

    setTimeout(() => particle.remove(), 2000);

    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const [includeSofia, setIncludeSofia] = useState(false);
  const [seed, setSeed] = useState(0);
  const [timesBack, setTimesBack] = useState(0);

  useEffect(() => {
    const count = parseInt(getCookie('menuCount') || '0', 10);
    setTimesBack(count);
    if (count >= 5) {
      setIncludeSofia(true);
    }
  }, []);

  const cities = useMemo(() => {
    let base = shuffle(RAW_CITIES);
    if (includeSofia) {
      base = base.filter((c) => c[0] !== 'Sofía');
      const chosen = base.slice(0, 9);
      const withSofia = [...chosen, SOFIA];
      return shuffle(withSofia);
    }
    return base.slice(0, 10);
  }, [includeSofia, seed]);

  const handleSelect = (city) => {
    setSelected(city);
    if (city[0] === 'Sofía') {
      launchConfetti();
    }
  };

  const handleBackToMenu = () => {
    const newCount = timesBack + 1;
    setTimesBack(newCount);
    setCookie('menuCount', String(newCount));
    if (newCount >= 5) {
      setIncludeSofia(true);
    }
    setSelected(null);
    setSeed((s) => s + 1);
  };

  return (
    <div className="app-root">
      <div className="app-card">
        <h1>¿Dónde os apetece ir?</h1>
        {!selected ? (
          <>
            <p className="app-intro">
              Elige tu destino... ¿dónde pensáis que vais a volar? Ojo con lo que seleccionáis:
              si os equivocáis podréis volver al menú principal y elegir otra opción. Pero no,
              no tendréis que esperar :-).
            </p>
            {cities.map((c, idx) => (
              <button
                key={c[0] + idx}
                className="city-btn"
                onClick={() => handleSelect(c)}
              >
                <span>📍</span>
                <span>
                  {c[0]} <span className="city-country">· {c[1]}</span>
                </span>
              </button>
            ))}
          </>
        ) : (
          <div className="card">
            <h2 className="detail-title">
              {selected[0]} — <span>{selected[1]}</span>
            </h2>
            <p className="detail-text">
              ✈️ Vaya, ¡buena elección! ¿Así que os gustaría visitar <strong>{selected[0]}</strong> en{' '}
              <strong>{selected[1]}</strong>? Posiblemente no sea la mejor época del año, pero estaría genial para{' '}
              {selected[2]}.
            </p>
            {/* Si NO es Sofía → mostrar texto genérico */}
{selected[0] !== 'Sofía' && (
  <p className="detail-text">
    🙃 Pero me temo que va a ser que no: esta vez no vais a <strong>{selected[0]}</strong>.
    No os preocupéis: podéis volver al menú principal sin esperar una hora ni nada raro.
    Podréis intentarlo de nuevo inmediatamente, que se acerca la hora de embarque. 🛫
  </p>
)}

{/* Si es Sofía → mostrar solo el texto especial */}
{selected[0] === 'Sofía' && (
  <p className="detail-text">
    {SOFIA[2]}
  </p>
)}
            <button className="btn-menu" onClick={handleBackToMenu}>
              Volver al menú principal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
