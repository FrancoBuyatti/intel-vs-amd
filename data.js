/* ============================================================
   data.js  —  v3: banco de 12 casos (modernos + históricos)
   Cada participante ve 5 sorteados al azar al arrancar.
   ============================================================ */

/* ----------------------------------------------------------
   1) ESPECIFICACIONES DE PROCESADORES
   Incluye CPUs modernas (2023-2024), intermedias (2015-2020)
   e históricas (2010-2015). Datos aproximados, fines educativos.
   ---------------------------------------------------------- */
const CPU_SPECS = {

  /* ── MODERNOS (2023-2024) ─────────────────────────────── */
  "i5-14600k": {
    brand: "intel", name: "Intel Core i5-14600K", icon: "🔷",
    cores: "14 núcleos (6P + 8E)", threads: "20 hilos",
    freq: "5.3 GHz", cache: "24 MB", tdp: "125 W", socket: "LGA1700"
  },
  "i7-14700k": {
    brand: "intel", name: "Intel Core i7-14700K", icon: "🔷",
    cores: "20 núcleos (8P + 12E)", threads: "28 hilos",
    freq: "5.6 GHz", cache: "33 MB", tdp: "125 W", socket: "LGA1700"
  },
  "i9-14900k": {
    brand: "intel", name: "Intel Core i9-14900K", icon: "🔷",
    cores: "24 núcleos (8P + 16E)", threads: "32 hilos",
    freq: "6.0 GHz", cache: "36 MB", tdp: "125 W", socket: "LGA1700"
  },
  "ryzen5-9600x": {
    brand: "amd", name: "AMD Ryzen 5 9600X", icon: "🔶",
    cores: "6 núcleos", threads: "12 hilos",
    freq: "5.4 GHz", cache: "38 MB", tdp: "65 W", socket: "AM5"
  },
  "ryzen7-9700x": {
    brand: "amd", name: "AMD Ryzen 7 9700X", icon: "🔶",
    cores: "8 núcleos", threads: "16 hilos",
    freq: "5.5 GHz", cache: "40 MB", tdp: "65 W", socket: "AM5"
  },
  "ryzen9-9950x": {
    brand: "amd", name: "AMD Ryzen 9 9950X", icon: "🔶",
    cores: "16 núcleos", threads: "32 hilos",
    freq: "5.7 GHz", cache: "80 MB", tdp: "170 W", socket: "AM5"
  },

  /* ── ERA INTERMEDIA (2015-2020) ───────────────────────── */
  "i7-8700k": {
    brand: "intel", name: "Intel Core i7-8700K", icon: "🔷",
    cores: "6 núcleos", threads: "12 hilos",
    freq: "4.7 GHz", cache: "12 MB", tdp: "95 W", socket: "LGA1151"
  },
  "i9-9900k": {
    brand: "intel", name: "Intel Core i9-9900K", icon: "🔷",
    cores: "8 núcleos", threads: "16 hilos",
    freq: "5.0 GHz", cache: "16 MB", tdp: "95 W", socket: "LGA1151"
  },
  "i5-8600k": {
    brand: "intel", name: "Intel Core i5-8600K", icon: "🔷",
    cores: "6 núcleos", threads: "6 hilos",
    freq: "4.3 GHz", cache: "9 MB", tdp: "95 W", socket: "LGA1151"
  },
  "ryzen5-2600": {
    brand: "amd", name: "AMD Ryzen 5 2600", icon: "🔶",
    cores: "6 núcleos", threads: "12 hilos",
    freq: "3.9 GHz", cache: "19 MB", tdp: "65 W", socket: "AM4"
  },
  "ryzen7-3700x": {
    brand: "amd", name: "AMD Ryzen 7 3700X", icon: "🔶",
    cores: "8 núcleos", threads: "16 hilos",
    freq: "4.4 GHz", cache: "36 MB", tdp: "65 W", socket: "AM4"
  },
  "ryzen9-3900x": {
    brand: "amd", name: "AMD Ryzen 9 3900X", icon: "🔶",
    cores: "12 núcleos", threads: "24 hilos",
    freq: "4.6 GHz", cache: "70 MB", tdp: "105 W", socket: "AM4"
  },

  /* ── ERA HISTÓRICA (2010-2015) ────────────────────────── */
  "i7-2600k": {
    brand: "intel", name: "Intel Core i7-2600K", icon: "🔷",
    cores: "4 núcleos", threads: "8 hilos",
    freq: "3.8 GHz", cache: "8 MB", tdp: "95 W", socket: "LGA1155"
  },
  "i5-4690k": {
    brand: "intel", name: "Intel Core i5-4690K", icon: "🔷",
    cores: "4 núcleos", threads: "4 hilos",
    freq: "3.9 GHz", cache: "6 MB", tdp: "88 W", socket: "LGA1150"
  },
  "i7-4770k": {
    brand: "intel", name: "Intel Core i7-4770K", icon: "🔷",
    cores: "4 núcleos", threads: "8 hilos",
    freq: "3.9 GHz", cache: "8 MB", tdp: "84 W", socket: "LGA1150"
  },
  "fx-8350": {
    brand: "amd", name: "AMD FX-8350", icon: "🔶",
    cores: "8 módulos (4 reales)", threads: "8 hilos",
    freq: "4.2 GHz", cache: "8 MB", tdp: "125 W", socket: "AM3+"
  },
  "fx-6300": {
    brand: "amd", name: "AMD FX-6300", icon: "🔶",
    cores: "6 módulos (3 reales)", threads: "6 hilos",
    freq: "4.1 GHz", cache: "8 MB", tdp: "95 W", socket: "AM3+"
  },
  "a10-7850k": {
    brand: "amd", name: "AMD A10-7850K (APU)", icon: "🔶",
    cores: "4 núcleos", threads: "4 hilos",
    freq: "4.0 GHz", cache: "4 MB", tdp: "95 W", socket: "FM2+"
  }
};

/* ----------------------------------------------------------
   2) BANCO COMPLETO DE CASOS (12 escenarios)
   Al arrancar la app, se sortean 5 de estos 12 para cada
   participante. Cada caso tiene una "era" para mostrar contexto.
   ---------------------------------------------------------- */
const ALL_CASES = [

  /* ════════════════════════════════════════════════════════
     MODERNOS — 2023/2024
     ════════════════════════════════════════════════════════ */
  {
    id: "gamer-moderno",
    era: "moderno",
    eraLabel: "2024",
    icon: "🎮",
    title: "Jugador competitivo",
    desc: "Juega Valorant, CS2 y Fortnite a nivel competitivo. Necesita los FPS más altos y estables posibles, con la menor latencia en cada partida.",
    intel: "i5-14600k",
    amd: "ryzen5-9600x",
    why: {
      intel: "El i5-14600K alcanza picos de frecuencia muy altos, lo que se traduce en FPS elevados y consistentes en shooters competitivos. En gaming 1080p/1440p, la potencia por núcleo pesa más que la cantidad total de núcleos.",
      amd: "El Ryzen 5 9600X (Zen 5) entrega una frecuencia muy alta para su consumo de apenas 65W. Para gaming competitivo donde no se necesitan 14+ núcleos, ofrece excelente rendimiento por núcleo con menor calor, ideal para sesiones largas."
    },
    edu: [
      { tag: "Frecuencia", text: "En gaming competitivo, la frecuencia de reloj por núcleo es el factor más importante para los FPS, ya que los motores de juego dependen de pocos hilos muy rápidos." },
      { tag: "Núcleos vs. Hilos", text: "Un shooter competitivo no necesita 20 núcleos: usa unos pocos a máxima velocidad. Más núcleos de los que el juego aprovecha no mejoran los FPS." },
      { tag: "Caché", text: "Una caché L3 rápida reduce el tiempo que el procesador espera datos de la RAM, ayudando a evitar los 'stutters' (caídas bruscas de framerate)." }
    ]
  },
  {
    id: "programador-moderno",
    era: "moderno",
    eraLabel: "2024",
    icon: "💻",
    title: "Programador y estudiante de informática",
    desc: "Compila proyectos, corre máquinas virtuales, contenedores Docker, IDEs pesados y navegadores con decenas de pestañas simultáneas.",
    intel: "i7-14700k",
    amd: "ryzen7-9700x",
    why: {
      intel: "El i7-14700K combina P-cores (alto rendimiento para compilar) con E-cores (para tareas de fondo como el IDE o el navegador). Ideal para multitarea pesada típica de un estudiante de informática.",
      amd: "El Ryzen 7 9700X ofrece 8 núcleos reales todos de alto rendimiento, sin diferenciar entre tipos. Esto simplifica el trabajo del sistema operativo y da rendimiento muy parejo al compilar, virtualizar y correr contenedores."
    },
    edu: [
      { tag: "Multitarea", text: "Compilar con un IDE, navegador y VM abiertos es multitarea real: el SO reparte procesos entre núcleos para que ninguna tarea bloquee a las demás." },
      { tag: "Hilos", text: "Los compiladores modernos paralelizan la compilación en varios hilos. Más hilos disponibles = más partes del código compiladas simultáneamente." },
      { tag: "Rendimiento sostenido", text: "Para programación, el rendimiento continuo en cargas multinúcleo importa más que el pico de frecuencia en un solo núcleo." }
    ]
  },
  {
    id: "editor-moderno",
    era: "moderno",
    eraLabel: "2024",
    icon: "🎬",
    title: "Editor de video 4K",
    desc: "Edita video 4K en DaVinci Resolve, aplica efectos, renderiza proyectos largos y transmite en vivo mientras edita.",
    intel: "i7-14700k",
    amd: "ryzen9-9950x",
    why: {
      intel: "El i7-14700K tiene soporte de Quick Sync para acelerar la codificación de video, más un balance entre P-cores (render) y E-cores (streaming en fondo). Muy versátil para el flujo de trabajo de un creador de contenido.",
      amd: "El Ryzen 9 9950X con 16 núcleos y 32 hilos reales es ideal para renderizado de video: divide el trabajo de procesar fotogramas entre todos sus núcleos, reduciendo significativamente el tiempo de render final."
    },
    edu: [
      { tag: "Núcleos", text: "El renderizado de video es una tarea 'paralelizable': el procesador divide el trabajo de procesar fotogramas entre sus núcleos. Cuantos más núcleos, más rápido termina." },
      { tag: "Caché", text: "Trabajar con video 4K exige mover grandes volúmenes de datos. Una caché grande reduce los accesos a RAM y agiliza la reproducción en tiempo real." },
      { tag: "Rendimiento", text: "En edición, el rendimiento se mide en tiempo de render, no en FPS de videojuego." }
    ]
  },
  {
    id: "oficina-moderno",
    era: "moderno",
    eraLabel: "2024",
    icon: "📊",
    title: "Usuario de oficina",
    desc: "Usa planillas de cálculo, procesador de texto, videollamadas, correo y navegación web. Tareas cotidianas sin exigencias extremas.",
    intel: "i5-14600k",
    amd: "ryzen5-9600x",
    why: {
      intel: "Para oficina, el i5-14600K es más que suficiente: arranque rápido, múltiples pestañas y videollamadas sin cuellos de botella, con margen de crecimiento para el futuro.",
      amd: "El Ryzen 5 9600X es la opción más eficiente: solo 65W de consumo, poco calor, y rendimiento de sobra para cualquier tarea de oficina sin gastar de más en un procesador sobredimensionado."
    },
    edu: [
      { tag: "Eficiencia energética", text: "Para tareas livianas, un procesador de bajo TDP (como el Ryzen 5 con 65W) consume menos electricidad y genera menos calor, sin sacrificar fluidez." },
      { tag: "Multitarea liviana", text: "Videollamada + planilla + navegador es multitarea, pero exige muchos menos recursos que renderizar video o compilar software." },
      { tag: "Frecuencia", text: "Para que la interfaz se sienta fluida al abrir programas y cambiar ventanas, alcanza una frecuencia moderada-alta sin necesitar el tope de gama." }
    ]
  },
  {
    id: "diseno3d-moderno",
    era: "moderno",
    eraLabel: "2024",
    icon: "🧊",
    title: "Diseñador 3D y renderizado",
    desc: "Modela en Blender, aplica simulaciones físicas y renderiza escenas complejas con millones de polígonos e iluminación realista.",
    intel: "i9-14900k",
    amd: "ryzen9-9950x",
    why: {
      intel: "El i9-14900K con 24 núcleos y frecuencias altísimas acelera tanto el render final (usa todos los núcleos) como la navegación interactiva en el viewport de Blender (depende de pocos núcleos muy rápidos).",
      amd: "El Ryzen 9 9950X con 16 núcleos reales y 32 hilos está entre los mejores para renderizado 3D profesional, donde cada núcleo extra reduce directamente el tiempo de render de una escena compleja."
    },
    edu: [
      { tag: "Núcleos", text: "El renderizado 3D (ray tracing) es la carga más paralelizable que existe: el procesador divide la imagen en miles de cálculos de luz que se reparten entre todos sus núcleos." },
      { tag: "Hilos", text: "Con Hyperthreading/SMT, cada núcleo físico atiende dos hilos. En software de render bien optimizado, esto se traduce en un aumento real del rendimiento." },
      { tag: "Caché", text: "Escenas 3D complejas manejan enormes datos de geometría y texturas. Una caché grande evita que el procesador espere a la RAM, mejorando el rendimiento sostenido." }
    ]
  },

  /* ════════════════════════════════════════════════════════
     ERA INTERMEDIA — 2015/2020
     ════════════════════════════════════════════════════════ */
  {
    id: "gamer-2018",
    era: "intermedio",
    eraLabel: "2018",
    icon: "🕹️",
    title: "Gamer — era Coffee Lake",
    desc: "Año 2018. Los jugadores debaten entre el nuevo i7-8700K de Intel y el Ryzen 5 2600 de AMD, que recién lanzó su arquitectura Zen+ con una relación precio-rendimiento explosiva.",
    intel: "i7-8700k",
    amd: "ryzen5-2600",
    why: {
      intel: "En 2018, el i7-8700K era el rey del gaming: 6 núcleos con la frecuencia más alta del mercado y un IPC (instrucciones por ciclo) superior al de AMD. Para juegos de la época era prácticamente imbatible en FPS.",
      amd: "El Ryzen 5 2600 fue una revolución: 6 núcleos con Hyperthreading (12 hilos) a un precio mucho menor. No lideraba en gaming puro, pero para quien también quería usar la PC para programar o streamear, la relación precio-rendimiento era claramente superior."
    },
    edu: [
      { tag: "IPC", text: "El IPC (instrucciones por ciclo) mide cuánto trabajo real hace el procesador en cada tick de reloj. En 2018, Intel lideraba en IPC, lo que compensaba tener menos núcleos en juegos." },
      { tag: "Relación precio-rendimiento", text: "El Ryzen 5 2600 demostró que AMD podía competir seriamente. El concepto de 'value' (rendimiento por cada peso gastado) se volvió central en la elección de hardware." },
      { tag: "Multihilo en gaming", text: "En 2018 los juegos empezaban a aprovechar 6+ hilos. El Ryzen, con 12 hilos, era más 'a prueba de futuro' que el i5 de la época que solo tenía 6 hilos sin Hyperthreading." }
    ]
  },
  {
    id: "streaming-2019",
    era: "intermedio",
    eraLabel: "2019",
    icon: "📡",
    title: "Streamer en Twitch",
    desc: "Año 2019. Un streamer quiere jugar y transmitir en vivo al mismo tiempo desde una sola PC, sin cortar ni perder calidad de imagen.",
    intel: "i9-9900k",
    amd: "ryzen9-3900x",
    why: {
      intel: "El i9-9900K era el procesador más rápido del mercado en 2019 en gaming, con 8 núcleos a hasta 5.0 GHz. Podía correr el juego y el encoder de streaming en paralelo sin problemas.",
      amd: "El Ryzen 9 3900X fue una bomba: 12 núcleos y 24 hilos a un precio razonable. Para streaming, tener más núcleos dedicados al encoder de video (x264/x265) mejora directamente la calidad de la transmisión sin robarle rendimiento al juego."
    },
    edu: [
      { tag: "Paralelismo", text: "Streamear mientras jugás divide la carga entre el juego (monohilo principalmente) y el encoder de video (altamente paralelo). Un procesador con más núcleos puede repartir mejor esa carga." },
      { tag: "Hilos", text: "El encoder de video x264 en máxima calidad puede usar decenas de hilos. El Ryzen 9 3900X con 24 hilos le daba más recursos al encoder que cualquier Intel de la época." },
      { tag: "Frecuencia", text: "El i9-9900K con 5.0 GHz mantenía el juego más fluido en el núcleo principal, mientras los núcleos restantes atendían el streaming." }
    ]
  },
  {
    id: "workstation-2020",
    era: "intermedio",
    eraLabel: "2020",
    icon: "🖥️",
    title: "Workstation para ciencia de datos",
    desc: "Año 2020. Un investigador necesita procesar grandes datasets en Python (pandas, numpy), entrenar modelos de machine learning y correr notebooks de Jupyter.",
    intel: "i9-9900k",
    amd: "ryzen9-3900x",
    why: {
      intel: "El i9-9900K ofrecía excelente rendimiento en tareas de Python de un solo hilo, como la manipulación de dataframes en pandas, donde la frecuencia alta marca la diferencia.",
      amd: "El Ryzen 9 3900X con 12 núcleos era superior para entrenar modelos que se paralelizaban con scikit-learn o para compilar librerías como TensorFlow, donde se aprovechan todos los núcleos disponibles."
    },
    edu: [
      { tag: "Paralelismo en ciencia de datos", text: "Muchas operaciones de machine learning son paralelizables: el entrenamiento puede repartirse entre núcleos, por lo que más núcleos reduce el tiempo de entrenamiento." },
      { tag: "Rendimiento monohilo", text: "Tareas como manipular un dataframe grande en pandas a veces se ejecutan en un solo hilo, donde la frecuencia del procesador es el factor limitante." },
      { tag: "Multitarea", text: "Un científico de datos suele tener Jupyter, un navegador, y un script corriendo al mismo tiempo. Más núcleos permite que ninguna tarea 'congele' al sistema." }
    ]
  },
  {
    id: "gaming-budget-2018",
    era: "intermedio",
    eraLabel: "2017-2018",
    icon: "💰",
    title: "Gaming con presupuesto ajustado",
    desc: "Año 2017-2018. Presupuesto limitado. El objetivo es armar la mejor PC gamer posible gastando lo menos posible, jugando títulos como GTA V, CS:GO y Overwatch.",
    intel: "i5-8600k",
    amd: "ryzen5-2600",
    why: {
      intel: "El i5-8600K (Coffee Lake) tenía 6 núcleos con una frecuencia excelente para gaming, superando al Ryzen 5 en FPS en la mayoría de los juegos de la época. Era la opción si el objetivo principal era jugar.",
      amd: "El Ryzen 5 2600 era más barato, incluía cooler en la caja, y sus 12 hilos lo hacían más versátil. Para gaming con presupuesto ajustado donde también se usaba la PC para estudiar o trabajar, era difícil de superar en relación precio-rendimiento."
    },
    edu: [
      { tag: "Costo total de propiedad", text: "El Ryzen incluía cooler, mientras que el i5-8600K no (necesitaba refrigeración aftermarket). El costo final de la plataforma completa a veces invertía la ventaja inicial de precio." },
      { tag: "Overclocking", text: "Ambos procesadores eran desbloqueados (terminan en K/X), es decir, se podía subir su frecuencia manualmente para exprimir más rendimiento, lo cual era muy común en esta época entre los entusiastas." },
      { tag: "Uso mixto", text: "Un procesador con más hilos es más 'futureproof': los juegos lanzados años después aprovechan más hilos que los de 2018, lo que puede extender la vida útil de la PC." }
    ]
  },

  /* ════════════════════════════════════════════════════════
     ERA HISTÓRICA — 2010/2015
     ════════════════════════════════════════════════════════ */
  {
    id: "gamer-2011",
    era: "historico",
    eraLabel: "2011",
    icon: "👾",
    title: "Gaming — era Sandy Bridge",
    desc: "Año 2011. El Intel Core i7-2600K acaba de salir y es aclamado como el mejor procesador para gaming de la historia hasta ese momento. AMD responde con el FX-8350 de arquitectura Bulldozer.",
    intel: "i7-2600k",
    amd: "fx-8350",
    why: {
      intel: "El i7-2600K (Sandy Bridge) fue un salto generacional: excelente IPC, 4 núcleos con Hyperthreading, overclock brutal hasta 4.5-5.0 GHz con refrigeración líquida. Dominó los benchmarks de gaming durante años.",
      amd: "El FX-8350 tenía 8 módulos Bulldozer pero con una arquitectura muy diferente: cada módulo compartía recursos entre dos hilos, haciendo que sus '8 núcleos' no fueran equivalentes a los de Intel. En gaming, perdía frente al i7-2600K, pero en cargas multihilo muy específicas podía competir."
    },
    edu: [
      { tag: "Arquitectura Bulldozer", text: "AMD Bulldozer usaba 'módulos' en vez de núcleos independientes: cada módulo compartía la ALU de punto flotante entre dos hilos. Esto lo hacía eficiente en papel pero menos potente en práctica para gaming." },
      { tag: "IPC histórico", text: "Sandy Bridge fue un hito de Intel: mejoró el IPC (instrucciones por ciclo) en un ~10-15% respecto a la generación anterior. AMD no pudo igualar ese IPC hasta años después con Zen (2017)." },
      { tag: "Overclocking", text: "El i7-2600K se hizo legendario por su overclock: muchos lo corrían a 4.5-5.0 GHz con aire o agua, algo inusual para la época." }
    ]
  },
  {
    id: "multimedia-2013",
    era: "historico",
    eraLabel: "2013-2014",
    icon: "🎵",
    title: "PC multimedia y edición de fotos",
    desc: "Año 2013-2014. Un fotógrafo aficionado quiere editar fotos en Lightroom y Photoshop, escuchar música y ver videos en alta definición. Presupuesto medio.",
    intel: "i5-4690k",
    amd: "a10-7850k",
    why: {
      intel: "El i5-4690K (Haswell) ofrecía excelente rendimiento en Lightroom y Photoshop, que en 2013 dependían principalmente de pocos núcleos rápidos. La latencia baja y el IPC superior de Intel se notaban en la fluidez al aplicar filtros y exportar.",
      amd: "El A10-7850K era una APU: procesador + gráficos integrados mucho más potentes que los de Intel. Para un usuario multimedia sin GPU dedicada, la ventaja gráfica de AMD permitía ver video 4K fluido y hasta jugar títulos livianos sin tarjeta de video adicional."
    },
    edu: [
      { tag: "APU (Accelerated Processing Unit)", text: "AMD introdujo las APU: chips que integran CPU y GPU en un mismo dado de silicio. Para usuarios sin tarjeta gráfica dedicada, la GPU integrada de AMD era notablemente superior a la de Intel en esa época." },
      { tag: "Uso de GPU en edición", text: "Programas como Lightroom empezaron a usar la GPU para acelerar el procesado de imágenes. Una GPU integrada más potente (AMD) podía dar ventaja en este uso específico." },
      { tag: "Eficiencia por caso de uso", text: "No siempre gana el procesador más rápido en bruto: para este usuario, la GPU integrada superior de AMD era más relevante que el mayor IPC de Intel." }
    ]
  },
  {
    id: "servidor-2014",
    era: "historico",
    eraLabel: "2014-2015",
    icon: "🗄️",
    title: "Servidor casero y NAS",
    desc: "Año 2014-2015. Un entusiasta quiere armar un servidor en casa para almacenar archivos, correr una máquina virtual de Linux y hacer torrents 24/7.",
    intel: "i7-4770k",
    amd: "fx-6300",
    why: {
      intel: "El i7-4770K con 4 núcleos y 8 hilos era excelente para virtualización: Intel VT-x estaba bien soportado y el bajo consumo en idle (el servidor está encendido todo el día) ayudaba a reducir la factura de luz.",
      amd: "El FX-6300 era notablemente más barato y ofrecía 6 módulos para manejar múltiples procesos del servidor simultáneamente. Para un servidor casero donde el presupuesto importa, era una opción viable aunque con mayor consumo en idle."
    },
    edu: [
      { tag: "Virtualización", text: "Para correr máquinas virtuales, el procesador necesita soporte de virtualización por hardware (Intel VT-x / AMD-V). Ambos lo tenían, pero Intel tenía mejor ecosistema de soporte en 2014." },
      { tag: "Consumo en idle", text: "Un servidor casero está encendido 24/7. El consumo eléctrico en reposo (idle) se acumula en la factura de luz. El i7-4770K consumía menos en idle que el FX-6300." },
      { tag: "Relación costo-uso", text: "Para un NAS casero que mayormente está esperando requests, no necesitás el procesador más rápido: conviene priorizar bajo consumo y suficientes hilos para las VMs." }
    ]
  }
];

/* ----------------------------------------------------------
   3) FUNCIÓN DE SORTEO
   Selecciona 5 casos al azar del banco completo,
   garantizando que siempre haya al menos 1 moderno.
   ---------------------------------------------------------- */
function pickRandomCases(count = 5) {
  // Separar por era
  const modernos    = ALL_CASES.filter(c => c.era === "moderno");
  const resto       = ALL_CASES.filter(c => c.era !== "moderno");

  // Asegurar al menos 1 moderno para que siempre haya contexto actual
  const shuffledModernos = [...modernos].sort(() => Math.random() - 0.5);
  const shuffledResto    = [...resto].sort(() => Math.random() - 0.5);

  // Tomamos 1 moderno fijo + llenamos el resto aleatoriamente del pool completo
  const pool    = [...shuffledModernos.slice(1), ...shuffledResto].sort(() => Math.random() - 0.5);
  const picked  = [shuffledModernos[0], ...pool.slice(0, count - 1)];

  // Mezclar los 5 elegidos para que el moderno no siempre sea el primero
  return picked.sort(() => Math.random() - 0.5);
}

// CASES es el array que usa el resto de la app (se genera al cargar la página)
const CASES = pickRandomCases(5);

/* ----------------------------------------------------------
   4) PERFILES DE RESULTADO FINAL
   ---------------------------------------------------------- */
const PROFILES = {
  intelStrong: {
    title: "Priorizás el rendimiento en pico y la frecuencia",
    desc: "Tus elecciones muestran preferencia por procesadores con frecuencias muy altas y gran potencia por núcleo. Es un perfil típico de quien prioriza la respuesta inmediata: gaming competitivo, aplicaciones que dependen de pocos hilos muy rápidos, y tareas donde la latencia importa más que la cantidad bruta de núcleos."
  },
  amdStrong: {
    title: "Priorizás la productividad y la multitarea",
    desc: "Tus elecciones muestran preferencia por procesadores con muchos núcleos e hilos trabajando en paralelo. Es un perfil típico de quien prioriza tareas que se benefician de la paralelización: renderizado, compilación, edición de video y cargas de trabajo profesionales sostenidas en el tiempo."
  },
  balanced: {
    title: "Tenés un perfil equilibrado y versátil",
    desc: "Tus elecciones están repartidas entre ambas marcas. Esto indica que evaluás cada escenario por separado: elegís frecuencia alta cuando el caso lo pide y más núcleos cuando la tarea se beneficia de la paralelización. Es la mirada más realista a la hora de armar una PC."
  }
};

/* ----------------------------------------------------------
   5) CICLO DEL MICROPROCESADOR (sección bonus)
   ---------------------------------------------------------- */
const CYCLE_STEPS = [
  {
    node: "nodeFetch",
    title: "FETCH — Obtención de la instrucción",
    text: "La Unidad de Control busca en la memoria RAM la siguiente instrucción a ejecutar, usando la dirección almacenada en el Contador de Programa (PC), y la trae hasta el procesador para poder trabajar con ella."
  },
  {
    node: "nodeDecode",
    title: "DECODE — Decodificación",
    text: "La instrucción binaria que llegó desde la memoria se traduce a un formato que las distintas unidades del procesador pueden entender: qué operación hay que hacer (sumar, comparar, mover datos) y con qué datos u operandos."
  },
  {
    node: "nodeExecute",
    title: "EXECUTE — Ejecución",
    text: "La Unidad Aritmético-Lógica (ALU) u otra unidad de ejecución realiza la operación indicada: una suma, una comparación, un salto, etc. Es el paso donde realmente 'sucede' el cómputo."
  },
  {
    node: "nodeWriteback",
    title: "WRITE BACK — Almacenamiento del resultado",
    text: "El resultado obtenido se guarda de vuelta, ya sea en un registro interno del procesador o en la memoria RAM, dejando todo listo para que el Contador de Programa avance y el ciclo vuelva a empezar con la siguiente instrucción."
  }
];
