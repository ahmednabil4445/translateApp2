import './TranslationApp.css'; // Your existing CSS file
import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import React, { useState } from 'react';

const TranslationApp = () => {
  const [speakEnglish, setSpeakEnglish] = useState(true);
  const [selectedWord, setSelectedWord] = useState('');
  const [translatedWords, setTranslatedWords] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'ar-SA' });
  let { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const translationMap = {
    'والم': { saudi: 'جاهز', english: 'ready' },
    'مطاريس': { saudi: 'الحوسه', english: 'confused' },
    'الطمل': { saudi: 'مب نظيف', english: 'flatulence' },
    'طس': { saudi: 'اذهب ', english: 'go' },
    'المقرود': { saudi: 'اللي ماله حظ ', english: 'monkey' },
    'تسايد': { saudi: 'يعني كايد وهي الصعب ', english: 'Difficult' },
    'يويق': { saudi: '  يعني ينظر من النافذه ', english: 'looking out the window' },
    'والم وزاهب': { saudi: 'جاهز ومستعد', english: 'Ready and willing' },
    'الخذاريف': { saudi: 'اضغاث احلام ', english: 'Pipe dreams' },
    'مطنقره ومخنفسه': { saudi: 'معصبه حدها ', english: 'He is mad at her limit' },
    'المتختخ': { saudi: ' السمين', english: 'Fat' },
    'بثر': { saudi: ' مزعج وملقوف', english: 'Annoying and disgusting' },
    'رفلا': { saudi: ' قليلة سنع', english: 'A few years old' },
    'انجز': { saudi: ' اخلص او استعجل', english: ' Hurry' },
    'ماينطح': { saudi: ' مايستحمل', english: 'What can be tolerated?' },
    'الرحاه': { saudi: ' لطحن الحبوب', english: 'To grind grains' },
    'الصحفه': { saudi: ' الصحن', english: 'plate' },
    'القربه': { saudi: ' للماء', english: 'Waterproof' },
    'الحلانه': { saudi: ' وهي الدرج', english: 'stairs' },
    'المعزب': { saudi: ' المطبخ ', english: 'kitchen' },
    'المشهف': { saudi: ' للخبزه المقناه', english: 'For baked bread' },
    'المروب': { saudi: ' للمرقه', english: 'For broth' },
    'المصواط': { saudi: ' لتحريك العصيده', english: 'To stir the porridge' },
    'الطفيه': { saudi: ' مكان جمع اللحم', english: 'Place where meat is collected' },
    'القلص': { saudi: ' لوضع الاغراض فيه', english: 'put things' },
    'المقشه': { saudi: ' لتنظيف البيت', english: 'broom' },
    'المهفه': { saudi: ' المروحه للتبريد', english: 'Fan ' },
    'الداوه': { saudi: ' القربه الصغيره', english: 'closeness' },
    'الدلو': { saudi: ' لجلب الماء من البير', english: 'Aquarius' },
    'الطاسه': { saudi: 'السمين', english: 'Fat' },
    'وغدان': { saudi: 'اطفال', english: 'children' },
    'جغمه': { saudi: 'رشفه ', english: 'sip' },
    'دردغان /دردغآنه': { saudi: 'هبله او اهبل', english: 'Goofy' },
    'قِـبَــلْ': { saudi: 'دائما  ', english: 'always' },
    'تبسي': { saudi: 'صحن ', english: 'Dish' },
    'الضو': { saudi: ' نآر التدفئه  ', english: 'fire' },
    'الطمل': { saudi: 'مب نظيف ', english: 'Its not clean' },
    'المقرود': { saudi: ' اللي ماله حظ ', english: 'no luck' },
    'تسايد': { saudi: ' كايد  ', english: 'Difficult' },
    'يويق': { saudi: ' ينظر من النافذه  ', english: 'Looking out the window' },
    'مطنقره ومخنفسه': { saudi: ' معصبه حدها', english: "He's mad at her limit" },
    'المطاريس': { saudi: ' الحوسه  ', english: 'Al Hossa' },
    'بثر': { saudi: ' مزعج وملقوف  ', english: 'Annoying ' },
    'رفلا': { saudi: ' قليلة سنع  ', english: 'A few years old' },
    'ماينطح': { saudi: 'مايستحمل', english: 'What can be tolerated?' },
    'هيتو لنا': { saudi: 'تعالوا لنا', english: 'Come to us' },
    'وصيدها': { saudi: 'قصدها', english: 'He meant it' },
    'قرمة': { saudi: 'شاطرة ', english: 'Sharing' },
    'مدزدي': { saudi: 'يستآهل ', english: "It's worth it" },
    'الخروش': { saudi: 'الخواف  ', english: 'Fear' },
    'غضاره': { saudi: 'كاس كبير  ', english: 'Big cup' },
    'باغة': { saudi: 'كيس', english: 'bag' },
    'سـفره العشـى': { saudi: 'قبيل المغرب بقليل', english: 'before sunset' },
    'صـرمه': { saudi: 'البرد الشديد', english: 'Extreme cold' },
    'الضـحوه': { saudi: 'يعني من الساعة 11 الى اذان الظهر', english: 'noon' },
    'غـبيب': { saudi: 'خربان ', english: 'Ruined' },
  };

  const translateWord = () => {
    if (selectedWord) {
      const saudiTranslation = translationMap[selectedWord]?.saudi || 'Not found';
      const englishTranslation = translationMap[selectedWord]?.english || 'Not found';
      const speakText = speakEnglish ? englishTranslation : saudiTranslation;

      setTranslatedWords([{ arabic: selectedWord, saudi: saudiTranslation, english: englishTranslation }, ...translatedWords]);
      setSelectedWord('');

      const utterance = new SpeechSynthesisUtterance(speakText);
      window.speechSynthesis.speak(utterance);

    }
    else if (transcript) {

      const saudiTranslation = translationMap[transcript]?.saudi || 'Not found';
      const englishTranslation = translationMap[transcript]?.english || 'Not found';
      const speakText = speakEnglish ? englishTranslation : saudiTranslation;

      setTranslatedWords([{ arabic: transcript, saudi: saudiTranslation, english: englishTranslation }, ...translatedWords]);

      const utterance = new SpeechSynthesisUtterance(speakText);
      window.speechSynthesis.speak(utterance);

    }
    else if (searchInput) {
      const saudiTranslation = translationMap[searchInput]?.saudi || 'Not found';
      const englishTranslation = translationMap[searchInput]?.english || 'Not found';
      const speakText = speakEnglish ? englishTranslation : saudiTranslation;

      setTranslatedWords([{ arabic: searchInput, saudi: saudiTranslation, english: englishTranslation }, ...translatedWords]);

      const utterance = new SpeechSynthesisUtterance(speakText);
      window.speechSynthesis.speak(utterance);
    }
    else if (!selectedWord || !translationMap[selectedWord]) {
      alert('Please select a valid word to translate.');
      return;
    }
  };

  const handleSelectChange = (event) => {
    setSelectedWord(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredWords = Object.keys(translationMap).filter((word) =>
    word.toLowerCase().includes(searchInput.toLowerCase())
  );

  const tableContent = translatedWords.map((word, index) => (
    <tr key={index}>
      <td>{word.saudi}</td>
      <td>{word.arabic}</td>
      <td>{word.english}</td>
    </tr>
  ));

  if (!browserSupportsSpeechRecognition) {
    return null
  }
  return (
    <div className="translation-app">
      <h1>Arabic-Saudi-English Translator</h1>
      { }
      <div className="search-bar">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Search Saudi words"
          className="search-input"
        />
      </div>
      <div className="search-bar" id="myInput">
        <input
          type="text"
          value={transcript}
          onChange={handleSearchInputChange}
          placeholder="Record your voice to recognize"
          className="search-input"
        />
      </div>
      <div className="btn-style">

        <button onClick={startListening}>Start Listening</button>
        <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>

      </div>

      <div className="select-translate">
        <select className="select-box" value={selectedWord} onChange={handleSelectChange}>
          <option value="">Select a Saudi word</option>
          {filteredWords.map((word, index) => (
            <option key={index} value={word}>{word}</option>
          ))}
        </select>
        <button className="translate-btn" onClick={translateWord}>Translate</button>
      </div>

      <div className="translated-words">
        <table>
          <thead>
            <tr>
              <th>Arabic</th>
              <th>Saudi</th>
              <th>English</th>
            </tr>
          </thead>
          <tbody>
            {tableContent}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default TranslationApp;