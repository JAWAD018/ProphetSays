import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Card from './Card';

export default function HadithContainer() {
  const [hadith, setHadith] = useState(null);
  const [meta , setMeta]= useState(null);

  return (
    <div className="bg-[#F7FFFA] flex-grow overflow-auto px-4 py-6 min-h-0">
      <h1 className='text-2xl text-center mt-5 text-green-700 font-mono font-bold '>ProphetSays</h1>
      <SearchBar setHadith={setHadith} setMeta={setMeta} />
      {hadith && (
        <Card
          collection={hadith.name || "NA" }
          section={Object.values(hadith.section)[0] || "NA"} 
          grades={meta.grades || "NA"}
          hadithNumber={meta.hadithnumber || "NA"}
          text={meta.text || "NA"}
          bookReference={meta.reference.book || "NA"}
          hadithReference={meta.reference.hadith || "NA"}
        />
      )}
    </div>
  );
}
