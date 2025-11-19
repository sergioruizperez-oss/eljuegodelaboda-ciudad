import { useEffect, useMemo, useState } from 'react';

const RAW_CITIES = [
  ['Ámsterdam','Países Bajos','recorrer los canales en barco, fumaros unos canutos, visitar museos y helaros junto a los canales'],
  ['Atenas','Grecia','ver la Acrópolis, pasear por Plaka y comer delicias griegas como si no hubiera un mañana'],
  ['Barcelona','España','disfrutar de las playas, la Sagrada Familia y comer tapas hasta caer de espaldas'],
  ['Basilea','Suiza','saltar de un país a otro casi sin darse cuenta'],
  ['Bilbao','España','ver OTRA VEZ el Guggenheim, tapear de pintxos UNA VEZ MÁS y volver corriendo cuesta arriba para recuperar el bolso perdido'],
  ['Burdeos','Francia','beber vino como si estuvierais en Juego de Tronos, pasear junto al Garona (río desconocido donde los haya) y admirar el centro histórico'],
  ['Bruselas','Bélgica','comer gofres, chocolate y perderse por la Grand Place'],
  ['Copenhague','Dinamarca','pasear por Nyhavn, montarse en Tivoli y presumir de diseño nórdico'],
  ['Cracovia','Polonia','recorrer el casco antiguo medieval y subir al castillo de Wawel'],
  ['Gdansk','Polonia','ver el puerto histórico, la arquitectura báltica y pasear junto al mar'],
  ['Ginebra','Suiza','ver el lago Lemán, probar chocolate y disfrutar de las vistas alpinas'],
  ['Helsinki','Finlandia','pasar más frío que robando nieve'],
  ['Lisboa','Portugal','pasar momentos inolvidables con Carla, Sergio y la familia'],
  ['Londres','Reino Unido','¿qué? ¿para quéeeeeee?'],
  ['Málaga','España','ir a la playa (por los cojones), ver el museo Picasso y comer pescaíto frito con vuestros queridísimos amigos Carla y Sergio (una pena que no haya cuadrado, era una opción sólida)'],
  ['Marsella','Francia','recorrer el puerto viejo, ver arte callejero y probar bouillabaisse'],
  ['Nantes','Francia','pasear junto al Loira y probar buen marisco'],
  ['Côte d’Azur','Francia','ver la playa de lejos, glamour (prepara la de Ubrique) y ver pueblecitos preciosos alrededor'],
  ['Oslo','Noruega','acercarse a los fiordos, ver arquitectura nórdica y museos curiosos'],
  ['Varsovia','Polonia','pasear por una ciudad reconstruida y por parques enormes'],
  ['Porto','Portugal','ver la Ribeira, cruzar puentes y brindar con vino de Oporto'],
  ['Praga','República Checa','cruzar puentes, ver castillos y sentirse en un cuento'],
  ['Roma','Italia','ver el Coliseo, Foro, Vaticano y comer pasta hasta llorar de felicidad'],
  ['Sevilla','España','... quillo, que NO ES, cojones'],
  ['Estocolmo','Suecia','saltar entre islas, palacios y museos vikingos'],
  ['Zúrich','Suiza','ver lago, montaña y tiendas de diseño muy peligrosas para la tarjeta'],
  ['Turín','Italia','pasear por cafés históricos y probar gastronomía piamontesa'],
  ['Venecia','Italia','perderse por canales, puentes y rincones románticos']
];

const SOFIA = [
  'Sofía',
  'Bulgaria',
`✨🎉 ¡Siiiiii! ¡TOMAAAAAAAAAAAA! ¡Habéis acertado! 🎉✨

Os vais a Sofía, que no SOFEA. En esta época del año la media es de 2–3 °C, así que esperamos que llevéis gorros, guantes, abrigos... y un pato de goma, of course! 🦆🧣🧤

🛬 Llegaréis a las <strong>22:45</strong> hora local (crucemos los dedos para que WizzAir —NO RYANAIR— sea puntual 🤞). Pasaréis dos noches en el Hotel <strong>Aurora Sofia</strong>. El desayuno está incluido.

🚇 Para llegar al hotel, podéis tomar la <strong>línea M4</strong> de metro, dirección Slivnitsa. Son 13 paradas hasta Opalchenska y luego unos 5 minutos andando. Descargad el mapa de Google Maps offline por si acaso. 😉

🏛️ En Sofía os hemos reservado un walking tour con un guía. Os reconocerá cuando le hagáis la entrega del CD de villancicos. Tenéis que estar el <strong>sábado a las 10:00</strong> en el meeting point: monument of Saint Sofia - city patron. Son varias horas, aunque haréis paradas para tomar un café, comer, etc. Es posible que no os dé tiempo de ir al hotel antes de la cena. En cualquier caso, no os preocupéis, os mandaremos todos los detalles por WhatsApp.

🍽️ La cena del sábado también está incluida en vuestro pack bodil. Tenéis mesa reservada en <strong>Manastirska Magernitsa</strong>, un restaurante tradicional búlgaro. Eso sí, cenaréis en horario europeo: a las 19:00.

✈️ La vuelta será el <strong>domingo 23 a las 15:00</strong> (hora de Sofía), esta vez con Bulgaria Air. Llegáis a Madrid a las <strong>17:55</strong>.

💖 Muchísimas gracias por seguirnos el juego. Sentimos “mucho” haberos hecho sufrir, pero esperamos que os hayáis divertido tanto como nosotros.

Dicho esto, queda concluido oficialmente el JUEGO DE LA BODA. 💍✨`
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

  // Leer cookie al cargar
  useEffect(() => {
    const count = parseInt(getCookie('menuCount') || '0', 10);
    setTimesBack(count);
    if (count >= 5) {
      setIncludeSofia(true);
    }
  }, []);

  // Construir lista de ciudades según si ya toca incluir Sofía
  const cities = useMemo(() => {
    let base = shuffle(RAW_CITIES);
    if (includeSofia) {
      // A partir de la 6ª vez: Sofía siempre incluida, sin destacar, en posición aleatoria
      base = base.filter((c) => c[0] !== 'Sofía');
      const chosen = base.slice(0, 9);
      const withSofia = [...chosen, SOFIA];
      return shuffle(withSofia);
    }
    // Primeras 5 listas: sin Sofía
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
            {selected[0] === 'Sofía' ? (
              <>
                <h2
                  className="detail-title"
                  style={{
                    textAlign: 'center',
                    fontSize: '28px',
                    marginBottom: '16px',
                    fontWeight: 'bold'
                  }}
                >
                  Sofía — Bulgaria
                </h2>
                <p
                  className="detail-text"
                  style={{ fontSize: '18px', lineHeight: 1.6 }}
                  dangerouslySetInnerHTML={{
                    __html: SOFIA[2].replace(/\n/g, '<br />')
                  }}
                />
              </>
            ) : (
              <>
                <h2 className="detail-title">
                  {selected[0]} — <span>{selected[1]}</span>
                </h2>
                <p className="detail-text">
                  ✈️ Vaya, ¡buena elección! ¿Así que os gustaría visitar <strong>{selected[0]}</strong> en{' '}
                  <strong>{selected[1]}</strong>? Posiblemente no sea la mejor época del año, pero estaría genial para{' '}
                  {selected[2]}.
                </p>
                <p className="detail-text">
                  🙃 Pero me temo que va a ser que no: esta vez no vais a <strong>{selected[0]}</strong>.
                  No os preocupéis: podéis volver al menú principal sin esperar una hora ni nada raro.
                  Podréis intentarlo de nuevo inmediatamente, que se acerca la hora de embarque. 🛫
                </p>
              </>
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
