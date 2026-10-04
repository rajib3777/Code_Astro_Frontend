import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Cpu, Terminal, Layers, Globe, Database, Smartphone, Zap, CheckCircle2 } from 'lucide-react'

// Category Filter Tabs
const TECH_CATEGORIES = [
  { id: 'core', label: '⭐ Core Technologies', icon: Zap },
  { id: 'backend', label: '⚙️ Backend & API', icon: Terminal },
  { id: 'frontend', label: '🌐 Frontend & UI', icon: Cpu },
  { id: 'cloud', label: '☁️ Cloud & Data', icon: Globe },
  { id: 'mobile', label: '📱 Mobile & Systems', icon: Smartphone },
  { id: 'all', label: '📋 All Stack (20)', icon: Layers },
]

// Exact Authentic Official Brand SVG Logos
const TECH_LOGOS: Record<string, (color: string) => React.ReactNode> = {
  'Laravel': (c) => (
    <svg viewBox="0 0 24 24" fill={c} width="28" height="28">
      <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033l.038.027c.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z" />
    </svg>
  ),
  'PHP': (c) => (
    <svg viewBox="0 0 24 24" fill={c} width="28" height="28">
      <path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.305.847c-.143.255-.33.49-.561.703zm4.024.715l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.625H9.388l1.23-6.327h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944h-1.389zm7.597-2.265a2.782 2.782 0 0 1-.305.847c-.143.255-.33.49-.561.703a2.44 2.44 0 0 1-.917.551c-.336.108-.765.164-1.286.164h-1.18l-.327 1.682h-1.378l1.23-6.326h2.649c.797 0 1.378.209 1.744.628.366.417.477 1.001.331 1.751zM17.766 10.207h-.943l-.516 2.648h.838c.557 0 .971-.105 1.242-.314.272-.21.455-.559.551-1.049.092-.47.049-.802-.125-.995s-.524-.29-1.047-.29z" />
    </svg>
  ),
  'Java': (c) => (
    <svg viewBox="0 0 24 24" fill={c} width="28" height="28">
      <path d="M11.915 0 11.7.215C9.515 2.4 7.47 6.39 6.046 10.483c-1.064 1.024-3.633 2.81-3.711 3.551-.093.87 1.746 2.611 1.55 3.235-.198.625-1.304 1.408-1.014 1.939.1.188.823.011 1.277-.491a13.389 13.389 0 0 0-.017 2.14c.076.906.27 1.668.643 2.232.372.563.956.911 1.667.911.397 0 .727-.114 1.024-.264.298-.149.571-.33.91-.5.68-.34 1.634-.666 3.53-.604 1.903.062 2.872.39 3.559.704.687.314 1.15.664 1.925.664.767 0 1.395-.336 1.807-.9.412-.563.631-1.33.72-2.24.06-.623.055-1.32 0-2.066.454.45 1.117.604 1.213.424.29-.53-.816-1.314-1.013-1.937-.198-.624 1.642-2.366 1.549-3.236-.08-.748-2.707-2.568-3.748-3.586C16.428 6.374 14.308 2.394 12.13.215zm.175 6.038a2.95 2.95 0 0 1 2.943 2.942 2.95 2.95 0 0 1-2.943 2.943A2.95 2.95 0 0 1 9.148 8.98a2.95 2.95 0 0 1 2.942-2.942zM8.685 7.983a3.515 3.515 0 0 0-.145.997c0 1.951 1.6 3.55 3.55 3.55 1.95 0 3.55-1.598 3.55-3.55 0-.329-.046-.648-.132-.951.334.095.64.208.915.336a42.699 42.699 0 0 1 2.042 5.829c.678 2.545 1.01 4.92.846 6.607-.082.844-.29 1.51-.606 1.94-.315.431-.713.651-1.315.651-.593 0-.932-.27-1.673-.61-.741-.338-1.825-.694-3.792-.758-1.974-.064-3.073.293-3.821.669-.375.188-.659.373-.911.5s-.466.2-.752.2c-.53 0-.876-.209-1.16-.64-.285-.43-.474-1.101-.545-1.948-.141-1.693.176-4.069.823-6.614a43.155 43.155 0 0 1 1.934-5.783c.348-.167.749-.31 1.192-.425zm-3.382 4.362a.216.216 0 0 1 .13.031c-.166.56-.323 1.116-.463 1.665a33.849 33.849 0 0 0-.547 2.555 3.9 3.9 0 0 0-.2-.39c-.58-1.012-.914-1.642-1.16-2.08.315-.24 1.679-1.755 2.24-1.781zm13.394.01c.562.027 1.926 1.543 2.24 1.783-.246.438-.58 1.068-1.16 2.08a4.428 4.428 0 0 0-.163.309 32.354 32.354 0 0 0-.562-2.49 40.579 40.579 0 0 0-.482-1.652.216.216 0 0 1 .127-.03z" />
    </svg>
  ),
  'HTML5': (c) => (
    <svg viewBox="0 0 24 24" fill={c} width="28" height="28">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" />
    </svg>
  ),
  'Python': (c) => (
    <svg viewBox="0 0 24 24" fill={c} width="28" height="28">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
    </svg>
  ),
  'Django': (c) => (
    <svg viewBox="0 0 24 24" fill={c} width="28" height="28">
      <path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.53 3.109-2.625.561-1.121.739-2.421.739-5.835V6.059h3.924zM17.39.021h3.924v4.026H17.39z" />
    </svg>
  ),
  'JavaScript (JS)': (c) => (
    <svg viewBox="0 0 24 24" fill={c} width="28" height="28">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
    </svg>
  ),
  'CSS3': (c) => (
    <svg viewBox="0 0 24 24" fill={c} width="28" height="28">
      <path d="M0 0v20.16A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0Zm14.256 13.08c1.56 0 2.28 1.08 2.304 2.64h-1.608c.024-.288-.048-.6-.144-.84-.096-.192-.288-.264-.552-.264-.456 0-.696.264-.696.84-.024.576.288.888.768 1.08.72.288 1.608.744 1.92 1.296q.432.648.432 1.656c0 1.608-.912 2.592-2.496 2.592-1.656 0-2.4-1.032-2.424-2.688h1.68c0 .792.264 1.176.792 1.176.264 0 .456-.072.552-.24.192-.312.24-1.176-.048-1.512-.312-.408-.912-.6-1.32-.816q-.828-.396-1.224-.936c-.24-.36-.36-.888-.36-1.536 0-1.44.936-2.472 2.424-2.448m5.4 0c1.584 0 2.304 1.08 2.328 2.64h-1.608c0-.288-.048-.6-.168-.84-.096-.192-.264-.264-.528-.264-.48 0-.72.264-.72.84s.288.888.792 1.08c.696.288 1.608.744 1.92 1.296.264.432.408.984.408 1.656.024 1.608-.888 2.592-2.472 2.592-1.68 0-2.424-1.056-2.448-2.688h1.68c0 .744.264 1.176.792 1.176.264 0 .456-.072.552-.24.216-.312.264-1.176-.048-1.512-.288-.408-.888-.6-1.32-.816-.552-.264-.96-.576-1.2-.936s-.36-.888-.36-1.536c-.024-1.44.912-2.472 2.4-2.448m-11.031.018c.711-.006 1.419.198 1.839.63.432.432.672 1.128.648 1.992H9.336c.024-.456-.096-.792-.432-.96-.312-.144-.768-.048-.888.24-.12.264-.192.576-.168.864v3.504c0 .744.264 1.128.768 1.128a.65.65 0 0 0 .552-.264c.168-.24.192-.552.168-.84h1.776c.096 1.632-.984 2.712-2.568 2.688-1.536 0-2.496-.864-2.472-2.472v-4.032c0-.816.24-1.44.696-1.848.432-.408 1.146-.624 1.857-.63" />
    </svg>
  ),
  'C++': (c) => (
    <svg viewBox="0 0 24 24" fill={c} width="28" height="28">
      <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z" />
    </svg>
  ),
  'React & Next.js': (c) => (
    <svg viewBox="0 0 128 128" width="28" height="28" fill={c}>
      <circle cx="64" cy="64" r="11" />
      <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13-1.2-21.6-9.6-26.3-1.9-1.1-4-1.9-6.4-2.5-7.1-1.7-15.4.5-23.7 5.8-8.3-5.3-16.6-7.5-23.7-5.8-2.4.6-4.5 1.4-6.4-2.5-8.4 4.7-11.7 13.3-9.6 26.3.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C13.5 51.6 8 57.5 8 64s5.5 12.4 14.3 15.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13 1.2 21.6 9.6 26.3 1.9 1.1 4 1.9 6.4 2.5 7.2 1.7 15.4-.5 23.7-5.8 8.3 5.3 16.6 7.5 23.7 5.8 2.4-.6 4.5-1.4 6.4-2.5 8.4-4.7 11.7-13.3 9.6-26.3-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 8.8-3.4 14.3-9.3 14.3-15.8s-5.5-12.4-14.3-15.8zM64 44.2c1.7 2.8 3.3 5.6 4.7 8.5-1.5-.1-3.1-.2-4.7-.2-1.6 0-3.2.1-4.7.2 1.4-2.9 3-5.7 4.7-8.5zm0 39.6c-1.7-2.8-3.3-5.6-4.7-8.5 1.5.1 3.1.2 4.7.2 1.6 0 3.2-.1 4.7-.2-1.4 2.9-3 5.7-4.7 8.5z" />
    </svg>
  ),
  'TypeScript': (c) => (
    <svg viewBox="0 0 24 24" fill={c} width="28" height="28">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.71-.246 5.84 5.84 0 0 0-.832-.144 4.1 4.1 0 0 0-.916-.095c-.71 0-1.258.163-1.644.49-.386.326-.58.804-.58 1.433 0 .38.077.697.232.951.154.254.382.474.683.66.3.186.673.359 1.118.519.445.16.948.336 1.51.528.65.228 1.218.497 1.705.807a3.84 3.84 0 0 1 1.18 1.196c.28.487.42 1.096.42 1.826 0 .762-.164 1.442-.492 2.04a4.42 4.42 0 0 1-1.39 1.515 6.01 6.01 0 0 1-2.083.87 9.87 9.87 0 0 1-2.556.315c-.742 0-1.464-.066-2.166-.198a9.42 9.42 0 0 1-1.895-.565v-2.61a6.38 6.38 0 0 0 1.758.75 6.7 6.7 0 0 0 1.954.288c.8 0 1.408-.17 1.824-.51.416-.34.624-.827.624-1.46 0-.376-.082-.693-.246-.951a2.82 2.82 0 0 0-.71-.68 6.64 6.64 0 0 0-1.173-.553c-.463-.167-.988-.344-1.575-.532a6.47 6.47 0 0 1-1.748-.828 3.86 3.86 0 0 1-1.187-1.21 3.52 3.52 0 0 1-.413-1.792c0-.737.164-1.393.492-1.968a4.2 4.2 0 0 1 1.365-1.466 5.67 5.67 0 0 1 2.015-.843c.783-.177 1.62-.266 2.511-.266zm-8.813.25v2.443H7.135V22.25H4.25V12.443H1.734V10z" />
    </svg>
  ),
  'Go (Golang)': (c) => (
    <svg viewBox="0 0 24 24" fill={c} width="28" height="28">
      <path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .058.035.035.07l-.093.28c-.023.047-.07.07-.117.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082zm12.129-2.36c-.736.187-1.239.327-1.963.514-.176.046-.187.058-.34-.117-.174-.199-.303-.327-.548-.444-.737-.362-1.45-.257-2.115.175-.795.514-1.204 1.274-1.192 2.22.011.935.654 1.706 1.577 1.835.795.105 1.46-.175 1.987-.771.105-.129.198-.269.315-.444h-2.21c-.246 0-.304-.152-.222-.35.152-.362.432-.967.596-1.274a.315.315 0 01.292-.187h4.502c-.023.316-.023.631-.07.947a4.983 4.983 0 01-.958 2.29c-.841 1.11-1.94 1.8-3.33 1.986-1.145.152-2.209-.07-3.143-.77-.865-.655-1.356-1.52-1.484-2.595-.152-1.274.222-2.419.993-3.424.83-1.086 1.928-1.776 3.272-2.02 1.098-.2 2.15-.07 3.096.571.62.41 1.063.97 1.356 1.648.07.105.023.164-.117.2zm3.868 6.461c-1.064-.024-2.034-.328-2.852-1.029a3.665 3.665 0 01-1.262-2.255c-.21-1.32.152-2.489.947-3.529.853-1.122 1.881-1.706 3.272-1.95 1.192-.21 2.314-.095 3.33.595.923.63 1.496 1.484 1.648 2.605.198 1.578-.257 2.863-1.344 3.962-.771.783-1.718 1.273-2.805 1.495-.315.06-.631.07-.934.106zm2.78-4.72c-.011-.153-.011-.27-.035-.387-.21-1.157-1.274-1.81-2.384-1.554-1.087.245-1.788 1.11-1.847 2.22-.047.903.538 1.776 1.378 2.045.643.199 1.286.129 1.859-.246.853-.562 1.064-1.39 1.029-2.078z" />
    </svg>
  ),
  'Rust': (c) => (
    <svg viewBox="0 0 128 128" width="28" height="28" fill={c}>
      <path d="M64 8a56 56 0 100 112A56 56 0 0064 8zm0 6a50 50 0 110 100A50 50 0 0164 14zm-1.75 8.41l-3.08 6.05-9.76-4.33-1.08 6.87-10.5.77-.02 6.94-9.9 3.23 2.07 6.73-8.29 5.56 3.95 5.67-5.77 7.48 5.55 4.03-2.86 8.68 6.54 1.87-.38 9.08 6.73.38 2.4 8.78 6.45-1.53 5.32 7.54 5.73-3.43 7.7 5.9 4.68-5.16 9.03 3.8 2.96-6.25 9.76 1.4.94-6.79 9.76-1.4.94 6.79 9.03-3.8 2.96 6.25 4.68-5.16 7.7 5.9 5.73-3.43 5.32 7.54 6.45-1.53 2.4-8.78 6.73-.38-.38-9.08 6.54-1.87-2.86-8.68 5.55-4.03-5.77-7.48 3.95-5.67-8.29-5.56 2.07-6.73-9.9-3.23-.02-6.94-10.5-.77-1.08-6.87-9.76 4.33-3.08-6.05L64 22.41zM64 36a28 28 0 110 56 28 28 0 010-56zm0 6a22 22 0 100 44 22 22 0 000-44z" />
    </svg>
  ),
  'PostgreSQL & TimescaleDB': (c) => (
    <svg viewBox="0 0 128 128" width="28" height="28" fill={c}>
      <path d="M93.8 92.1c.8-6.5.6-7.5 5.4-6.4l1.2.1c3.7.2 8.6-.6 11.5-1.9 6.2-2.9 9.9-7.7 3.8-6.4-13.9 2.9-14.9-1.8-14.9-1.8 14.7-21.8 20.8-49.5 15.5-56.3C96.3 1 71.3 9.7 70.9 9.9l-.1.1c-2.8-.6-5.8-.9-9.3-.9-6.1 0-10.7 1.6-14.3 4.2-4.3-.6-13.8-3-23 1.6-5.8 3-8.6 8.2-9.1 15.1-4.8 10.5-2.2 29.5 7.6 43.6 6.2 9 13 13.9 20 13.3 2.8-.2 4.7-1 6.4-1.6 2.1-.8 4-1.5 7.8-1.5 3.7 0 5.4.7 7.6 1.6 1.8.7 3.8 1.6 6.9 1.8 7.2.6 14.2-4.5 20.3-13.5z" />
    </svg>
  ),
  'Kubernetes (K8s)': (c) => (
    <svg viewBox="0 0 128 128" width="28" height="28" fill={c}>
      <path d="M64 8C33.1 8 8 33.1 8 64s25.1 56 56 56 56-25.1 56-56S94.9 8 64 8zm0 6c27.6 0 50 22.4 50 50s-22.4 50-50 50S14 91.6 14 64 36.4 14 64 14zm-1 16v8.3l-13.5 7.8-6.8-3.9-6.2 4.8 6.8 3.9.5 17.1-6.8 3.9 6.2 4.8 6.8-3.9L63 76.5V84h2v-7.5l13.5-7.8 6.8 3.9 6.2-4.8L84.8 64l.5-17.1-6.2-4.8-6.8 3.9L65 51.4V43.3L65 30z" />
    </svg>
  ),
  'Apache Kafka & Redis': (c) => (
    <svg viewBox="0 0 128 128" width="28" height="28" fill={c}>
      <path d="M64.1 9.8c-6.4 0-11.6 4.9-11.6 11 0 3.9 2.1 7.3 5.2 9.3-1.1 3.1-3.1 5.8-5.7 7.8a21.3 21.3 0 01-5.6 3.1 11.6 11.6 0 00-10.1-6c-6.4 0-11.6 4.9-11.6 11 0 4.9 3.3 9.1 7.9 10.6-1.1 6.3-4.8 11.8-10.1 15.4-2.1-1.4-4.6-2.3-7.3-2.3-6.4 0-11.6 4.9-11.6 11s5.2 11 11.6 11c6.4 0 11.6-4.9 11.6-11 0-.6-.1-1.3-.2-1.9 3.2-2.1 6-4.7 8.3-7.8 1.6 3.8 4.3 7.1 7.7 9.6a11.5 11.5 0 00-2.3 6.8c0 6.1 5.2 11 11.6 11s11.6-4.9 11.6-11c0-5.1-3.6-9.4-8.5-10.7.5-3.8 1.8-7.4 3.9-10.5a23.2 23.2 0 008.9 1.8 23.2 23.2 0 008.9-1.8c2 3.1 3.4 6.7 3.9 10.5-4.9 1.3-8.5 5.6-8.5 10.7 0 6.1 5.2 11 11.6 11s11.6-4.9 11.6-11c0-2.6-.9-5-2.4-6.8 3.4-2.5 6-5.8 7.7-9.6 2.3 3.1 5.1 5.7 8.3 7.8-.1.6-.2 1.3-.2 1.9 0 6.1 5.2 11 11.6 11s11.6-4.9 11.6-11-5.2-11-11.6-11c-2.7 0-5.2.8-7.3 2.3-5.4-3.6-9-9.1-10.1-15.4 4.6-1.5 7.9-5.7 7.9-10.6 0-6.1-5.2-11-11.6-11a11.6 11.6 0 00-10.1 6 21.3 21.3 0 01-5.6-3.1c-2.6-2-4.6-4.7-5.7-7.8 3.1-2 5.2-5.4 5.2-9.3 0-6.1-5.2-11-11.6-11z" />
    </svg>
  ),
  'Flutter & Dart': (c) => (
    <svg viewBox="0 0 128 128" width="28" height="28" fill={c}>
      <path d="M12.3 64.2L76.3 0h39.4L44.1 71.5zm32.1 36.7l30.5-30.5 30.5 30.5-30.5 30.4z" />
      <path opacity=".6" d="M74.9 100.9l30.5 27.3h-39L47 109.7z" />
    </svg>
  ),
  'Terraform & OpenTofu': (c) => (
    <svg viewBox="0 0 128 128" width="28" height="28" fill={c}>
      <path d="M49.8 17.6L81.4 36v36.8L49.8 54.4V17.6zm33.5 0L115 36v36.8L83.3 54.4V17.6zM16 55.2l31.6 18.4V110L16 91.6V55.2zm33.8 18.4l31.6-18.4V91.6L49.8 110V73.6z" />
    </svg>
  ),
  'AI Models & Vector DBs': (c) => (
    <svg viewBox="0 0 128 128" width="28" height="28" fill={c}>
      <path d="M64 4C30.86 4 4 30.86 4 64s26.86 60 60 60 60-26.86 60-60S97.14 4 64 4zm0 10c27.56 0 50 22.44 50 50S91.56 114 64 114 14 91.56 14 64 36.44 14 64 14zm0 8a42 42 0 100 84 42 42 0 000-84zm0 8c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10 4.48-10 10-10zm-24 16c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10 4.48-10 10-10zm48 0c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10 4.48-10 10-10zm-24 18c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10 4.48-10 10-10zm-12-5l-2 4-12 4 12 4 2 4 2-4 12-4-12-4zm24 0l-2 4-12 4 12 4 2 4 2-4 12-4-12-4z" />
    </svg>
  ),
  'Embedded C & RTOS': (c) => (
    <svg viewBox="0 0 128 128" width="28" height="28" fill={c}>
      <rect x="8" y="32" width="112" height="64" rx="8" ry="8" opacity=".3" />
      <path d="M16 48h8v32h-8zm88 0h8v32h-8zM24 40h4v8h-4zm4 8h72v4H28zm0 28h72v4H28zm4 4h4v8h-4zm60 0h4v8h-4zM36 56h8v16h-8zm14 0h8v16h-8zm14 0h8v16h-8zm14 0h8v16h-8z" />
    </svg>
  ),
}

// 20 High-Performance Technologies
const ALL_TECHS = [
  // 1. Laravel
  {
    name: 'Laravel',
    category: 'backend',
    proficiency: 95,
    color: '#FF2D20',
    tag: 'PHP 8.3 Octane',
    useCase: 'Modern enterprise fullstack, queued worker jobs & high-speed Redis pipelines.',
    benchmarks: 'Octane + Swoole: 12k+ req/sec, sub-12ms response',
  },
  // 2. PHP
  {
    name: 'PHP',
    category: 'backend',
    proficiency: 92,
    color: '#777BB4',
    tag: 'PHP 8.3 JIT',
    useCase: 'Async RoadRunner application servers, JIT engine & transactional APIs.',
    benchmarks: '0% OPcache miss on warm production caches',
  },
  // 3. Java
  {
    name: 'Java',
    category: 'backend',
    proficiency: 94,
    color: '#ED8B00',
    tag: 'Spring Boot Loom',
    useCase: 'Distributed enterprise microservices, banking transactions & Kafka streaming.',
    benchmarks: 'Virtual Threads: 250k concurrent network sockets',
  },
  // 4. Python
  {
    name: 'Python',
    category: 'backend',
    proficiency: 98,
    color: '#3776AB',
    tag: 'FastAPI & PyPy',
    useCase: 'AI model inference APIs, asynchronous microservices & Celery task engines.',
    benchmarks: 'uvloop engine, sub-4ms RESTful API latency',
  },
  // 5. Django
  {
    name: 'Django',
    category: 'backend',
    proficiency: 97,
    color: '#44B78B',
    tag: 'DRF & PostgreSQL',
    useCase: 'Mission-critical relational backends, atomic ACID transactions & multi-tenant auth.',
    benchmarks: 'Automated schema migrations, zero SQL vulnerabilities',
  },
  // 6. JavaScript (JS)
  {
    name: 'JavaScript (JS)',
    category: 'frontend',
    proficiency: 99,
    color: '#F7DF1E',
    tag: 'ES2024 V8 Core',
    useCase: 'Reactive DOM rendering, asynchronous event loop tuning, WebSockets & canvas graphics.',
    benchmarks: 'Zero-dependency reactive core, non-blocking dispatch',
  },
  // 7. HTML5
  {
    name: 'HTML5',
    category: 'frontend',
    proficiency: 99,
    color: '#E34F26',
    tag: 'Semantic & A11y',
    useCase: 'Strict semantic architecture, Web Components, WCAG AAA accessibility & SEO.',
    benchmarks: '100/100 Lighthouse SEO rating, CLS 0.00',
  },
  // 8. CSS3
  {
    name: 'CSS3',
    category: 'frontend',
    proficiency: 97,
    color: '#1572B6',
    tag: 'Hardware GPU 3D',
    useCase: 'Hardware-accelerated transforms, fluid responsive grid & glassmorphism visuals.',
    benchmarks: 'GPU-composited 120fps animations, zero reflows',
  },
  // 9. C++
  {
    name: 'C++',
    category: 'mobile',
    proficiency: 93,
    color: '#00599C',
    tag: 'C++20 SIMD Core',
    useCase: 'High-performance engine physics, native Node.js addons & low-latency networking.',
    benchmarks: 'SIMD vectorization, sub-microsecond latency',
  },
  // 10. React & Next.js
  {
    name: 'React & Next.js',
    category: 'frontend',
    proficiency: 98,
    color: '#61DAFB',
    tag: 'Next.js 14+ RSC',
    useCase: 'Streaming Server Components, high-speed interactive portals & reactive dashboards.',
    benchmarks: 'Sub-0.8s First Contentful Paint, 100/100 perf',
  },
  // 11. TypeScript
  {
    name: 'TypeScript',
    category: 'frontend',
    proficiency: 99,
    color: '#3178C6',
    tag: 'Strict Compile-Time',
    useCase: 'Strict end-to-end API type safety, automated schema validation & defect prevention.',
    benchmarks: '100% strict mode, zero undefined exceptions',
  },
  // 12. Go (Golang)
  {
    name: 'Go (Golang)',
    category: 'backend',
    proficiency: 96,
    color: '#00ADD8',
    tag: 'Go Routines & Net',
    useCase: 'High-frequency telemetry microservices, network reverse proxies & financial switches.',
    benchmarks: 'Sub-2ms execution, zero GC pauses on ring buffers',
  },
  // 13. Rust
  {
    name: 'Rust',
    category: 'backend',
    proficiency: 93,
    color: '#DEA584',
    tag: 'Zero-Cost Memory',
    useCase: 'Zero-overhead embedded daemons, memory-safe cryptographic layers & packet parsers.',
    benchmarks: 'Bare-metal performance, compile-time memory safety',
  },
  // 14. PostgreSQL & TimescaleDB
  {
    name: 'PostgreSQL & TimescaleDB',
    category: 'database',
    proficiency: 97,
    color: '#336791',
    tag: 'ACID Hypertables',
    useCase: 'ACID relational data storage, high-volume time-series telemetry & vector search.',
    benchmarks: '120k+ continuous metric inserts per second',
  },
  // 15. Apache Kafka & Redis
  {
    name: 'Apache Kafka & Redis',
    category: 'database',
    proficiency: 95,
    color: '#E0234E',
    tag: 'Event Mesh & Cache',
    useCase: 'Distributed streaming message queues, pub/sub event mesh & in-memory caching.',
    benchmarks: 'Sub-millisecond pub/sub queue fanout',
  },
  // 16. AI Models & Vector DBs
  {
    name: 'AI Models & Vector DBs',
    category: 'database',
    proficiency: 93,
    color: '#10B981',
    tag: 'pgvector & RAG',
    useCase: 'RAG retrieval architectures, semantic embeddings & automated anomaly classification.',
    benchmarks: 'Sub-25ms vector cosine lookups over 10M vectors',
  },
  // 17. Kubernetes (K8s)
  {
    name: 'Kubernetes (K8s)',
    category: 'cloud',
    proficiency: 94,
    color: '#326CE5',
    tag: 'Mesh Orchestration',
    useCase: 'Multi-cloud container orchestration, auto-scaling worker pools & canary rollouts.',
    benchmarks: 'Self-healing mesh across multi-region clusters',
  },
  // 18. Terraform & OpenTofu
  {
    name: 'Terraform & OpenTofu',
    category: 'cloud',
    proficiency: 93,
    color: '#844FBA',
    tag: 'IaC Policy Mesh',
    useCase: 'Immutable Infrastructure as Code (IaC), automated VPC peering & cloud policy audits.',
    benchmarks: '100% reproducible multi-cloud provisioning',
  },
  // 19. Flutter & Dart
  {
    name: 'Flutter & Dart',
    category: 'mobile',
    proficiency: 91,
    color: '#02569B',
    tag: 'GPU Impeller Core',
    useCase: 'Unified cross-platform mobile apps for iOS & Android with native GPU render engine.',
    benchmarks: 'Stable 60fps & 120fps display rendering',
  },
  // 20. Embedded C & RTOS
  {
    name: 'Embedded C & RTOS',
    category: 'mobile',
    proficiency: 88,
    color: '#A8B9CC',
    tag: 'Bare-Metal ARM',
    useCase: 'Microcontroller firmware (ARM Cortex-M), CAN-bus buses & FreeRTOS task scheduling.',
    benchmarks: 'Deterministic microsecond interrupt handlers',
  },
]

// Default 10 Core Stack (User requested priorities)
const CORE_STACK_NAMES = [
  'Laravel', 'PHP', 'Java', 'Python', 'Django',
  'JavaScript (JS)', 'HTML5', 'CSS3', 'C++', 'React & Next.js'
]

// Compact, Ultra-Sleek Technology Card
function TechCard({
  tech,
  index,
  isActive,
  isLeft,
  isMobile,
}: {
  tech: (typeof ALL_TECHS)[0]
  index: number
  isActive: boolean
  isLeft: boolean
  isMobile: boolean
}) {
  const LogoFn = TECH_LOGOS[tech.name]

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: 14,
        padding: isMobile ? '12px 14px' : '14px 18px',
        background: isActive
          ? 'linear-gradient(135deg, rgba(8, 22, 52, 0.98), rgba(4, 10, 28, 0.94))'
          : 'rgba(6, 12, 26, 0.85)',
        border: isActive ? `1.5px solid ${tech.color}` : '1px solid rgba(0, 102, 255, 0.22)',
        backdropFilter: 'blur(16px)',
        boxShadow: isActive
          ? `0 10px 30px rgba(0,0,0,0.85), 0 0 24px ${tech.color}45, inset 0 0 16px ${tech.color}18`
          : '0 4px 16px rgba(0,0,0,0.45)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}
    >
      {/* Top Laser Accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2.5,
          background: isActive
            ? `linear-gradient(90deg, ${tech.color}, #00d4ff)`
            : 'transparent',
          boxShadow: isActive ? `0 0 10px ${tech.color}` : 'none',
          borderRadius: '14px 14px 0 0',
        }}
      />

      {/* Terminal Socket Pin (Where the Line Physically Connects to the Card) */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            [isLeft ? 'right' : 'left']: -7,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: isActive ? '#00d4ff' : '#030712',
            border: `2px solid ${isActive ? '#ffffff' : tech.color}`,
            boxShadow: isActive ? `0 0 12px #00d4ff, 0 0 6px ${tech.color}` : 'none',
            zIndex: 4,
            transition: 'all 0.2s ease',
          }}
        />
      )}

      {/* Card Body: Logo + Name + Tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        {/* Exact Logo Container */}
        <div
          style={{
            width: isMobile ? 40 : 46,
            height: isMobile ? 40 : 46,
            borderRadius: 10,
            background: isActive ? `${tech.color}22` : `${tech.color}12`,
            border: `1px solid ${isActive ? tech.color : tech.color + '40'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: isActive ? `0 0 14px ${tech.color}55` : 'none',
            transition: 'all 0.2s ease',
          }}
        >
          {LogoFn ? LogoFn(tech.color) : <Cpu size={22} color={tech.color} />}
        </div>

        {/* Info */}
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: isMobile ? '0.92rem' : '1.02rem',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.2,
              }}
            >
              {tech.name}
            </span>
            <span
              style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                color: tech.color,
                background: `${tech.color}15`,
                border: `1px solid ${tech.color}35`,
                padding: '1px 6px',
                borderRadius: 4,
                fontFamily: 'monospace',
              }}
            >
              {tech.tag}
            </span>
            {isActive && (
              <span
                style={{
                  fontSize: '0.58rem',
                  fontWeight: 800,
                  color: '#00d4ff',
                  letterSpacing: '0.08em',
                  fontFamily: 'monospace',
                }}
              >
                ● LIVE
              </span>
            )}
          </div>
          <p
            style={{
              fontSize: '0.78rem',
              color: '#94a3b8',
              margin: '3px 0 0 0',
              lineHeight: 1.4,
              whiteSpace: isMobile ? 'normal' : 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: isMobile ? '100%' : 340,
            }}
          >
            {tech.useCase}
          </p>
        </div>
      </div>

      {/* Right: Mastery Gauge */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
        <div
          style={{
            fontSize: isMobile ? '1.05rem' : '1.18rem',
            fontWeight: 900,
            color: tech.color,
            fontFamily: 'monospace',
            lineHeight: 1,
            textShadow: isActive ? `0 0 8px ${tech.color}88` : 'none',
          }}
        >
          {tech.proficiency}%
        </div>
        <div
          style={{
            width: isMobile ? 32 : 40,
            height: 3,
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
            marginTop: 4,
          }}
        >
          <div
            style={{
              width: `${tech.proficiency}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${tech.color}, #00d4ff)`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default function TechnologiesSection({ technologies }: { technologies?: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('core')
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const sectionRef = useRef<HTMLElement>(null)

  // Filter items
  const items = ALL_TECHS.filter((t) => {
    if (activeCategory === 'core') return CORE_STACK_NAMES.includes(t.name)
    if (activeCategory === 'all') return true
    return t.category === activeCategory
  })

  // Detect Mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 820)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Zero-Latency Scroll Handler (120 FPS via requestAnimationFrame + Single Rect query)
  useEffect(() => {
    let rAF: number | null = null

    const handleScroll = () => {
      if (rAF !== null) return
      rAF = window.requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect()
          const winH = window.innerHeight

          // Section triggers from 65% of viewport down to bottom
          const startTrigger = winH * 0.65
          const totalDistance = rect.height - winH * 0.35
          const currentDistance = startTrigger - rect.top

          const p = Math.max(0, Math.min(1, currentDistance / Math.max(1, totalDistance)))
          setScrollProgress(p)
        }
        rAF = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rAF !== null) cancelAnimationFrame(rAF)
    }
  }, [items.length])

  // Current active card index based on scrollProgress
  const activeIdx = Math.min(items.length - 1, Math.floor(scrollProgress * items.length))

  return (
    <section
      ref={sectionRef}
      id="technologies"
      style={{
        padding: 'clamp(4rem, 6.5vw, 6rem) 0',
        position: 'relative',
        overflow: 'hidden',
        background: '#000000',
      }}
    >
      {/* Background Cyber Mesh */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(to right, rgba(0, 102, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 102, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* Ambient Neon Flare */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '85%',
          maxWidth: 800,
          height: 380,
          background: 'radial-gradient(circle, rgba(0, 102, 255, 0.08) 0%, rgba(0, 212, 255, 0.02) 50%, transparent 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 clamp(1rem, 3vw, 2.5rem)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* ── Section Header ── */}
        <div style={{ textAlign: 'center', maxWidth: 660, margin: '0 auto 32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 14px',
              borderRadius: 9999,
              marginBottom: 14,
              background: 'rgba(0, 102, 255, 0.12)',
              border: '1px solid rgba(0, 212, 255, 0.35)',
              boxShadow: '0 0 20px rgba(0, 102, 255, 0.25)',
            }}
          >
            <Zap size={13} color="#00d4ff" />
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#e0f2fe',
                fontFamily: 'monospace',
              }}
            >
              Enterprise Engineering Stack
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 2.9rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: '0 0 10px',
            }}
          >
            Technology{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #0066ff 0%, #00d4ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Mastery
            </span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.94rem', lineHeight: 1.6, margin: '0 auto', maxWidth: 520 }}>
            Exact official architectures battle-tested in high-throughput production. The laser circuit actively jumps from card to card as you scroll.
          </p>
        </div>

        {/* ── Category Filter Pills ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 7,
            marginBottom: 36,
          }}
        >
          {TECH_CATEGORIES.map((cat) => {
            const active = activeCategory === cat.id
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 14px',
                  borderRadius: 9999,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  background: active
                    ? 'linear-gradient(135deg, #0066ff 0%, #00aaff 100%)'
                    : 'rgba(8, 14, 28, 0.75)',
                  border: active
                    ? '1px solid rgba(0, 212, 255, 0.8)'
                    : '1px solid rgba(0, 102, 255, 0.22)',
                  color: active ? '#ffffff' : '#94a3b8',
                  boxShadow: active ? '0 0 18px rgba(0, 102, 255, 0.5)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={12} color={active ? '#ffffff' : '#64748b'} />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* ── INTERCONNECTED TECHNOLOGY MATRIX ── */}
        <div style={{ position: 'relative', width: '100%' }}>
          {/* DESKTOP ALTERNATING CIRCUIT (Screen >= 820px) */}
          {!isMobile ? (
            <div style={{ position: 'relative', width: '100%' }}>
              {items.map((tech, idx) => {
                const isLeft = idx % 2 === 0
                const isLast = idx === items.length - 1
                const n = Math.max(1, items.length - 1)
                const stepRatio = Math.max(0, Math.min(1, (scrollProgress - idx / n) / (1 / n || 1)))
                const isCardActive = activeIdx >= idx
                const nextTech = items[idx + 1]

                // Bezier spark position along the S-curve
                const t = Math.max(0.01, Math.min(0.99, stepRatio))
                const mt = 1 - t
                // viewBox: W=500, H=50. Card edges at 46% and 54% of W.
                const W = 500, H = 50
                const startX = isLeft ? W * 0.46 : W * 0.54
                const endX   = isLeft ? W * 0.54 : W * 0.46
                const midX   = W * 0.5
                const sparkX = mt*mt*mt*startX + 3*mt*mt*t*midX + 3*mt*t*t*midX + t*t*t*endX
                const sparkY = 3*mt*mt*t*(H*0.3) + 3*mt*t*t*(H*0.7) + t*t*t*H
                const pathD  = `M ${startX} 0 C ${midX} ${H*0.3}, ${midX} ${H*0.7}, ${endX} ${H}`
                const pathLen = Math.sqrt(Math.pow(endX - startX, 2) + H*H) * 1.15

                return (
                  <div key={`${activeCategory}-${tech.name}`}>
                    {/* Card Row */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: isLeft ? 'flex-start' : 'flex-end',
                        width: '100%',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      <div style={{ width: '46%' }}>
                        <TechCard
                          tech={tech}
                          index={idx}
                          isActive={isCardActive}
                          isLeft={isLeft}
                          isMobile={false}
                        />
                      </div>
                    </div>

                    {/* SVG Flow Connector with fixed viewBox pixel coordinates */}
                    {!isLast && nextTech && (
                      <div style={{ position: 'relative', zIndex: 1, marginTop: '-2px', marginBottom: '-2px' }}>
                        <svg
                          viewBox={`0 0 ${W} ${H}`}
                          preserveAspectRatio="none"
                          style={{ width: '100%', height: H, display: 'block', overflow: 'visible', pointerEvents: 'none' }}
                        >
                          <defs>
                            <linearGradient id={`jg-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor={tech.color} />
                              <stop offset="50%" stopColor="#00d4ff" />
                              <stop offset="100%" stopColor={nextTech.color} />
                            </linearGradient>
                            <filter id={`jf-${idx}`} x="-50%" y="-50%" width="200%" height="200%">
                              <feGaussianBlur stdDeviation="2.5" result="b" />
                              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                          </defs>

                          {/* Track guide */}
                          <path d={pathD} fill="none" stroke="rgba(0,102,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />

                          {/* Growing laser beam */}
                          {stepRatio > 0 && (
                            <path
                              d={pathD}
                              fill="none"
                              stroke={`url(#jg-${idx})`}
                              strokeWidth="3"
                              strokeLinecap="round"
                              filter={`url(#jf-${idx})`}
                              strokeDasharray={pathLen}
                              strokeDashoffset={pathLen * (1 - stepRatio)}
                              style={{ transition: 'stroke-dashoffset 0.04s linear' }}
                            />
                          )}

                          {/* Spark head traveling along curve */}
                          {stepRatio > 0.03 && stepRatio < 0.97 && (
                            <g filter={`url(#jf-${idx})`}>
                              <circle cx={sparkX} cy={sparkY} r="4.5" fill="#ffffff" opacity="0.92" />
                              <circle cx={sparkX} cy={sparkY} r="9" fill="#00d4ff" opacity="0.5" />
                            </g>
                          )}
                        </svg>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            /* MOBILE LAYOUT (Screen < 820px) - Left Glowing Spine Conduit with Branching Laser */
            <div style={{ position: 'relative', width: '100%', paddingLeft: 42 }}>
              {/* Vertical Continuous Cyber Rail */}
              <div
                style={{
                  position: 'absolute',
                  left: 16,
                  top: 15,
                  bottom: 15,
                  width: 3,
                  background: 'rgba(0, 102, 255, 0.2)',
                  borderRadius: 2,
                }}
              >
                {/* Active Scrolling Laser Fill on Rail */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: `${scrollProgress * 100}%`,
                    background: 'linear-gradient(180deg, #0066ff 0%, #00d4ff 100%)',
                    boxShadow: '0 0 12px #00d4ff, 0 0 4px #ffffff',
                    transition: 'height 0.05s linear',
                  }}
                />
              </div>

              {/* Stacked Cards with Branching Laser Connector Nodes */}
              {items.map((tech, idx) => {
                const isCardActive = activeIdx >= idx
                const isLast = idx === items.length - 1

                return (
                  <div key={`m-${activeCategory}-${tech.name}`} style={{ position: 'relative', marginBottom: isLast ? 0 : 10 }}>
                    {/* Node Pin on Rail */}
                    <div
                      style={{
                        position: 'absolute',
                        left: -32,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: isCardActive ? '#00d4ff' : '#030712',
                        border: `2px solid ${isCardActive ? '#ffffff' : tech.color}`,
                        boxShadow: isCardActive ? `0 0 12px #00d4ff, 0 0 6px ${tech.color}` : 'none',
                        zIndex: 4,
                        transition: 'all 0.2s ease',
                      }}
                    />

                    {/* Horizontal Branching Laser Line into Card */}
                    <div
                      style={{
                        position: 'absolute',
                        left: -18,
                        top: '50%',
                        width: 18,
                        height: 2.5,
                        background: isCardActive
                          ? `linear-gradient(90deg, #00d4ff, ${tech.color})`
                          : 'rgba(0, 102, 255, 0.25)',
                        boxShadow: isCardActive ? `0 0 8px ${tech.color}` : 'none',
                        zIndex: 3,
                        transition: 'all 0.2s ease',
                      }}
                    />

                    {/* Mobile Card */}
                    <TechCard
                      tech={tech}
                      index={idx}
                      isActive={isCardActive}
                      isLeft={true}
                      isMobile={true}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Active Architecture Spec Drawer (Instant Live Details) ── */}
        {items[activeIdx] && (
          <div
            style={{
              marginTop: 24,
              padding: isMobile ? '12px 14px' : '14px 18px',
              borderRadius: 12,
              background: 'rgba(4, 10, 26, 0.95)',
              border: `1px solid ${items[activeIdx].color}40`,
              boxShadow: `0 0 25px ${items[activeIdx].color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: items[activeIdx].color,
                  boxShadow: `0 0 10px ${items[activeIdx].color}`,
                }}
              />
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  color: items[activeIdx].color,
                  letterSpacing: '0.08em',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                }}
              >
                {items[activeIdx].name}:
              </span>
              <span style={{ fontSize: '0.8rem', color: '#cbd5e1', fontFamily: 'monospace' }}>
                {items[activeIdx].benchmarks}
              </span>
            </div>

            <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
              [ Node {String(activeIdx + 1).padStart(2, '0')} of {String(items.length).padStart(2, '0')} Connected ]
            </span>
          </div>
        )}

        {/* ── Bottom Summary Strip ── */}
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 9999,
              background: 'rgba(0, 102, 255, 0.06)',
              border: '1px solid rgba(0, 102, 255, 0.16)',
            }}
          >
            <CheckCircle2 size={12} color="#00d4ff" />
            <span style={{ fontSize: '0.74rem', color: '#64748b', fontFamily: 'monospace' }}>
              Showing {items.length} active nodes in production circuit • Scroll to jump power beam
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
