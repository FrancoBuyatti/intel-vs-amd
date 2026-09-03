/* ============================================================
   data.js
   Datos simulados de la aplicación: casos prácticos, specs de
   procesadores, contenido educativo y perfiles de resultado final.
   Todo el contenido es estático y vive en el cliente (sin backend).
   ============================================================ */

/* ----------------------------------------------------------
   1) ESPECIFICACIONES DE PROCESADORES
   Datos aproximados con fines educativos / de exposición.
   ---------------------------------------------------------- */
const CPU_SPECS = {
  "i5-14600k": {
    brand: "intel",
    name: "Intel Core i5-14600K",
    icon: "🔷",
    cores: "14 núcleos (6P + 8E)",
    threads: "20 hilos",
    freq: "5.3 GHz",
    cache: "24 MB",
    tdp: "125 W",
    socket: "LGA1700"
  },
  "i7-14700k": {
    brand: "intel",
    name: "Intel Core i7-14700K",
    icon: "🔷",
    cores: "20 núcleos (8P + 12E)",
    threads: "28 hilos",
    freq: "5.6 GHz",
    cache: "33 MB",
    tdp: "125 W",
    socket: "LGA1700"
  },
  "i9-14900k": {
    brand: "intel",
    name: "Intel Core i9-14900K",
    icon: "🔷",
    cores: "24 núcleos (8P + 16E)",
    threads: "32 hilos",
    freq: "6.0 GHz",
    cache: "36 MB",
    tdp: "125 W",
    socket: "LGA1700"
  },
  "ryzen5-9600x": {
    brand: "amd",
    name: "AMD Ryzen 5 9600X",
    icon: "🔶",
    cores: "6 núcleos",
    threads: "12 hilos",
    freq: "5.4 GHz",
    cache: "38 MB",
    tdp: "65 W",
    socket: "AM5"
  },
  "ryzen7-9700x": {
    brand: "amd",
    name: "AMD Ryzen 7 9700X",
    icon: "🔶",
    cores: "8 núcleos",
    threads: "16 hilos",
    freq: "5.5 GHz",
    cache: "40 MB",
    tdp: "65 W",
    socket: "AM5"
  },
  "ryzen9-9950x": {
    brand: "amd",
    name: "AMD Ryzen 9 9950X",
    icon: "🔶",
    cores: "16 núcleos",
    threads: "32 hilos",
    freq: "5.7 GHz",
    cache: "80 MB",
    tdp: "170 W",
    socket: "AM5"
  }
};

/* ----------------------------------------------------------
   2) CASOS PRÁCTICOS (5 escenarios)
   Cada caso enfrenta un procesador Intel contra uno AMD.
   ---------------------------------------------------------- */
const CASES = [
  {
    id: "gamer",
    icon: "🎮",
    title: "Jugador competitivo",
    desc: "Juega Valorant, CS2 y Fortnite a nivel competitivo. Necesita los FPS más altos y estables posibles, con la menor latencia (input lag) en cada partida.",
    intel: "i5-14600k",
    amd: "ryzen5-9600x",
    why: {
      intel: "En juegos competitivos a resoluciones 1080p/1440p, lo que más pesa es la frecuencia por núcleo y la potencia en monohilo, no la cantidad total de núcleos. El i5-14600K alcanza picos muy altos de reloj, lo que se traduce en FPS elevados y consistentes en shooters competitivos.",
      amd: "El Ryzen 5 9600X usa la arquitectura Zen 5, eficiente y con una frecuencia muy alta para su consumo (apenas 65W de TDP). Para juegos competitivos donde no se necesitan 14+ núcleos, ofrece excelente rendimiento por núcleo con menor consumo y calor, ideal para mantener el sistema estable en sesiones largas de torneo."
    },
    edu: [
      { tag: "Frecuencia", text: "En gaming, lo que más impacta los FPS es la frecuencia de reloj (GHz) por núcleo, ya que la mayoría de los motores de juego dependen fuertemente de pocos hilos muy rápidos, más que de tener decenas de núcleos." },
      { tag: "Núcleos vs. Hilos", text: "Un juego competitivo no necesita 20 núcleos: usa unos pocos núcleos a máxima velocidad. Tener más núcleos de los que el juego puede aprovechar no mejora los FPS." },
      { tag: "Caché", text: "Una caché L2/L3 rápida reduce el tiempo que el procesador espera datos de la RAM, lo cual ayuda a mantener el framerate estable y evitar caídas bruscas de FPS (los famosos 'stutters')." }
    ]
  },
  {
    id: "programador",
    icon: "💻",
    title: "Programador y estudiante de informática",
    desc: "Compila proyectos, corre máquinas virtuales, contenedores Docker, IDEs pesados y navegadores con decenas de pestañas abiertas al mismo tiempo.",
    intel: "i7-14700k",
    amd: "ryzen7-9700x",
    why: {
      intel: "El i7-14700K combina núcleos de rendimiento (P-cores) para tareas exigentes como compilar código, con núcleos eficientes (E-cores) que se encargan de procesos en segundo plano (IDE, navegador, antivirus). Esta combinación es ideal para multitarea pesada típica de un estudiante de informática.",
      amd: "El Ryzen 7 9700X ofrece 8 núcleos reales con Hyperthreading (16 hilos), todos de alto rendimiento, sin diferenciar entre núcleos 'grandes' y 'chicos'. Esto simplifica el trabajo del sistema operativo al repartir tareas y da un rendimiento muy parejo al compilar, virtualizar y correr contenedores simultáneamente."
    },
    edu: [
      { tag: "Multitarea", text: "Compilar mientras tenés un IDE, un navegador y una máquina virtual abiertos es un escenario real de multitarea: el sistema operativo reparte procesos entre los núcleos disponibles para que ninguna tarea bloquee a las demás." },
      { tag: "Hilos (Threads)", text: "Compiladores modernos pueden paralelizar el proceso de compilación en varios hilos a la vez. Más hilos disponibles significa que más partes del código se compilan en simultáneo, reduciendo el tiempo total." },
      { tag: "Rendimiento", text: "Para programación, el rendimiento 'sostenido' en cargas multinúcleo importa más que el pico de frecuencia en un solo núcleo, a diferencia del caso del gamer." }
    ]
  },
  {
    id: "editor",
    icon: "🎬",
    title: "Editor de video y creador de contenido",
    desc: "Edita video 4K en Premiere o DaVinci Resolve, aplica efectos, renderiza proyectos largos y transmite en vivo mientras edita.",
    intel: "i7-14700k",
    amd: "ryzen9-9950x",
    why: {
      intel: "El i7-14700K tiene buen soporte de tecnologías de aceleración (Quick Sync) que ayudan a decodificar y codificar video más rápido en ciertos software, además de un excelente balance entre núcleos de rendimiento para el renderizado final y núcleos eficientes para tareas de fondo como el streaming.",
      amd: "El Ryzen 9 9950X tiene 16 núcleos y 32 hilos reales, ideal para renderizado de video, que es una tarea que se beneficia muchísimo de tener muchos núcleos trabajando en paralelo sobre distintos fotogramas del proyecto al mismo tiempo."
    },
    edu: [
      { tag: "Núcleos", text: "El renderizado de video es una tarea 'paralelizable': el procesador puede dividir el trabajo de procesar miles de fotogramas entre todos sus núcleos disponibles. Cuantos más núcleos, más rápido se completa el render." },
      { tag: "Caché", text: "Trabajar con archivos de video 4K en la línea de tiempo exige mover grandes cantidades de datos constantemente. Una caché grande reduce los accesos a la RAM y agiliza la reproducción en tiempo real durante la edición." },
      { tag: "Rendimiento", text: "Acá el rendimiento se mide en 'tiempo de render': cuántos minutos tarda en procesarse un proyecto completo, no en FPS como en los juegos." }
    ]
  },
  {
    id: "oficina",
    icon: "📊",
    title: "Usuario de oficina y navegación web",
    desc: "Usa planillas de cálculo, procesador de texto, videollamadas, correo electrónico y navegación web con varias pestañas. No realiza tareas muy exigentes.",
    intel: "i5-14600k",
    amd: "ryzen5-9600x",
    why: {
      intel: "Para tareas de oficina, el i5-14600K es más potencia de la necesaria, pero garantiza una experiencia fluida sin cuellos de botella: arranque rápido, múltiples pestañas y videollamadas simultáneas sin esfuerzo, con margen para crecer a futuro.",
      amd: "El Ryzen 5 9600X es una opción muy eficiente para uso de oficina: bajo consumo (65W), poco calor, y rendimiento de sobra para planillas, documentos, navegación y videollamadas, sin gastar de más en un procesador sobredimensionado para la tarea."
    },
    edu: [
      { tag: "Rendimiento", text: "No toda tarea necesita el procesador más potente del mercado. Elegir según el uso real evita gastar de más en hardware que nunca se va a aprovechar al máximo." },
      { tag: "Multitarea", text: "Una videollamada + una planilla + el navegador abierto siguen siendo varios procesos corriendo a la vez, pero exigen muchos menos recursos que renderizar video o compilar software." },
      { tag: "Frecuencia", text: "Para que la interfaz se sienta 'fluida' (sin trabas al abrir programas o cambiar de ventana), alcanza con una frecuencia moderada-alta, sin necesidad del procesador tope de gama." }
    ]
  },
  {
    id: "diseno3d",
    icon: "🧊",
    title: "Diseñador 3D y renderizado",
    desc: "Modela en Blender o 3ds Max, aplica simulaciones físicas y renderiza escenas complejas con millones de polígonos e iluminación realista.",
    intel: "i9-14900k",
    amd: "ryzen9-9950x",
    why: {
      intel: "El i9-14900K alcanza las frecuencias más altas de su gama y suma 24 núcleos en total, lo que acelera tanto el renderizado final (que usa todos los núcleos) como el modelado interactivo en el viewport (que depende de pocos núcleos muy rápidos).",
      amd: "El Ryzen 9 9950X, con 16 núcleos reales y 32 hilos, está entre los mejores procesadores de escritorio para cargas de trabajo profesionales paralelas como el renderizado 3D, donde cada núcleo extra reduce directamente el tiempo de render de una escena."
    },
    edu: [
      { tag: "Núcleos", text: "El renderizado 3D (ray tracing, path tracing) es de las cargas más paralelizables que existen: el procesador divide la imagen final en miles de pequeños cálculos de luz que se reparten entre todos los núcleos disponibles." },
      { tag: "Hilos", text: "Con Hyperthreading/SMT, cada núcleo físico puede atender dos hilos de ejecución, lo que en software de renderizado bien optimizado se traduce en un aumento real del rendimiento total." },
      { tag: "Caché y Rendimiento", text: "Escenas 3D complejas manejan enormes cantidades de datos de geometría y texturas. Una caché grande evita que el procesador tenga que esperar constantemente a la memoria RAM, mejorando el rendimiento sostenido durante renders largos." }
    ]
  }
];

/* ----------------------------------------------------------
   3) PERFILES DE RESULTADO FINAL
   Se elige según la cantidad de votos Intel vs AMD.
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
    desc: "Tus elecciones están repartidas entre ambas marcas. Esto indica que evaluás cada escenario por separado en lugar de tener una preferencia fija: elegís frecuencia alta cuando el caso lo pide (gaming) y más núcleos cuando la tarea se beneficia de la paralelización (render, compilación). Es la mirada más realista a la hora de armar una PC."
  }
};

/* ----------------------------------------------------------
   4) CICLO DEL MICROPROCESADOR (sección bonus)
   FETCH -> DECODE -> EXECUTE -> WRITE BACK
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
