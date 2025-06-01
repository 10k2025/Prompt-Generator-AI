import React, { useState, useRef, useEffect } from 'react';
import { Copy, Sparkles, Camera, Palette, Sun, Film, Mic, BookOpen, Volume2, MessageSquare, Heart } from 'lucide-react'; // Import Heart icon

function App() {
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
  // State baru untuk Audio & Dialog
  const [jenisAudioMusik, setJenisAudioMusik] = useState('');
  const [dialogNarasi, setDialogNarasi] = useState('');

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const promptOutputRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState('');

  // Daftar pilihan untuk dropdown
  const jenisAdeganOptions = [
    "", "Senja Dramatis", "Pagi Tenang", "Malam Misterius", "Aksi Cepat",
    "Momen Introspektif", "Horor Mencekam", "Fantasi Epik", "Komedi Ringan",
    "Thriller Psikologis", "Petualangan Luar Angkasa", "Dokumenter Alam"
  ];

  const pencahayaanOptions = [
    "", "Cahaya Keemasan Menembus", "Bayangan Panjang", "Backlit Dramatis",
    "Remang-remang", "Neon Berkedip", "Cahaya Alami Lembut", "Cahaya Bulan Keperakan",
    "Lampu Sorot Tajam", "Siluet Kontras", "Cahaya Stroboskopik"
  ];

  const paletWarnaOptions = [
    "", "Hangat (Oranye, Kuning, Merah)", "Dingin (Biru, Ungu, Hijau)", "Kontras Tinggi",
    "Pastel Lembut", "Monokromatis", "Saturasi Tinggi", "Saturasi Rendah",
    "Warna Vibrant", "Sepia Tone", "Grayscale", "Palet Warna Bumi"
  ];

  const elemenAtmosferOptions = [
    "", "Kabut Tipis", "Asap Mengepul", "Hujan Rintik", "Salju Perlahan",
    "Daun Berguguran", "Partikel Debu Melayang", "Uap Panas", "Kilatan Petir",
    "Angin Kencang", "Embun Pagi", "Badai Pasir"
  ];

  const gayaSinematikOptions = [
    "", "Realistis", "Surealis", "Noir", "Mimpi", "Retro-futuristik",
    "Gritty", "Clean & Polished", "Dokumenter", "Vintage", "Gaya Film Indie",
    "Gaya Film Klasik", "Gaya Animasi Stop-Motion"
  ];

  const propertiLensaOptions = [
    "", "Anamorphic", "Wide-angle", "Telephoto Compression", "Fisheye",
    "2.35:1 Cinematic Aspect Ratio", "16:9 Standard", "4:3 Classic", "Macro Lens",
    "Tilt-Shift Lens", "Prime Lens"
  ];

  const gerakanKameraOptions = [
    "", "Tracking Shot Mulus", "Slow Pan", "Zoom Out Dramatis", "Handheld Stabil",
    "Dolly Push In", "Crane Shot Megah", "Steadicam Following", "Tilt Up",
    "Tilt Down", "Orbit Shot", "POV (Point of View)", "Drone Shot", "Reverse Zoom"
  ];

  const tipeShotOptions = [
    "", "Close-up Intim", "Wide Shot Epik", "Low Angle", "High Angle",
    "Rule of Thirds", "Leading Lines", "Framing Alami (jendela/pohon)",
    "Dutch Angle", "Medium Shot", "Extreme Close-up", "Over-the-Shoulder",
    "Two Shot", "Master Shot"
  ];

  const fokusOptions = [
    "", "Shallow Depth of Field", "Rack Focus", "Deep Focus", "Auto Focus", "Manual Focus"
  ];

  const jenisAudioMusikOptions = [
    "", "Musik Orkestra Dramatis", "Soundscape Ambient", "Suara Alam (Hujan, Angin)",
    "Musik Jazz Lembut", "Soundtrack Elektronik Futuristik", "Suara Bising Kota",
    "Hening Total", "Efek Suara Mencekam", "Narasi Voice-over", "Musik Klasik"
  ];

  // Fungsi untuk menghasilkan prompt
  const generatePrompt = () => {
    let prompt = [];

    // Bagian 1: Pengaturan Dasar Adegan
    if (jenisAdegan) prompt.push(`${jenisAdegan}.`);
    if (subjekUtama) prompt.push(`${subjekUtama}.`);
    if (lingkungan) prompt.push(`Di ${lingkungan}.`);

    // Bagian 2: Detail Visual & Estetika
    const visualDetails = [];
    if (pencahayaan) visualDetails.push(pencahayaan);
    if (paletWarna) visualDetails.push(`Palet warna ${paletWarna}`);
    if (teksturDetail) visualDetails.push(teksturDetail);
    if (elemenAtmosfer) visualDetails.push(elemenAtmosfer);
    if (gayaSinematik) visualDetails.push(gayaSinematik);
    if (propertiLensa) visualDetails.push(propertiLensa);
    if (visualDetails.length > 0) prompt.push(visualDetails.join(', ') + '.');

    // Bagian 3: Gerakan Kamera & Komposisi
    const cameraDetails = [];
    if (gerakanKamera) cameraDetails.push(gerakanKamera);
    if (tipeShot) cameraDetails.push(tipeShot);
    if (fokus) cameraDetails.push(fokus);
    if (cameraDetails.length > 0) prompt.push(cameraDetails.join(', ') + '.');

    // Bagian 4: Nuansa & Makna
    const moodDetails = [];
    if (emosiSuasana) moodDetails.push(`Suasana ${emosiSuasana}`);
    if (temaMakna) moodDetails.push(`mengisyaratkan ${temaMakna}`);
    if (moodDetails.length > 0) prompt.push(moodDetails.join(', ') + '.');

    // Bagian 5: Audio & Dialog
    const audioDialogDetails = [];
    if (jenisAudioMusik) audioDialogDetails.push(`Audio: ${jenisAudioMusik}`);
    if (dialogNarasi) audioDialogDetails.push(`Dialog/Narasi: "${dialogNarasi}"`);
    if (audioDialogDetails.length > 0) prompt.push(audioDialogDetails.join(', ') + '.');

    setGeneratedPrompt(prompt.filter(Boolean).join(' ')); // Filter Boolean untuk menghapus string kosong
    setCopySuccess(''); // Reset copy success message
  };

  // Efek untuk menghasilkan prompt secara otomatis saat input berubah
  useEffect(() => {
    generatePrompt();
  }, [
    jenisAdegan, subjekUtama, lingkungan, pencahayaan, paletWarna,
    teksturDetail, elemenAtmosfer, gayaSinematik, propertiLensa,
    gerakanKamera, tipeShot, fokus, emosiSuasana, temaMakna,
    jenisAudioMusik, dialogNarasi
  ]);

  // Fungsi untuk menyalin prompt ke clipboard
  const copyToClipboard = () => {
    if (promptOutputRef.current) {
      const textToCopy = promptOutputRef.current.innerText;
      try {
        // Menggunakan document.execCommand('copy') karena navigator.clipboard mungkin tidak berfungsi di iframe
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopySuccess('Prompt berhasil disalin!');
      } catch (err) {
        setCopySuccess('Gagal menyalin prompt.');
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 sm:p-8 font-inter">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <header className="bg-gray-900 p-6 sm:p-8 border-b border-gray-700 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-white">
            Veo3 Prompt Generator
          </h1>
        </header>

        <main className="p-6 sm:p-8 space-y-8">
          {/* Bagian 1: Pengaturan Dasar Adegan */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-300" /> Pengaturan Dasar Adegan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="jenisAdegan" className="block text-sm font-medium text-gray-300 mb-1">Jenis Adegan/Mood Utama</label>
                <select
                  id="jenisAdegan"
                  value={jenisAdegan}
                  onChange={(e) => setJenisAdegan(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {jenisAdeganOptions.map(option => (
                    <option key={option} value={option}>{option || "Pilih..."}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="subjekUtama" className="block text-sm font-medium text-gray-300 mb-1">Subjek Utama & Aksinya</label>
                <input
                  type="text"
                  id="subjekUtama"
                  value={subjekUtama}
                  onChange={(e) => setSubjekUtama(e.target.value)}
                  placeholder="Contoh: Seorang wanita tua duduk di bangku taman"
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="lingkungan" className="block text-sm font-medium text-gray-300 mb-1">Lingkungan/Latar</label>
                <input
                  type="text"
                  id="lingkungan"
                  value={lingkungan}
                  onChange={(e) => setLingkungan(e.target.value)}
                  placeholder="Contoh: taman botani yang sepi"
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Bagian 2: Detail Visual & Estetika */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <Palette className="w-6 h-6 mr-2 text-green-300" /> Detail Visual & Estetika
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pencahayaan" className="block text-sm font-medium text-gray-300 mb-1">Pencahayaan</label>
                <select
                  id="pencahayaan"
                  value={pencahayaan}
                  onChange={(e) => setPencahayaan(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {pencahayaanOptions.map(option => (
                    <option key={option} value={option}>{option || "Pilih..."}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="paletWarna" className="block text-sm font-medium text-gray-300 mb-1">Palet Warna</label>
                <select
                  id="paletWarna"
                  value={paletWarna}
                  onChange={(e) => setPaletWarna(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {paletWarnaOptions.map(option => (
                    <option key={option} value={option}>{option || "Pilih..."}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="teksturDetail" className="block text-sm font-medium text-gray-300 mb-1">Tekstur & Detail Mikro</label>
                <textarea
                  id="teksturDetail"
                  value={teksturDetail}
                  onChange={(e) => setTeksturDetail(e.target.value)}
                  placeholder="Contoh: detail kerutan di tangannya, uap mengepul pelan"
                  rows="2"
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <div>
                <label htmlFor="elemenAtmosfer" className="block text-sm font-medium text-gray-300 mb-1">Elemen Atmosfer</label>
                <select
                  id="elemenAtmosfer"
                  value={elemenAtmosfer}
                  onChange={(e) => setElemenAtmosfer(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {elemenAtmosferOptions.map(option => (
                    <option key={option} value={option}>{option || "Pilih..."}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="gayaSinematik" className="block text-sm font-medium text-gray-300 mb-1">Gaya Sinematik</label>
                <select
                  id="gayaSinematik"
                  value={gayaSinematik}
                  onChange={(e) => setGayaSinematik(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {gayaSinematikOptions.map(option => (
                    <option key={option} value={option}>{option || "Pilih..."}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="propertiLensa" className="block text-sm font-medium text-gray-300 mb-1">Properti Lensa/Aspek Rasio</label>
                <select
                  id="propertiLensa"
                  value={propertiLensa}
                  onChange={(e) => setPropertiLensa(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {propertiLensaOptions.map(option => (
                    <option key={option} value={option}>{option || "Pilih..."}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Bagian 3: Gerakan Kamera & Komposisi */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <Camera className="w-6 h-6 mr-2 text-purple-300" /> Gerakan Kamera & Komposisi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="gerakanKamera" className="block text-sm font-medium text-gray-300 mb-1">Gerakan Kamera</label>
                <select
                  id="gerakanKamera"
                  value={gerakanKamera}
                  onChange={(e) => setGerakanKamera(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {gerakanKameraOptions.map(option => (
                    <option key={option} value={option}>{option || "Pilih..."}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="tipeShot" className="block text-sm font-medium text-gray-300 mb-1">Tipe Shot/Komposisi</label>
                <select
                  id="tipeShot"
                  value={tipeShot}
                  onChange={(e) => setTipeShot(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {tipeShotOptions.map(option => (
                    <option key={option} value={option}>{option || "Pilih..."}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="fokus" className="block text-sm font-medium text-gray-300 mb-1">Fokus</label>
                <select
                  id="fokus"
                  value={fokus}
                  onChange={(e) => setFokus(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {fokusOptions.map(option => (
                    <option key={option} value={option}>{option || "Pilih..."}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Bagian 4: Nuansa & Makna */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <Mic className="w-6 h-6 mr-2 text-red-300" /> Nuansa & Makna
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="emosiSuasana" className="block text-sm font-medium text-gray-300 mb-1">Emosi/Suasana</label>
                <input
                  type="text"
                  id="emosiSuasana"
                  value={emosiSuasana}
                  onChange={(e) => setEmosiSuasana(e.target.value)}
                  placeholder="Contoh: Nostalgia dan sedikit melankolis"
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="temaMakna" className="block text-sm font-medium text-gray-300 mb-1">Tema/Makna (Opsional)</label>
                <input
                  type="text"
                  id="temaMakna"
                  value={temaMakna}
                  onChange={(e) => setTemaMakna(e.target.value)}
                  placeholder="Contoh: kehilangan dan kenangan yang indah"
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Bagian 5: Audio & Dialog */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <Volume2 className="w-6 h-6 mr-2 text-orange-300" /> Audio & Dialog
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="jenisAudioMusik" className="block text-sm font-medium text-gray-300 mb-1">Jenis Audio/Musik</label>
                <select
                  id="jenisAudioMusik"
                  value={jenisAudioMusik}
                  onChange={(e) => setJenisAudioMusik(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-blue-500 focus:border-blue-500"
                >
                  {jenisAudioMusikOptions.map(option => (
                    <option key={option} value={option}>{option || "Pilih..."}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="dialogNarasi" className="block text-sm font-medium text-gray-300 mb-1">Dialog/Narasi Spesifik</label>
                <textarea
                  id="dialogNarasi"
                  value={dialogNarasi}
                  onChange={(e) => setDialogNarasi(e.target.value)}
                  placeholder="Contoh: 'Ini adalah awal dari segalanya...' atau 'Suara bisikan misterius di latar belakang.'"
                  rows="2"
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
          </section>

          {/* Output Prompt */}
          <section className="bg-gray-900 p-6 rounded-lg shadow-inner border border-gray-700">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center">
              <Film className="w-6 h-6 mr-2 text-yellow-300" /> Prompt yang Dihasilkan
            </h2>
            <div className="relative">
              <div
                ref={promptOutputRef}
                className="w-full min-h-[120px] p-4 pr-12 bg-gray-700 border border-gray-600 rounded-md text-gray-200 text-sm sm:text-base leading-relaxed overflow-auto resize-y"
                style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
              >
                {generatedPrompt || "Isi kolom di atas untuk menghasilkan prompt..."}
              </div>
              <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                aria-label="Salin prompt"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
            {copySuccess && (
              <p className="mt-2 text-sm text-green-400 text-center animate-fade-in-down">
                {copySuccess}
              </p>
            )}
          </section>

          {/* Bagian Donasi (BARU) */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-inner text-center">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white flex items-center justify-center">
              <Heart className="w-6 h-6 mr-2 text-pink-400" /> Dukung Kami
            </h2>
            <p className="text-gray-300 mb-6">
              Jika aplikasi ini membantu Anda dalam menciptakan prompt yang sinematik, pertimbangkan untuk memberikan donasi kecil untuk mendukung pengembangan lebih lanjut.
            </p>
            <a
              href="https://www.buymeacoffee.com/yourusername" // Ganti dengan tautan donasi Anda yang sebenarnya!
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Heart className="w-5 h-5 mr-2" />
              Donasi Sekarang
            </a>
            <p className="mt-4 text-sm text-gray-400">
              *Ganti tautan "Buy Me a Coffee" di atas dengan tautan donasi Anda yang sebenarnya (misalnya, Ko-fi, Patreon, atau tautan pembayaran langsung).
            </p>
          </section>
        </main>

        <footer className="bg-gray-900 p-4 text-center text-gray-500 text-sm border-t border-gray-700">
          Dibuat dengan ❤️ untuk inspirasi sinematik Anda.
        </footer>
      </div>
    </div>
  );
}

export default App;
