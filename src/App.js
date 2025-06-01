import React, { useState, useRef, useEffect } from 'react';
import { Copy, Sparkles, Camera, Palette, Sun, Film, Mic, BookOpen, Volume2, MessageSquare, Heart, Globe } from 'lucide-react';

// Data teks prompt dalam dua bahasa
const promptData = {
  id: {
    jenisAdeganOptions: [
      "", "Senja Dramatis", "Pagi Tenang", "Malam Misterius", "Aksi Cepat",
      "Momen Introspektif", "Horor Mencekam", "Fantasi Epik", "Komedi Ringan",
      "Thriller Psikologis", "Petualangan Luar Angkasa", "Dokumenter Alam"
    ],
    pencahayaanOptions: [
      "", "Cahaya Keemasan Menembus", "Bayangan Panjang", "Backlit Dramatis",
      "Remang-remang", "Neon Berkedip", "Cahaya Alami Lembut", "Cahaya Bulan Keperakan",
      "Lampu Sorot Tajam", "Siluet Kontras", "Cahaya Stroboskopik"
    ],
    paletWarnaOptions: [
      "", "Hangat (Oranye, Kuning, Merah)", "Dingin (Biru, Ungu, Hijau)", "Kontras Tinggi",
      "Pastel Lembut", "Monokromatis", "Saturasi Tinggi", "Saturasi Rendah",
      "Warna Vibrant", "Sepia Tone", "Grayscale", "Palet Warna Bumi"
    ],
    elemenAtmosferOptions: [
      "", "Kabut Tipis", "Asap Mengepul", "Hujan Rintik", "Salju Perlahan",
      "Daun Berguguran", "Partikel Debu Melayang", "Uap Panas", "Kilatan Petir",
      "Angin Kencang", "Embun Pagi", "Badai Pasir"
    ],
    gayaSinematikOptions: [
      "", "Realistis", "Surealis", "Noir", "Mimpi", "Retro-futuristik",
      "Gritty", "Clean & Polished", "Dokumenter", "Vintage", "Gaya Film Indie",
      "Gaya Film Klasik", "Gaya Animasi Stop-Motion"
    ],
    propertiLensaOptions: [
      "", "Anamorphic", "Wide-angle", "Telephoto Compression", "Fisheye",
      "2.35:1 Cinematic Aspect Ratio", "16:9 Standard", "4:3 Classic", "Macro Lens",
      "Tilt-Shift Lens", "Prime Lens"
    ],
    gerakanKameraOptions: [
      "", "Tracking Shot Mulus", "Slow Pan", "Zoom Out Dramatis", "Handheld Stabil",
      "Dolly Push In", "Crane Shot Megah", "Steadicam Following", "Tilt Up",
      "Tilt Down", "Orbit Shot", "POV (Point of View)", "Drone Shot", "Reverse Zoom"
    ],
    tipeShotOptions: [
      "", "Close-up Intim", "Wide Shot Epik", "Low Angle", "High Angle",
      "Rule of Thirds", "Leading Lines", "Framing Alami (jendela/pohon)",
      "Dutch Angle", "Medium Shot", "Extreme Close-up", "Over-the-Shoulder",
      "Two Shot", "Master Shot"
    ],
    fokusOptions: [
      "", "Shallow Depth of Field", "Rack Focus", "Deep Focus", "Auto Focus", "Manual Focus"
    ],
    jenisAudioMusikOptions: [
      "", "Musik Orkestra Dramatis", "Soundscape Ambient", "Suara Alam (Hujan, Angin)",
      "Musik Jazz Lembut", "Soundtrack Elektronik Futuristik", "Suara Bising Kota",
      "Hening Total", "Efek Suara Mencekam", "Narasi Voice-over", "Musik Klasik"
    ],
    ui: {
      title: "Prompt Generator AI - GRATIS!",
      section1: "Pengaturan Dasar Adegan",
      section2: "Detail Visual & Estetika",
      section3: "Gerakan Kamera & Komposisi",
      section4: "Nuansa & Makna",
      section5: "Audio & Dialog",
      outputSection: "Prompt yang Dihasilkan",
      supportSection: "Dukung Kami",
      subjekUtamaPlaceholder: "Contoh: Seorang wanita tua duduk di bangku taman",
      lingkunganPlaceholder: "Contoh: taman botani yang sepi",
      teksturDetailPlaceholder: "Contoh: detail kerutan di tangannya, uap mengepul pelan",
      emosiSuasanaPlaceholder: "Contoh: Nostalgia dan sedikit melankolis",
      temaMaknaPlaceholder: "Contoh: kehilangan dan kenangan yang indah",
      dialogNarasiPlaceholder: "Contoh: 'Ini adalah awal dari segalanya...' atau 'Suara bisikan misterius di latar belakang.'",
      copyButton: "Salin",
      copySuccess: "Prompt berhasil disalin!",
      initialPrompt: "Isi kolom di atas untuk menghasilkan prompt...",
      supportText: "Jika aplikasi ini membantu dalam menciptakan prompt yang sinematik, jangan ragu berdonasi untuk saya jajan dan ngopi - Kam sia! 🙏",
      supportButton: "Traktir Kopi",
      footerText: "Dibuat dengan ❤️ untuk inspirasi sinematik Anda.",
      langSelect: "Pilih Bahasa:" // New UI text
    }
  },
  en: {
    jenisAdeganOptions: [
      "", "Dramatic Sunset", "Peaceful Morning", "Mysterious Night", "Fast-Paced Action",
      "Introspective Moment", "Terrifying Horror", "Epic Fantasy", "Light Comedy",
      "Psychological Thriller", "Space Adventure", "Nature Documentary"
    ],
    pencahayaanOptions: [
      "", "Golden Hour Light Filtering Through", "Long Shadows", "Dramatic Backlight",
      "Dimly Lit", "Flickering Neon", "Soft Natural Light", "Silvery Moonlight",
      "Sharp Spotlights", "High-Contrast Silhouette", "Stroboscopic Light"
    ],
    paletWarnaOptions: [
      "", "Warm Palette (Orange, Yellow, Red)", "Cool Palette (Blue, Purple, Green)", "High Contrast",
      "Soft Pastels", "Monochromatic", "High Saturation", "Low Saturation",
      "Vibrant Colors", "Sepia Tone", "Grayscale", "Earthy Tones"
    ],
    elemenAtmosferOptions: [
      "", "Thin Fog", "Puffing Smoke", "Drizzling Rain", "Slowly Falling Snow",
      "Falling Leaves", "Floating Dust Particles", "Hot Steam", "Flickering Lightning",
      "Strong Winds", "Morning Dew", "Sandstorm"
    ],
    gayaSinematikOptions: [
      "", "Realistic", "Surreal", "Noir", "Dreamlike", "Retro-futuristic",
      "Gritty", "Clean & Polished", "Documentary Style", "Vintage", "Indie Film Style",
      "Classic Film Style", "Stop-Motion Animation Style"
    ],
    propertiLensaOptions: [
      "", "Anamorphic", "Wide-angle", "Telephoto Compression", "Fisheye",
      "2.35:1 Cinematic Aspect Ratio", "16:9 Standard", "4:3 Classic", "Macro Lens",
      "Tilt-Shift Lens", "Prime Lens"
    ],
    gerakanKameraOptions: [
      "", "Smooth Tracking Shot", "Slow Pan", "Dramatic Zoom Out", "Handheld Stable",
      "Dolly Push In", "Grand Crane Shot", "Steadicam Following", "Tilt Up",
      "Tilt Down", "Orbit Shot", "POV (Point of View)", "Drone Shot", "Reverse Zoom"
    ],
    tipeShotOptions: [
      "", "Intimate Close-up", "Epic Wide Shot", "Low Angle", "High Angle",
      "Rule of Thirds", "Leading Lines", "Natural Framing (window/trees)",
      "Dutch Angle", "Medium Shot", "Extreme Close-up", "Over-the-Shoulder",
      "Two Shot", "Master Shot"
    ],
    fokusOptions: [
      "", "Shallow Depth of Field", "Rack Focus", "Deep Focus", "Auto Focus", "Manual Focus"
    ],
    jenisAudioMusikOptions: [
      "", "Dramatic Orchestral Music", "Ambient Soundscape", "Nature Sounds (Rain, Wind)",
      "Soft Jazz Music", "Futuristic Electronic Soundtrack", "City Noise",
      "Total Silence", "Eerie Sound Effects", "Voice-over Narration", "Classical Music"
    ],
    ui: {
      title: "Prompt Generator AI - GRATIS!",
      section1: "Basic Scene Settings",
      section2: "Visual & Aesthetic Details",
      section3: "Camera Movement & Composition",
      section4: "Emotion & Mood",
      section5: "Audio & Dialogue",
      outputSection: "Generated Prompt",
      supportSection: "Support Us",
      subjekUtamaPlaceholder: "Example: An old woman sitting on a park bench",
      lingkunganPlaceholder: "Example: a quiet botanical garden",
      teksturDetailPlaceholder: "Example: wrinkles on her hands, steam gently rising from a cup",
      emosiSuasanaPlaceholder: "Example: Nostalgic and slightly melancholic",
      temaMaknaPlaceholder: "Example: loss and cherished memories",
      dialogNarasiPlaceholder: "Example: 'This is the beginning of everything...' or 'Mysterious whispers in the background.'",
      copyButton: "Copy",
      copySuccess: "Prompt copied successfully!",
      initialPrompt: "Fill in the fields above to generate a prompt...",
      supportText: "If this prompt generator helps spark your cinematic ideas, a small contribution for coffee/snacks would mean a lot for continued development. 🙏",
      supportButton: "Buy Us A Coffee",
      footerText: "Made with ❤️ for your cinematic inspiration.",
      langSelect: "Select Language:" // New UI text
    }
  }
};

function App() {
  const [lang, setLang] = useState('id'); // Default language: Indonesia
  // The language dropdown will now control only the UI labels, not the generated prompt output language
  const currentLangUI = promptData[lang].ui;

  // State untuk setiap bagian prompt
  const [jenisAdegan, setJenisAdegan] = useState('');
  const [subjekUtama, setSubjekUtama] = useState('');
  const [lingkungan, setLingkungan] = useState('');
  const [pencahayaan, setPencahayaan] = useState('');
  const [paletWarna, setPaletWarna] = useState('');
  const [teksturDetail, setTeksturDetail] = useState('');
  const [elemenAtmosfer, setElemenAtmosfer] = useState('');
  const [gayaSinematik, setGayaSinematik] = useState('');
  const [propertiLensa, setPropertiLensa] = useState('');
  const [gerakanKamera, setGerakanKamera] = useState('');
  const [tipeShot, setTipeShot] = useState('');
  const [fokus, setFokus] = useState('');
  const [emosiSuasana, setEmosiSuasana] = useState('');
  const [temaMakna, setTemaMakna] = useState('');
  const [jenisAudioMusik, setJenisAudioMusik] = useState('');
  const [dialogNarasi, setDialogNarasi] = useState('');

  const [generatedPromptId, setGeneratedPromptId] = useState(''); // Prompt Bahasa Indonesia
  const [generatedPromptEn, setGeneratedPromptEn] = useState(''); // Prompt Bahasa Inggris

  const promptOutputIdRef = useRef(null);
  const promptOutputEnRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [copyTarget, setCopyTarget] = useState(''); // To know which prompt was copied

  // Fungsi untuk menghasilkan prompt dalam bahasa tertentu
  const buildPrompt = (targetLang) => {
    let prompt = [];
    const promptLangData = promptData[targetLang];

    // MENGGUNAKAN DATA TEKS DARI BAHASA TARGET UNTUK MEMBANGUN PROMPT
    const selectedJenisAdegan = promptLangData.jenisAdeganOptions.find(opt => opt === jenisAdegan) || jenisAdegan;
    const selectedPencahayaan = promptLangData.pencahayaanOptions.find(opt => opt === pencahayaan) || pencahayaan;
    const selectedPaletWarna = promptLangData.paletWarnaOptions.find(opt => opt === paletWarna) || paletWarna;
    const selectedElemenAtmosfer = promptLangData.elemenAtmosferOptions.find(opt => opt === elemenAtmosfer) || elemenAtmosfer;
    const selectedGayaSinematik = promptLangData.gayaSinematikOptions.find(opt => opt === gayaSinematik) || gayaSinematik;
    const selectedPropertiLensa = promptLangData.propertiLensaOptions.find(opt => opt === propertiLensa) || propertiLensa;
    const selectedGerakanKamera = promptLangData.gerakanKameraOptions.find(opt => opt === gerakanKamera) || gerakanKamera;
    const selectedTipeShot = promptLangData.tipeShotOptions.find(opt => opt === tipeShot) || tipeShot;
    const selectedFokus = promptLangData.fokusOptions.find(opt => opt === fokus) || fokus;
    const selectedJenisAudioMusik = promptLangData.jenisAudioMusikOptions.find(opt => opt === jenisAudioMusik) || jenisAudioMusik;


    // Bagian 1: Pengaturan Dasar Adegan
    if (selectedJenisAdegan) prompt.push(`${selectedJenisAdegan}.`);
    if (subjekUtama) prompt.push(`${subjekUtama}.`);
    if (lingkungan) prompt.push(`${targetLang === 'id' ? 'Di ' : 'In '} ${lingkungan}.`);

    // Bagian 2: Detail Visual & Estetika
    const visualDetails = [];
    if (selectedPencahayaan) visualDetails.push(selectedPencahayaan);
    if (selectedPaletWarna) visualDetails.push(`${targetLang === 'id' ? 'Palet warna ' : 'Color palette '}${selectedPaletWarna}`);
    if (teksturDetail) visualDetails.push(teksturDetail);
    if (selectedElemenAtmosfer) visualDetails.push(selectedElemenAtmosfer);
    if (selectedGayaSinematik) visualDetails.push(selectedGayaSinematik);
    if (selectedPropertiLensa) visualDetails.push(selectedPropertiLensa);
    if (visualDetails.length > 0) prompt.push(visualDetails.join(', ') + '.');

    // Bagian 3: Gerakan Kamera & Komposisi
    const cameraDetails = [];
    if (selectedGerakanKamera) cameraDetails.push(selectedGerakanKamera);
    if (selectedTipeShot) cameraDetails.push(selectedTipeShot);
    if (selectedFokus) cameraDetails.push(selectedFokus);
    if (cameraDetails.length > 0) prompt.push(cameraDetails.join(', ') + '.');

    // Bagian 4: Nuansa & Makna
    const moodDetails = [];
    if (emosiSuasana) moodDetails.push(`${targetLang === 'id' ? 'Suasana ' : 'Mood: '}${emosiSuasana}`);
    if (temaMakna) moodDetails.push(`${targetLang === 'id' ? 'mengisyaratkan ' : 'hinting at '}${temaMakna}`);
    if (moodDetails.length > 0) prompt.push(moodDetails.join(', ') + '.');

    // Bagian 5: Audio & Dialog
    const audioDialogDetails = [];
    if (selectedJenisAudioMusik) audioDialogDetails.push(`${targetLang === 'id' ? 'Audio: ' : 'Audio: '}${selectedJenisAudioMusik}`);
    if (dialogNarasi) audioDialogDetails.push(`${targetLang === 'id' ? 'Dialog/Narasi: ' : 'Dialogue/Narration: '}"${dialogNarasi}"`);
    if (audioDialogDetails.length > 0) prompt.push(audioDialogDetails.join(', ') + '.');

    return prompt.filter(Boolean).join(' ');
  };

  // Efek untuk menghasilkan prompt saat input berubah
  useEffect(() => {
    setGeneratedPromptId(buildPrompt('id'));
    setGeneratedPromptEn(buildPrompt('en'));
  }, [
    jenisAdegan, subjekUtama, lingkungan, pencahayaan, paletWarna,
    teksturDetail, elemenAtmosfer, gayaSinematik, propertiLensa,
    gerakanKamera, tipeShot, fokus, emosiSuasana, temaMakna,
    jenisAudioMusik, dialogNarasi
  ]);

  // Fungsi untuk menyalin prompt ke clipboard
  const copyToClipboard = (target) => {
    let textToCopy = '';
    if (target === 'id' && promptOutputIdRef.current) {
      textToCopy = promptOutputIdRef.current.innerText;
      setCopyTarget('id');
    } else if (target === 'en' && promptOutputEnRef.current) {
      textToCopy = promptOutputEnRef.current.innerText;
      setCopyTarget('en');
    }

    if (textToCopy) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopySuccess(currentLangUI.copySuccess);
      } catch (err) {
        setCopySuccess(`${currentLangUI.copyButton} failed.`);
        console.error('Failed to copy text: ', err);
      } finally {
        setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 sm:p-8 font-inter">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <header className="bg-gray-900 p-6 sm:p-8 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center justify-center flex-grow">
            <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-white">
              {currentLangUI.title}
            </h1>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-8">
          {/* Bagian 1: Pengaturan Dasar Adegan */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-300" /> {currentLangUI.section1}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="jenisAdegan" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Jenis Adegan/Mood Utama' : 'Main Scene Type/Mood'}
                </label>
                <select
                  id="jenisAdegan"
                  value={jenisAdegan}
                  onChange={(e) => setJenisAdegan(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.jenisAdeganOptions.map(option => ( // Use fixed ID options for input
                    <option key={option} value={option}>{lang === 'id' ? (option || 'Pilih...') : promptData.en.jenisAdeganOptions[promptData.id.jenisAdeganOptions.indexOf(option)] || 'Select...'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="subjekUtama" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Subjek Utama & Aksinya' : 'Main Subject & Action'}
                </label>
                <input
                  type="text"
                  id="subjekUtama"
                  value={subjekUtama}
                  onChange={(e) => setSubjekUtama(e.target.value)}
                  placeholder={currentLangUI.subjekUtamaPlaceholder}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="lingkungan" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Lingkungan/Latar' : 'Environment/Setting'}
                </label>
                <input
                  type="text"
                  id="lingkungan"
                  value={lingkungan}
                  onChange={(e) => setLingkungan(e.target.value)}
                  placeholder={currentLangUI.lingkunganPlaceholder}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Bagian 2: Detail Visual & Estetika */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <Palette className="w-6 h-6 mr-2 text-green-300" /> {currentLangUI.section2}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pencahayaan" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Pencahayaan' : 'Lighting'}
                </label>
                <select
                  id="pencahayaan"
                  value={pencahayaan}
                  onChange={(e) => setPencahayaan(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.pencahayaanOptions.map(option => (
                    <option key={option} value={option}>{lang === 'id' ? (option || 'Pilih...') : promptData.en.pencahayaanOptions[promptData.id.pencahayaanOptions.indexOf(option)] || 'Select...'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="paletWarna" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Palet Warna' : 'Color Palette'}
                </label>
                <select
                  id="paletWarna"
                  value={paletWarna}
                  onChange={(e) => setPaletWarna(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.paletWarnaOptions.map(option => (
                    <option key={option} value={option}>{lang === 'id' ? (option || 'Pilih...') : promptData.en.paletWarnaOptions[promptData.id.paletWarnaOptions.indexOf(option)] || 'Select...'}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="teksturDetail" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Tekstur & Detail Mikro' : 'Texture & Micro Details'}
                </label>
                <textarea
                  id="teksturDetail"
                  value={teksturDetail}
                  onChange={(e) => setTeksturDetail(e.target.value)}
                  placeholder={currentLangUI.teksturDetailPlaceholder}
                  rows="2"
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <div>
                <label htmlFor="elemenAtmosfer" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Elemen Atmosfer' : 'Atmospheric Elements'}
                </label>
                <select
                  id="elemenAtmosfer"
                  value={elemenAtmosfer}
                  onChange={(e) => setElemenAtmosfer(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.elemenAtmosferOptions.map(option => (
                    <option key={option} value={option}>{lang === 'id' ? (option || 'Pilih...') : promptData.en.elemenAtmosferOptions[promptData.id.elemenAtmosferOptions.indexOf(option)] || 'Select...'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="gayaSinematik" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Gaya Sinematik' : 'Cinematic Style'}
                </label>
                <select
                  id="gayaSinematik"
                  value={gayaSinematik}
                  onChange={(e) => setGayaSinematik(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.gayaSinematikOptions.map(option => (
                    <option key={option} value={option}>{lang === 'id' ? (option || 'Pilih...') : promptData.en.gayaSinematikOptions[promptData.id.gayaSinematikOptions.indexOf(option)] || 'Select...'}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="propertiLensa" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Properti Lensa/Aspek Rasio' : 'Lens Property/Aspect Ratio'}
                </label>
                <select
                  id="propertiLensa"
                  value={propertiLensa}
                  onChange={(e) => setPropertiLensa(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.propertiLensaOptions.map(option => (
                    <option key={option} value={option}>{lang === 'id' ? (option || 'Pilih...') : promptData.en.propertiLensaOptions[promptData.id.propertiLensaOptions.indexOf(option)] || 'Select...'}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Bagian 3: Gerakan Kamera & Komposisi */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <Camera className="w-6 h-6 mr-2 text-purple-300" /> {currentLangUI.section3}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="gerakanKamera" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Gerakan Kamera' : 'Camera Movement'}
                </label>
                <select
                  id="gerakanKamera"
                  value={gerakanKamera}
                  onChange={(e) => setGerakanKamera(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.gerakanKameraOptions.map(option => (
                    <option key={option} value={option}>{lang === 'id' ? (option || 'Pilih...') : promptData.en.gerakanKameraOptions[promptData.id.gerakanKameraOptions.indexOf(option)] || 'Select...'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="tipeShot" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Tipe Shot/Komposisi' : 'Shot Type/Composition'}
                </label>
                <select
                  id="tipeShot"
                  value={tipeShot}
                  onChange={(e) => setTipeShot(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.tipeShotOptions.map(option => (
                    <option key={option} value={option}>{lang === 'id' ? (option || 'Pilih...') : promptData.en.tipeShotOptions[promptData.id.tipeShotOptions.indexOf(option)] || 'Select...'}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="fokus" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Fokus' : 'Focus'}
                </label>
                <select
                  id="fokus"
                  value={fokus}
                  onChange={(e) => setFokus(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.fokusOptions.map(option => (
                    <option key={option} value={option}>{lang === 'id' ? (option || 'Pilih...') : promptData.en.fokusOptions[promptData.id.fokusOptions.indexOf(option)] || 'Select...'}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Bagian 4: Nuansa & Makna */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <Mic className="w-6 h-6 mr-2 text-red-300" /> {currentLangUI.section4}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="emosiSuasana" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Emosi/Suasana' : 'Emotion/Mood'}
                </label>
                <input
                  type="text"
                  id="emosiSuasana"
                  value={emosiSuasana}
                  onChange={(e) => setEmosiSuasana(e.target.value)}
                  placeholder={currentLangUI.emosiSuasanaPlaceholder}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="temaMakna" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Tema/Makna (Opsional)' : 'Theme/Meaning (Optional)'}
                </label>
                <input
                  type="text"
                  id="temaMakna"
                  value={temaMakna}
                  onChange={(e) => setTemaMakna(e.target.value)}
                  placeholder={currentLangUI.temaMaknaPlaceholder}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Bagian 5: Audio & Dialog */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <Volume2 className="w-6 h-6 mr-2 text-orange-300" /> {currentLangUI.section5}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="jenisAudioMusik" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Jenis Audio/Musik' : 'Audio/Music Type'}
                </label>
                <select
                  id="jenisAudioMusik"
                  value={jenisAudioMusik}
                  onChange={(e) => setJenisAudioMusik(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.jenisAudioMusikOptions.map(option => (
                    <option key={option} value={option}>{lang === 'id' ? (option || 'Pilih...') : promptData.en.jenisAudioMusikOptions[promptData.id.jenisAudioMusikOptions.indexOf(option)] || 'Select...'}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="dialogNarasi" className="block text-sm font-medium text-gray-300 mb-1">
                  {lang === 'id' ? 'Dialog/Narasi Spesifik' : 'Specific Dialogue/Narration'}
                </label>
                <textarea
                  id="dialogNarasi"
                  value={dialogNarasi}
                  onChange={(e) => setDialogNarasi(e.target.value)}
                  placeholder={currentLangUI.dialogNarasiPlaceholder}
                  rows="2"
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Output Prompt - Dual Language */}
          <section className="bg-gray-900 p-6 rounded-lg shadow-inner border border-gray-700">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <Film className="w-6 h-6 mr-2 text-yellow-300" /> {currentLangUI.outputSection}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kolom Bahasa Indonesia */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">Prompt (Bahasa Indonesia)</label>
                <div
                  ref={promptOutputIdRef}
                  className="w-full min-h-[120px] p-4 pr-12 bg-gray-700 border border-gray-600 rounded-md text-gray-200 text-sm sm:text-base leading-relaxed overflow-auto resize-y"
                  style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                >
                  {generatedPromptId || promptData.id.ui.initialPrompt}
                </div>
                <button
                  onClick={() => copyToClipboard('id')}
                  className="absolute top-8 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label={currentLangUI.copyButton + ' (ID)'}
                >
                  <Copy className="w-5 h-5" />
                </button>
                {copySuccess && copyTarget === 'id' && (
                  <p className="mt-2 text-sm text-green-400 text-center animate-fade-in-down">
                    {copySuccess}
                  </p>
                )}
              </div>

              {/* Kolom Bahasa Inggris */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">Prompt (English)</label>
                <div
                  ref={promptOutputEnRef}
                  className="w-full min-h-[120px] p-4 pr-12 bg-gray-700 border border-gray-600 rounded-md text-gray-200 text-sm sm:text-base leading-relaxed overflow-auto resize-y"
                  style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                >
                  {generatedPromptEn || promptData.en.ui.initialPrompt}
                </div>
                <button
                  onClick={() => copyToClipboard('en')}
                  className="absolute top-8 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  aria-label={currentLangUI.copyButton + ' (EN)'}
                >
                  <Copy className="w-5 h-5" />
                </button>
                {copySuccess && copyTarget === 'en' && (
                  <p className="mt-2 text-sm text-green-400 text-center animate-fade-in-down">
                    {copySuccess}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Bagian Donasi */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner text-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center justify-center">
              <Heart className="w-6 h-6 mr-2 text-pink-400" /> {currentLangUI.supportSection}
            </h2>
            <p className="text-gray-300 mb-6">
              {currentLangUI.supportText}
            </p>
            <a
              href="https://link.dana.id/minta?full_url=https://qr.dana.id/v1/281012012021082652842677" // Ganti dengan tautan donasi Anda yang sebenarnya!
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Heart className="w-5 h-5 mr-2" />
              {currentLangUI.supportButton}
            </a>
          </section>
        </main>

        <footer className="bg-gray-900 p-4 text-center text-gray-500 text-sm border-t border-gray-700">
          {currentLangUI.footerText}
        </footer>
      </div>
    </div>
  );
}

export default App;
