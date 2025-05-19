import {Book } from 'lucide-react';

export default function Card({ 
  collection = "Sunan Abu Dawud",
  section = "Prayer (Kitab Al-Salat)",
  hadithNumber = "1035",
  text = "This tradition (mentioned above)...",
  grades = [
    { scholar: "Al-Albani", grade: "Sahih" },
    { scholar: "Zubair Ali Zai", grade: "Sahih Bukhari (1224)" }
  ],
  bookReference ="1",
  hadithReference = "Book 2, Hadith 646"
}) {

  

  return (
    <div className="flex justify-center w-full p-4">
      <div className="max-w-md w-full bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
        {/* Header */}
        <div className="bg-emerald-600 px-6 py-4 flex items-center">
          <div className="flex items-center space-x-2">
            <Book className="text-white" size={20} />
            <h2 className="text-xl font-bold text-white">{collection}</h2>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-600 font-medium">Section:</p>
              <p className="text-gray-800">{section}</p>
            </div>
            
            <div className="flex justify-between">
              <p className="text-gray-600 font-medium">Hadith Number:</p>
              <p className="text-gray-800">{hadithNumber}</p>
            </div>
          </div>
          
          <div className="py-3 border-t border-b border-gray-200">
            <p className="text-gray-800 italic font-semibold text-xl">{text}</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">Grades:</h3>
            <ul className="space-y-1 pl-6 list-disc text-gray-800">
              {grades.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span>{item.name}: <span className="font-medium text-emerald-600">{item.grade}</span><br/></span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-200">
            <div className="flex items-center space-x-1 text-gray-600">
              <span className="font-medium">Reference:</span>
              <span>Book : {bookReference}</span>
              <span>Hadith :    {hadithReference}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}