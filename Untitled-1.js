
import React, { useState } from 'react';

const MSAADA_GUIDES = {
  en: {
    title: "MSAADA First Aid",
    sub: "Emergency Assistant",
    placeholder: "Describe the injury (e.g., heavy bleeding)...",
    btn: "Analyze Injury",
    offline_msg: "Offline: Core guides available.",
    guides: {
      cpr: "1. Push hard and fast in the center of the chest. 2. Tilt head back for rescue breaths.",
      burns: "1. Run cool water over the burn for 10-20 minutes. 2. Cover with a sterile dressing.",
      bleeding: "1. Apply firm, steady pressure with a clean cloth. 2. Elevate the wound above the heart."
    }
  },
  sw: {
    title: "MSAADA Huduma ya Kwanza",
    sub: "Msaidizi wa Dharura",
    placeholder: "Eleza jeraha (mfano, kutokwa na damu sana)...",
    btn: "Chambua Jeraha",
    offline_msg: "Nje ya Mtandao: Miongozo ya kimsingi inapatikana.",
    guides: {
      cpr: "1. Sukuma kwa nguvu katikati ya kifua. 2. Inamisha kichwa nyuma kwa pumzi ya uokoaji.",
      burns: "1. Mimina maji baridi juu ya jeraha kwa dakika 10-20. 2. Funika kwa kitambaa safi.",
      bleeding: "1. Kandamiza kidonda kwa kitambaa safi. 2. Inua jeraha juu ya kiwango cha moyo."
    }
  }
};

export default function MsaadaApp() {
  const [lang, setLang] = useState('en');
  const [input, setInput] = useState('');
  const [instruction, setInstruction] = useState(null);

  const analyzeInjury = () => {
    const text = input.toLowerCase();
    const g = MSAADA_GUIDES[lang].guides;
    
    // Simple logic simulating the AI Triage Engine
    if (text.includes('breath') || text.includes('heart') || text.includes('pumzi')) setInstruction(g.cpr);
    else if (text.includes('burn') || text.includes('moto')) setInstruction(g.burns);
    else if (text.includes('bleed') || text.includes('damu')) setInstruction(g.bleeding);
    else setInstruction("Contacting Emergency Services... Please stay calm.");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button onClick={() => setLang(lang === 'en' ? 'sw' : 'en')} style={styles.langBtn}>
          {lang === 'en' ? 'SWAHILI' : 'ENGLISH'}
        </button>
        <h1 style={styles.title}>{MSAADA_GUIDES[lang].title}</h1>
      </header>

      <main style={styles.main}>
        <input 
          style={styles.input}
          placeholder={MSAADA_GUIDES[lang].placeholder}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={analyzeInjury} style={styles.actionBtn}>
          {MSAADA_GUIDES[lang].btn}
        </button>

        {instruction && (
          <div style={styles.card}>
            <p style={styles.text}>{instruction}</p>
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <p>🔴 {MSAADA_GUIDES[lang].offline_msg}</p>
      </footer>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' },
  header: { textAlign: 'center', borderBottom: '2px solid red', paddingBottom: '10px' },
  title: { fontSize: '2rem', color: '#ff4d4d' },
  langBtn: { float: 'right', padding: '5px 10px', cursor: 'pointer' },
  main: { marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '20px' },
  input: { padding: '15px', fontSize: '1.2rem', borderRadius: '8px', border: 'none' },
  actionBtn: { padding: '20px', fontSize: '1.5rem', fontWeight: 'bold', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  card: { backgroundColor: '#333', padding: '20px', borderRadius: '10px', borderLeft: '10px solid #ff4d4d' },
  text: { fontSize: '1.3rem', lineHeight: '1.6' },
  footer: { marginTop: '50px', textAlign: 'center', opacity: 0.7 }
};