import React, { useState, useRef, useEffect } from 'react';
import { Copy, Sparkles, BookOpen, Film, Mic, Palette, Users, MessageSquare, Volume2, Heart } from 'lucide-react';

// Data teks prompt dalam dua bahasa
const promptData = {
  id: {
    gayaVisualOptions: [
      "", "Realistis", "Animasi", "Semi-realistis", "3D Render", "Lukisan Digital", "Sketsa Pensil"
    ],
    warnaOptions: [
      "", "Hangat, nuansa senja", "Dingin, nuansa pagi", "Cerah, kontras tinggi", "Monokrom", "Pastel lembut"
    ],
    formatOptions: [
      "", "16:9 landscape", "9:16 portrait", "1:1 square", "4:3 standard"
    ],
    suaraKarakterOptions: [
      "", "tenang dan bijak", "ragu tapi bersemangat", "ceria dan energik", "serius dan tegas", "lembut dan hangat", "berwibawa"
    ],
    bahasaKarakterOptions: [
      "", "Bahasa Indonesia standar", "Bahasa Inggris", "Bahasa Sunda", "Bahasa Jawa", "Bahasa Melayu"
    ],
    ekspresiWajahOptions: [
      "", "Mengikuti emosi suara", "Tenang dan datar", "Bersemangat dan ekspresif", "Khawatir", "Tersenyum"
    ],
    musikLatarOptions: [
      "", "Instrumen akustik lembut", "Orkestra epik", "Elektronik futuristik", "Klasik", "Jazz", "Pop ceria"
    ],
    efekSuaraOptions: [
      "", "Gemericik air", "Suara burung", "Langkah kaki", "Deru mesin", "Suara alam"
    ],
    suasanaAudioOptions: [
      "", "Pedesaan", "Hutan", "Perkotaan", "Ruang Hampa", "Di dalam rumah", "Hening"
    ],
    ui: {
      title: "Prompt Generator Gratis",
      section1: "Judul & Tema",
      section2: "Gaya Visual",
      section3: "Karakter & Suara",
      section4: "Dialog & Sinkronisasi",
      section5: "Deskripsi Visual Detail",
      section6: "Audio & Musik Latar",
      outputSection: "Prompt yang Dihasilkan",
      judulLabel: "Judul",
      judulPlaceholder: "Contoh: Warisan Menanam Padi",
      temaLabel: "Tema Utama",
      temaPlaceholder: "Contoh: Emosional, inspiratif, regenerasi petani muda",
      gayaLabel: "Gaya",
      warnaLabel: "Palet Warna",
      formatLabel: "Format",
      karakter1Label: "Karakter A (Deskripsi)",
      karakter1Placeholder: "Contoh: Pria dewasa",
      suaraKarakter1Label: "Suara Karakter A",
      bahasaKarakter1Label: "Bahasa Karakter A",
      karakter2Label: "Karakter B (Deskripsi)",
      karakter2Placeholder: "Contoh: Remaja laki-laki",
      suaraKarakter2Label: "Suara Karakter B",
      bahasaKarakter2Label: "Bahasa Karakter B",
      dialogLabel: "Dialog (Format: 00:00 A: 'Dialog')",
      dialogPlaceholder: "Contoh:\n00:00 A: 'Sudah lama tanah ini tidur.'\n00:06 B: 'Kini saatnya kita bangunkan kembali.'",
      lipSyncLabel: "Lip-sync",
      ekspresiWajahLabel: "Ekspresi Wajah",
      visualLabel: "Deskripsi Visual (Format: 00:00: Deskripsi)",
      visualPlaceholder: "Contoh:\n00:00: Kamera melayang di atas sawah, cahaya senja menyinari air.\n00:06: Close-up wajah remaja, mata menatap lahan.",
      musikLatarLabel: "Musik Latar",
      efekSuaraLabel: "Efek Suara",
      suasanaAudioLabel: "Suasana Audio",
      copyButton: "Salin",
      copySuccess: "Prompt berhasil disalin!",
      initialPrompt: "Isi kolom di atas untuk menghasilkan prompt...",
      supportText: "Jika aplikasi ini membantu dalam menciptakan prompt yang sinematik, jangan ragu berdonasi buat jajan dan ngopi - Kam sia! 🙏", // Teks di bawah tombol
      supportButton: "Traktir Kopi", // Teks tombol
      footerText: "Dibuat dengan ❤️ untuk inspirasi sinematik Anda."
    }
  },
  en: {
    gayaVisualOptions: [
      "", "Realistic", "Animated", "Semi-realistic", "3D Render", "Digital Painting", "Pencil Sketch"
    ],
    warnaOptions: [
      "", "Warm, sunset hues", "Cool, morning hues", "Bright, high contrast", "Monochromatic", "Soft pastel"
    ],
    formatOptions: [
      "", "16:9 landscape", "9:16 portrait", "1:1 square", "4:3 standard"
    ],
    suaraKarakterOptions: [
      "", "calm and wise voice", "hesitant but enthusiastic voice", "cheerful and energetic voice", "serious and firm voice", "soft and warm voice", "authoritative voice"
    ],
    bahasaKarakterOptions: [
      "", "Standard Indonesian", "English", "Sundanese", "Javanese", "Malay"
    ],
    ekspresiWajahOptions: [
      "", "Following voice emotion", "Calm and flat", "Enthusiastic and expressive", "Worried", "Smiling"
    ],
    musikLatarOptions: [
      "", "Soft acoustic instrumental", "Epic orchestral", "Futuristic electronic", "Classical", "Jazz", "Upbeat pop"
    ],
    efekSuaraOptions: [
      "", "Water trickling", "Bird sounds", "Footsteps", "Engine hum", "Nature sounds"
    ],
    suasanaAudioOptions: [
      "", "Rural", "Forest", "Urban", "Zero Gravity", "Indoors", "Silent"
    ],
    ui: {
      title: "Veo3 Gemini Prompt Generator",
      section1: "Title & Theme",
      section2: "Visual Style",
      section3: "Characters & Voice",
      section4: "Dialogue & Synchronization",
      section5: "Detailed Visual Description",
      section6: "Audio & Background Music",
      outputSection: "Generated Prompt",
      supportSection: "Support Us", // Judul bagian dukungan
      judulLabel: "Title",
      judulPlaceholder: "Example: Legacy of Rice Planting",
      temaLabel: "Main Theme",
      temaPlaceholder: "Example: Emotional, inspiring, youth farmer regeneration",
      gayaLabel: "Style",
      warnaLabel: "Color Palette",
      formatLabel: "Format",
      karakter1Label: "Character A (Description)",
      karakter1Placeholder: "Example: Adult man",
      suaraKarakter1Label: "Voice of Character A",
      bahasaKarakter1Label: "Language of Character A",
      karakter2Label: "Character B (Description)",
      karakter2Placeholder: "Example: Teenage boy",
      suaraKarakter2Label: "Voice of Character B",
      bahasaKarakter2Label: "Language of Character B",
      dialogLabel: "Dialogue (Format: 00:00 A: 'Dialogue')",
      dialogPlaceholder: "Example:\n00:00 A: 'Long has this land slept.'\n00:06 B: 'Now it's time to awaken it again.'",
      lipSyncLabel: "Lip-sync",
      ekspresiWajahLabel: "Facial Expression",
      visualLabel: "Visual Description (Format: 00:00: Description)",
      visualPlaceholder: "Example:\n00:00: Camera floats over rice fields, sunset light illuminating water.\n00:06: Close-up of teenager's face, eyes looking at the land.",
      musikLatarLabel: "Background Music",
      efekSuaraLabel: "Sound Effects",
      suasanaAudioLabel: "Audio Ambiance",
      copyButton: "Copy",
      copySuccess: "Prompt copied successfully!",
      initialPrompt: "Fill in the fields above to generate a prompt...",
      supportText: "If this prompt generator helps spark your cinematic ideas, a small contribution for coffee/snacks would mean a lot for continued development. 🙏", // Teks di bawah tombol
      supportButton: "Buy Us A Coffee", // Teks tombol
      footerText: "Made with ❤️ for your cinematic inspiration."
    }
  }
};

function App() {
  const currentLangUI = promptData.id.ui; // UI will always be in ID

  // State untuk setiap bagian prompt baru
  const [judul, setJudul] = useState('');
  const [tema, setTema] = useState('');
  const [gayaVisual, setGayaVisual] = useState('');
  const [warna, setWarna] = useState('');
  const [format, setFormat] = useState('');
  const [karakter1Desc, setKarakter1Desc] = useState('');
  const [suaraKarakter1, setSuaraKarakter1] = useState('');
  const [bahasaKarakter1, setBahasaKarakter1] = useState('');
  const [karakter2Desc, setKarakter2Desc] = useState('');
  const [suaraKarakter2, setSuaraKarakter2] = useState('');
  const [bahasaKarakter2, setBahasaKarakter2] = useState('');
  const [dialog, setDialog] = useState('');
  const [lipSync, setLipSync] = useState('');
  const [ekspresiWajah, setEkspresiWajah] = useState('');
  const [visualDesc, setVisualDesc] = useState('');
  const [musikLatar, setMusikLatar] = useState('');
  const [efekSuara, setEfekSuara] = useState('');
  const [suasanaAudio, setSuasanaAudio] = useState('');

  // States untuk output prompt bilingual
  const [generatedPromptId, setGeneratedPromptId] = useState('');
  const [generatedPromptEn, setGeneratedPromptEn] = useState('');

  const promptOutputIdRef = useRef(null);
  const promptOutputEnRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState('');
  const [copyTarget, setCopyTarget] = useState('');

  // Fungsi untuk mendapatkan terjemahan opsi dropdown
  const getTranslatedOption = (optionValue, idOptionsArray, enOptionsArray) => {
    const index = idOptionsArray.indexOf(optionValue);
    return index !== -1 ? enOptionsArray[index] : optionValue;
  };

  // Fungsi untuk membangun prompt dalam bahasa tertentu
  const buildPrompt = (targetLang) => {
    let prompt = [];
    const promptLangData = promptData[targetLang];

    // 1. Judul & Tema
    if (judul || tema) {
      prompt.push(`${targetLang === 'id' ? 'Judul: ' : 'Title: '}${judul || 'Untitled'}`);
      if (tema) prompt.push(`${targetLang === 'id' ? 'Tema: ' : 'Theme: '}${tema}`);
    }

    // 2. Gaya Visual
    if (gayaVisual || warna || format) {
      prompt.push(`${targetLang === 'id' ? 'Gaya Visual: ' : 'Visual Style: '}`);
      const visualDetails = [];
      if (gayaVisual) visualDetails.push(targetLang === 'id' ? gayaVisual : getTranslatedOption(gayaVisual, promptData.id.gayaVisualOptions, promptData.en.gayaVisualOptions));
      if (warna) visualDetails.push(`${targetLang === 'id' ? 'Warna: ' : 'Color: '}${targetLang === 'id' ? warna : getTranslatedOption(warna, promptData.id.warnaOptions, promptData.en.warnaOptions)}`);
      if (format) visualDetails.push(`${targetLang === 'id' ? 'Format: ' : 'Format: '}${targetLang === 'id' ? format : getTranslatedOption(format, promptData.id.formatOptions, promptData.en.formatOptions)}`);
      prompt.push(visualDetails.join(', ') + '.');
    }

    // 3. Karakter & Suara
    if (karakter1Desc || karakter2Desc) {
      prompt.push(`${targetLang === 'id' ? 'Karakter & Suara: ' : 'Characters & Voice: '}`);
      if (karakter1Desc) {
        let charA = `${targetLang === 'id' ? 'Karakter A: ' : 'Character A: '}${karakter1Desc}`;
        const charAVoice = targetLang === 'id' ? suaraKarakter1 : getTranslatedOption(suaraKarakter1, promptData.id.suaraKarakterOptions, promptData.en.suaraKarakterOptions);
        const charALang = targetLang === 'id' ? bahasaKarakter1 : getTranslatedOption(bahasaKarakter1, promptData.id.bahasaKarakterOptions, promptData.en.bahasaKarakterOptions);
        if (charAVoice || charALang) {
          charA += ` (${charAVoice || ''}, ${charALang || ''})`;
        }
        prompt.push(charA);
      }
      if (karakter2Desc) {
        let charB = `${targetLang === 'id' ? 'Karakter B: ' : 'Character B: '}${karakter2Desc}`;
        const charBVoice = targetLang === 'id' ? suaraKarakter2 : getTranslatedOption(suaraKarakter2, promptData.id.suaraKarakterOptions, promptData.en.suaraKarakterOptions);
        const charBLang = targetLang === 'id' ? bahasaKarakter2 : getTranslatedOption(bahasaKarakter2, promptData.id.bahasaKarakterOptions, promptData.en.bahasaKarakterOptions);
        if (charBVoice || charBLang) {
          charB += ` (${charBVoice || ''}, ${charBLang || ''})`;
        }
        prompt.push(charB);
      }
    }

    // 4. Dialog & Sinkronisasi
    if (dialog || lipSync || ekspresiWajah) {
      prompt.push(`${targetLang === 'id' ? 'Dialog & Sinkronisasi: ' : 'Dialogue & Synchronization: '}`);
      if (dialog) prompt.push(`${targetLang === 'id' ? 'Dialog: ' : 'Dialogue: '}\n${dialog}`);
      if (lipSync) prompt.push(`${targetLang === 'id' ? 'Lip-sync: ' : 'Lip-sync: '}${targetLang === 'id' ? (lipSync === 'Aktif' ? 'Aktif' : 'Nonaktif') : (lipSync === 'Aktif' ? 'Active' : 'Inactive')}`);
      if (ekspresiWajah) prompt.push(`${targetLang === 'id' ? 'Ekspresi Wajah: ' : 'Facial Expression: '}${targetLang === 'id' ? ekspresiWajah : getTranslatedOption(ekspresiWajah, promptData.id.ekspresiWajahOptions, promptData.en.ekspresiWajahOptions)}`);
    }

    // 5. Deskripsi Visual Detail
    if (visualDesc) {
      prompt.push(`${targetLang === 'id' ? 'Deskripsi Visual: ' : 'Visual Description: '}\n${visualDesc}`);
    }

    // 6. Audio & Musik Latar
    if (musikLatar || efekSuara || suasanaAudio) {
      prompt.push(`${targetLang === 'id' ? 'Audio & Musik Latar: ' : 'Audio & Background Music: '}`);
      const audioDetails = [];
      if (musikLatar) audioDetails.push(`${targetLang === 'id' ? 'Musik Latar: ' : 'Background Music: '}${targetLang === 'id' ? musikLatar : getTranslatedOption(musikLatar, promptData.id.musikLatarOptions, promptData.en.musikLatarOptions)}`);
      if (efekSuara) audioDetails.push(`${targetLang === 'id' ? 'Efek Suara: ' : 'Sound Effects: '}${targetLang === 'id' ? efekSuara : getTranslatedOption(efekSuara, promptData.id.efekSuaraOptions, promptData.en.efekSuaraOptions)}`);
      if (suasanaAudio) audioDetails.push(`${targetLang === 'id' ? 'Suasana Audio: ' : 'Audio Ambiance: '}${targetLang === 'id' ? suasanaAudio : getTranslatedOption(suasanaAudio, promptData.id.suasanaAudioOptions, promptData.en.suasanaAudioOptions)}`);
      prompt.push(audioDetails.join(', ') + '.');
    }

    return prompt.filter(Boolean).join('\n\n'); // Gabungkan dengan dua baris baru untuk keterbacaan
  };

  // Efek untuk menghasilkan prompt saat input berubah
  useEffect(() => {
    setGeneratedPromptId(buildPrompt('id'));
    setGeneratedPromptEn(buildPrompt('en'));
  }, [
    judul, tema, gayaVisual, warna, format,
    karakter1Desc, suaraKarakter1, bahasaKarakter1,
    karakter2Desc, suaraKarakter2, bahasaKarakter2,
    dialog, lipSync, ekspresiWajah, visualDesc,
    musikLatar, efekSuara, suasanaAudio
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
        <header className="bg-gray-900 p-6 sm:p-8 border-b border-gray-700 flex items-center justify-center">
          <div className="flex items-center">
            <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold text-center text-white">
              {currentLangUI.title}
            </h1>
          </div>
        </header>

        <main className="p-6 sm:p-8 space-y-8">
          {/* Bagian 1: Judul & Tema */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-300" /> {currentLangUI.section1}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="judul" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.judulLabel}
                </label>
                <input
                  type="text"
                  id="judul"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder={currentLangUI.judulPlaceholder}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="tema" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.temaLabel}
                </label>
                <input
                  type="text"
                  id="tema"
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  placeholder={currentLangUI.temaPlaceholder}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Bagian 2: Gaya Visual */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <Palette className="w-6 h-6 mr-2 text-green-300" /> {currentLangUI.section2}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="gayaVisual" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.gayaLabel}
                </label>
                <select
                  id="gayaVisual"
                  value={gayaVisual}
                  onChange={(e) => setGayaVisual(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.gayaVisualOptions.map(option => (
                    <option key={option} value={option}>{option || 'Pilih...'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="warna" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.warnaLabel}
                </label>
                <select
                  id="warna"
                  value={warna}
                  onChange={(e) => setWarna(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.warnaOptions.map(option => (
                    <option key={option} value={option}>{option || 'Pilih...'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="format" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.formatLabel}
                </label>
                <select
                  id="format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.formatOptions.map(option => (
                    <option key={option} value={option}>{option || 'Pilih...'}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Bagian 3: Karakter & Suara */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <Users className="w-6 h-6 mr-2 text-purple-300" /> {currentLangUI.section3}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Karakter A */}
              <div className="md:col-span-2">
                <label htmlFor="karakter1Desc" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.karakter1Label}
                </label>
                <input
                  type="text"
                  id="karakter1Desc"
                  value={karakter1Desc}
                  onChange={(e) => setKarakter1Desc(e.target.value)}
                  placeholder={currentLangUI.karakter1Placeholder}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="suaraKarakter1" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.suaraKarakter1Label}
                </label>
                <select
                  id="suaraKarakter1"
                  value={suaraKarakter1}
                  onChange={(e) => setSuaraKarakter1(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.suaraKarakterOptions.map(option => (
                    <option key={option} value={option}>{option || 'Pilih...'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="bahasaKarakter1" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.bahasaKarakter1Label}
                </label>
                <select
                  id="bahasaKarakter1"
                  value={bahasaKarakter1}
                  onChange={(e) => setBahasaKarakter1(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.bahasaKarakterOptions.map(option => (
                    <option key={option} value={option}>{option || 'Pilih...'}</option>
                  ))}
                </select>
              </div>

              {/* Karakter B (Opsional) */}
              <div className="md:col-span-2 mt-4">
                <label htmlFor="karakter2Desc" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.karakter2Label}
                </label>
                <input
                  type="text"
                  id="karakter2Desc"
                  value={karakter2Desc}
                  onChange={(e) => setKarakter2Desc(e.target.value)}
                  placeholder={currentLangUI.karakter2Placeholder}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="suaraKarakter2" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.suaraKarakter2Label}
                </label>
                <select
                  id="suaraKarakter2"
                  value={suaraKarakter2}
                  onChange={(e) => setSuaraKarakter2(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.suaraKarakterOptions.map(option => (
                    <option key={option} value={option}>{option || 'Pilih...'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="bahasaKarakter2" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.bahasaKarakter2Label}
                </label>
                <select
                  id="bahasaKarakter2"
                  value={bahasaKarakter2}
                  onChange={(e) => setBahasaKarakter2(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.bahasaKarakterOptions.map(option => (
                    <option key={option} value={option}>{option || 'Pilih...'}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Bagian 4: Dialog & Sinkronisasi */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <MessageSquare className="w-6 h-6 mr-2 text-red-300" /> {currentLangUI.section4}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="dialog" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.dialogLabel}
                </label>
                <textarea
                  id="dialog"
                  value={dialog}
                  onChange={(e) => setDialog(e.target.value)}
                  placeholder={currentLangUI.dialogPlaceholder}
                  rows="4"
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lipSync" className="block text-sm font-medium text-gray-300 mb-1">
                    {currentLangUI.lipSyncLabel}
                  </label>
                  <select
                    id="lipSync"
                    value={lipSync}
                    onChange={(e) => setLipSync(e.target.value)}
                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Pilih...</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">Nonaktif</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="ekspresiWajah" className="block text-sm font-medium text-gray-300 mb-1">
                    {currentLangUI.ekspresiWajahLabel}
                  </label>
                  <select
                    id="ekspresiWajah"
                    value={ekspresiWajah}
                    onChange={(e) => setEkspresiWajah(e.target.value)}
                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {promptData.id.ekspresiWajahOptions.map(option => (
                      <option key={option} value={option}>{option || 'Pilih...'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Bagian 5: Deskripsi Visual Detail */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <Film className="w-6 h-6 mr-2 text-yellow-300" /> {currentLangUI.section5}
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="visualDesc" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.visualLabel}
                </label>
                <textarea
                  id="visualDesc"
                  value={visualDesc}
                  onChange={(e) => setVisualDesc(e.target.value)}
                  placeholder={currentLangUI.visualPlaceholder}
                  rows="6"
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Bagian 6: Audio & Musik Latar */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <Volume2 className="w-6 h-6 mr-2 text-orange-300" /> {currentLangUI.section6}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="musikLatar" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.musikLatarLabel}
                </label>
                <select
                  id="musikLatar"
                  value={musikLatar}
                  onChange={(e) => setMusikLatar(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.musikLatarOptions.map(option => (
                    <option key={option} value={option}>{option || 'Pilih...'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="efekSuara" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.efekSuaraLabel}
                </label>
                <select
                  id="efekSuara"
                  value={efekSuara}
                  onChange={(e) => setEfekSuara(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.efekSuaraOptions.map(option => (
                    <option key={option} value={option}>{option || 'Pilih...'}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="suasanaAudio" className="block text-sm font-medium text-gray-300 mb-1">
                  {currentLangUI.suasanaAudioLabel}
                </label>
                <select
                  id="suasanaAudio"
                  value={suasanaAudio}
                  onChange={(e) => setSuasanaAudio(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {promptData.id.suasanaAudioOptions.map(option => (
                    <option key={option} value={option}>{option || 'Pilih...'}</option>
                  ))}
                </select>
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
            {/* Bagian detail transfer BCA dan DANA telah dihapus di sini */}
            {/* Teks saran di bawah tombol donasi juga telah dihapus */}
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
