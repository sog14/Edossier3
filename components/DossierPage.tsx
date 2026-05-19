
import React from 'react';
import { DossierState, FAMILY_KEYS, DIGITAL_KEYS, DOC_KEYS, HABIT_KEYS } from '../types';

interface DossierPageProps {
  state: DossierState;
}

export const DossierPage: React.FC<DossierPageProps> = ({ state }) => {
  const { fields, photos, extraPhotos, videos, audio, reportType, bailHistory } = state;

  const getLabel = (n: number) => {
    const labels: Record<number, string> = {
      1: 'नाम/उपनाम (Name/Alias)',
      2: 'पिता का नाम (Father\'s Name)',
      3: 'जन्म तिथि/स्थान (DOB/Place)',
      4: 'लिंग (Gender)',
      5: 'पहचान चिन्ह (Identity Mark)',
      6: 'धर्म / जाति (Religion / Caste)',
      7: 'स्थायी पता (Permanent Address)',
      8: 'वर्तमान पता (Current Address)',
      9: 'शैक्षणिक योग्यता (Educational Qual)',
      10: 'भाषा (Language Proficiency)',
      11: 'मोबाईल नम्बर/आई.एम.ई. (Mobile/IMEI)',
      12: 'पारिवारिक विवरणी (Family Details)',
      14: 'आदतें (Habits)',
      15: 'वैवाहिक स्थिति (Marital Status)',
      16: 'अन्य महत्वपूर्ण संबंधी (Other Relations)',
      18: 'आर्थिक स्थिति (Economic Status)',
      19: 'सम्पति विवरणी (Asset Details)',
      20: 'वाहन विवरण (Vehicle Details)',
      21: 'समाजिक प्रभाव (Social Influence)',
      22: 'अपराध शैली (Modus Operandi)',
      23: 'अपराध क्षेत्र (Area of Operation)',
      24: 'अपराधिक इतिहास (Criminal History)',
      25: 'सहयोगी विवरण (Associate Details)',
      26: 'छिपने का स्थान (Hideouts)',
      27: 'संरक्षणदाता (Protectors/Sponsors)',
      28: 'आर्थिक सहयोगी (Financial Supporters)',
      29: 'पूर्व गिरफ़्तारी की विवरणी (Criminal history)',
      30: 'वर्तमान गिरफ़्तारी की विवरणी (Details of arrest)',
      31: 'गिरोह का सदस्य (Gang members)',
      32: 'गैंग के सदस्यों का आगामी आपराधिक योजना (Future planning of gang)',
      33: 'गैंग के पास किस प्रकार का हथियार है (Types of weapon gang have)',
      34: 'तकनिकी ज्ञान (Digital Details)',
      35: 'दस्तावेज (Docs)',
      36: 'जेल विवरणी (Jail Details)',
      37: 'अन्य महत्वपूर्ण जानकारी',
      38: 'INTERROGATION REPORT',
      39: 'Team Detail / Sign'
    };
    return labels[n] || '';
  };

  if (reportType === 'BAIL MONITORING') {
    return (
      <div className="text-black leading-tight">
        <div className="text-center font-bold text-2xl mb-6 underline decoration-double uppercase">BAIL MONITORING REPORT</div>
        
        <table className="w-full border-collapse border-2 border-black text-[11px]">
          <tbody className="page-break-avoid">
            <tr>
              <td className="border border-black w-8 text-center font-bold">1</td>
              <td className="border border-black w-48 font-bold p-2 bg-gray-50">नाम/उपनाम (Name/Alias)</td>
              <td className="border border-black p-2 whitespace-pre-wrap font-bold text-sm">{fields.bail_name}</td>
            </tr>
            <tr>
              <td className="border border-black text-center font-bold">2</td>
              <td className="border border-black font-bold p-2 bg-gray-50">सत्यापन का दिनांक/समय (Verification Date/Time)</td>
              <td className="border border-black p-2 whitespace-pre-wrap">{fields.bail_datetime}</td>
            </tr>
            <tr>
              <td className="border border-black text-center font-bold">3</td>
              <td className="border border-black font-bold p-2 bg-gray-50">जी०पी०एस० (GPS Location)</td>
              <td className="border border-black p-2 whitespace-pre-wrap">{fields.bail_gps}</td>
            </tr>
          </tbody>
          <tbody className="page-break-avoid">
            <tr>
              <td className="border border-black text-center font-bold" rowSpan={6}>4</td>
              <td className="border border-black font-bold p-2 bg-blue-50 uppercase text-xs">अपराधी की वर्तमान स्थिति (Present Status)</td>
              <td className="border border-black bg-blue-50"></td>
            </tr>
            <tr>
              <td className="border border-black p-2 italic bg-gray-50 pl-4">(i) वर्तमान में कहाँ रह रहा है (Living at)</td>
              <td className="border border-black p-2 whitespace-pre-wrap">{fields.bail_living}</td>
            </tr>
            <tr>
              <td className="border border-black p-2 italic bg-gray-50 pl-4">(ii) व्यवसाय (Occupation)</td>
              <td className="border border-black p-2 whitespace-pre-wrap">{fields.bail_occupation}</td>
            </tr>
            <tr>
              <td className="border border-black p-2 italic bg-gray-50 pl-4">(iii) आपराधिक गतिविधि (Criminal activity)</td>
              <td className="border border-black p-2 whitespace-pre-wrap">{fields.bail_activity}</td>
            </tr>
            <tr>
              <td className="border border-black p-2 italic bg-gray-50 pl-4">(iv) आय का स्रोत (Means of income)</td>
              <td className="border border-black p-2 whitespace-pre-wrap">{fields.bail_income}</td>
            </tr>
            <tr>
              <td className="border border-black p-2 italic bg-gray-50 pl-4">(v) अन्य जानकारी (Other information)</td>
              <td className="border border-black p-2 whitespace-pre-wrap">{fields.bail_other}</td>
            </tr>
          </tbody>
          <tbody className="page-break-avoid">
            <tr>
              <td className="border border-black text-center font-bold">5</td>
              <td className="border border-black font-bold p-2 bg-gray-50">सत्यापनकर्ता (Verification done by)</td>
              <td className="border border-black p-2 whitespace-pre-wrap">{fields.bail_verifier}</td>
            </tr>
          </tbody>
        </table>

        {/* Verification Photos */}
        <div className="mt-8 border-t-4 border-black pt-4 no-print">
          <h3 className="font-bold text-lg underline uppercase mb-3">Verification & Field Evidence (Non-Print)</h3>
          <div className="grid grid-cols-2 gap-4">
            {extraPhotos.map((url, i) => (
              <div key={i} className="border-2 border-black p-1 flex flex-col items-center page-break-avoid">
                <img src={url} className="max-w-full h-auto object-contain max-h-[300px]" alt={`Field Verification ${i + 1}`} />
                <div className="w-full bg-black/10 text-center py-1 mt-1">
                  <span className="text-[10px] font-bold uppercase">VERIFICATION PHOTO {i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Multimedia Assets */}
        <div className="no-print mt-12 pt-8 border-t-2 border-dashed border-gray-400">
          <h3 className="text-xl font-bold text-indigo-700 underline uppercase mb-4">Multimedia Assets (Reference Only)</h3>
          
          {videos.length > 0 && (
            <div className="mb-8">
              <h4 className="text-sm font-bold mb-2">Attached Videos:</h4>
              <div className="grid grid-cols-1 gap-4">
                {videos.map((url, i) => (
                  <div key={i} className="border p-2 bg-gray-50 page-break-avoid">
                    <video src={url} controls className="w-full max-h-[400px] rounded shadow-sm bg-black" />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-[10px] font-bold">Video Sample {i+1}</p>
                      <a 
                        href={url} 
                        download={`video_sample_${i+1}.mp4`} 
                        className="text-[10px] bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700 font-bold transition-colors shadow-sm"
                      >
                        Download Video
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {audio.length > 0 && (
            <div>
              <h4 className="text-sm font-bold mb-2">Attached Voice Samples:</h4>
              <div className="flex flex-col gap-2">
                {audio.map((url, i) => (
                  <div key={i} className="border p-2 bg-gray-50 flex items-center justify-between gap-4 page-break-avoid">
                    <audio controls src={url} className="h-8 flex-1" />
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-bold">Voice Sample {i+1}</span>
                      <a 
                        href={url} 
                        download={`voice_sample_${i+1}.wav`} 
                        className="text-[10px] bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 font-bold transition-colors shadow-sm"
                      >
                        Download Audio
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bail Monitoring History Log */}
        <div className="no-print mt-12 pt-8 border-t-2 border-dashed border-gray-400">
          <h3 className="text-xl font-bold text-indigo-700 underline uppercase mb-4">Bail Verification Log (Internal History)</h3>
          <div className="space-y-4">
            {bailHistory.length > 0 ? (
              bailHistory.map((entry, idx) => (
                <div key={idx} className="p-3 border border-gray-200 bg-gray-50 rounded-lg text-[10px] page-break-avoid">
                  <div className="flex justify-between items-center border-b pb-1 mb-2">
                    <span className="font-bold text-indigo-800">{entry.date}</span>
                    <span className="text-gray-500">Log Entry #{bailHistory.length - idx}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <p><strong>Name:</strong> {entry.name}</p>
                    <p><strong>GPS:</strong> {entry.gps}</p>
                    <p><strong>Living At:</strong> {entry.living}</p>
                    <p><strong>Occupation:</strong> {entry.occupation}</p>
                    <p><strong>Activity:</strong> {entry.activity}</p>
                    <p><strong>Income:</strong> {entry.income}</p>
                    <p className="col-span-2"><strong>Other:</strong> {entry.other}</p>
                    <p className="col-span-2 text-right italic"><strong>Verifier:</strong> {entry.verifier}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs italic text-gray-400">No verification history available.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-black leading-tight">
      <div className="text-center font-bold text-2xl mb-6 underline decoration-double uppercase">{reportType}</div>
      
      <table className="w-full border-collapse border-2 border-black text-[11px]">
        <tbody className="page-break-avoid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
            <tr key={n}>
              <td className="border border-black w-8 text-center font-bold">{n}</td>
              <td className="border border-black w-48 font-bold p-1 bg-gray-50">{getLabel(n)}</td>
              <td className="border border-black p-1 whitespace-pre-wrap align-top">{fields[`f${n}`]}</td>
              {n === 1 && (
                <td rowSpan={10} className="border border-black w-40 bg-gray-50 p-1">
                  <div className="flex flex-col gap-1 items-center">
                    <PhotoBox src={photos.p1} label="Front View" />
                    <PhotoBox src={photos.p2} label="Side View (L)" />
                    <PhotoBox src={photos.p3} label="Side View (R)" />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
        
        <tbody className="page-break-avoid">
          <tr>
            <td className="border border-black w-8 text-center font-bold">11</td>
            <td className="border border-black font-bold p-1 bg-gray-50">{getLabel(11)}</td>
            <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields.f11}</td>
          </tr>
        </tbody>

        <tbody className="page-break-avoid">
          <tr>
            <td className="border border-black text-center font-bold" rowSpan={FAMILY_KEYS.length + 2}>12</td>
            <td className="border border-black font-bold p-1 bg-gray-100 uppercase text-[9px]" colSpan={3}>
              पारिवारिक विवरणी (Family Details)
            </td>
          </tr>
          {FAMILY_KEYS.map((key, idx) => {
            const label = key.includes('(') ? key : (key === 'ChildrenDetail' ? 'Children Detail' : `${key} Detail`);
            return (
              <tr key={key}>
                <td className="border border-black font-bold p-1 italic pl-4 bg-gray-50">{idx + 1}. {label}</td>
                <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields[`f12_${key}`]}</td>
              </tr>
            );
          })}
          <tr>
            <td className="border border-black font-bold p-1 italic pl-4 bg-blue-50">GR (Home)</td>
            <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap font-bold">{fields.f12_home_gr}</td>
          </tr>
        </tbody>

        <tbody className="page-break-avoid">
          <tr>
            <td className="border border-black text-center font-bold" rowSpan={2}>13</td>
            <td className="border border-black p-1 italic bg-gray-50 pl-4">1. फोटाग्राफ लेने की तिथि</td>
            <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields.f13_PhotoDate}</td>
          </tr>
          <tr>
            <td className="border border-black p-1 italic bg-gray-50 pl-4">2. चक्रा एप में प्रविष्टि</td>
            <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields.f13_ChakraApp}</td>
          </tr>
        </tbody>

        <tbody className="page-break-avoid">
          <tr>
            <td className="border border-black text-center font-bold" rowSpan={HABIT_KEYS.length + 1}>14</td>
            <td className="border border-black font-bold p-1 bg-gray-50 uppercase text-[9px]">{getLabel(14)}</td>
            <td colSpan={2} className="border border-black bg-gray-50"></td>
          </tr>
          {HABIT_KEYS.map((key, idx) => (
            <tr key={key}>
              <td className="border border-black p-1 italic bg-gray-50 pl-4">{idx + 1}. {key}</td>
              <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields[`f14_${key}`]}</td>
            </tr>
          ))}
        </tbody>

        <tbody className="page-break-avoid">
          <tr>
            <td className="border border-black text-center font-bold" rowSpan={4}>15</td>
            <td className="border border-black font-bold p-1 bg-gray-50 uppercase text-[9px]">{getLabel(15)}</td>
            <td colSpan={2} className="border border-black bg-gray-50"></td>
          </tr>
          <tr>
            <td className="border border-black p-1 italic bg-gray-50 pl-4">1. वैवाहिक स्थिति</td>
            <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields.f15_Status}</td>
          </tr>
          <tr>
            <td className="border border-black p-1 italic bg-gray-50 pl-4">2. ससुर विवरणी</td>
            <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields.f15_FatherInLaw}</td>
          </tr>
          <tr>
            <td className="border border-black p-1 italic bg-gray-50 pl-4">3. साला विवरणी</td>
            <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields.f15_BrotherInLaw}</td>
          </tr>
        </tbody>

        <tbody className="page-break-avoid">
          <tr>
            <td className="border border-black text-center font-bold">16</td>
            <td className="border border-black font-bold p-1 bg-gray-50">{getLabel(16)}</td>
            <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields.f16}</td>
          </tr>
        </tbody>

        <tbody className="page-break-avoid">
          <tr>
            <td className="border border-black text-center font-bold" rowSpan={2}>17</td>
            <td className="border border-black p-1 italic bg-gray-50 pl-4">1. वकील पैरोकार</td>
            <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields.f17_Lawyer}</td>
          </tr>
          <tr>
            <td className="border border-black p-1 italic bg-gray-50 pl-4">2. जमानतदार विवरणी</td>
            <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields.f17_Guarantor}</td>
          </tr>
        </tbody>

        {/* Sections 18-29 - Individual tbodies to allow breaks between them but not inside them */}
        {[18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29].map(n => (
          <tbody key={n} className="page-break-avoid">
            <tr>
              <td className="border border-black text-center font-bold">{n}</td>
              <td className="border border-black font-bold p-1 bg-gray-50">{getLabel(n)}</td>
              <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields[`f${n}`]}</td>
            </tr>
          </tbody>
        ))}

        <tbody className="page-break-avoid">
          <tr>
            <td className="border border-black text-center font-bold" rowSpan={5}>30</td>
            <td className="border border-black font-bold p-1 bg-blue-50 uppercase text-[9px]">{getLabel(30)}</td>
            <td colSpan={2} className="border border-black bg-blue-50"></td>
          </tr>
          {[
            'घटना का संक्षिप्त विवरण (Details of event)', 
            'घटना कारित करने का मंशा (Intention)', 
            'घटना मे संलिप्त का नाम (co-offender)', 
            'Confession की संक्षिप्त विवरणी'
          ].map((s, idx) => (
            <tr key={s}>
              <td className="border border-black p-1 italic bg-gray-50 pl-4">{idx + 1}. {s}</td>
              <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields[`f30_sub${idx+1}`]}</td>
            </tr>
          ))}
        </tbody>

        {[31, 32, 33].map(n => (
          <tbody key={n} className="page-break-avoid">
            <tr>
              <td className="border border-black text-center font-bold">{n}</td>
              <td className="border border-black font-bold p-1 bg-gray-50">{getLabel(n)}</td>
              <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields[`f${n}`]}</td>
            </tr>
          </tbody>
        ))}

        <tbody className="page-break-avoid">
          <tr>
            <td className="border border-black text-center font-bold" rowSpan={DIGITAL_KEYS.length + 1}>34</td>
            <td className="border border-black font-bold p-1 bg-blue-50 underline uppercase text-xs">{getLabel(34)}</td>
            <td colSpan={2} className="border border-black bg-blue-50"></td>
          </tr>
          {DIGITAL_KEYS.map((key, idx) => (
            <tr key={key}>
              <td className="border border-black p-1 italic bg-gray-50 pl-4">{idx + 1}. {key} ID/Pass</td>
              <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields[`f34_${key}`]}</td>
            </tr>
          ))}
        </tbody>

        <tbody className="page-break-avoid">
          <tr>
            <td className="border border-black text-center font-bold" rowSpan={DOC_KEYS.length + 1}>35</td>
            <td className="border border-black font-bold p-1 bg-blue-50 underline uppercase text-xs">{getLabel(35)}</td>
            <td colSpan={2} className="border border-black bg-blue-50"></td>
          </tr>
          {DOC_KEYS.map((key, idx) => (
            <tr key={key}>
              <td className="border border-black p-1 italic bg-gray-50 pl-4">{idx + 1}. {key} Details</td>
              <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields[`f35_${key}`]}</td>
            </tr>
          ))}
        </tbody>

        <tbody className="page-break-avoid">
          <tr>
            <td className="border border-black text-center font-bold" rowSpan={2}>36</td>
            <td className="border border-black p-1 italic bg-gray-50 pl-4">1. जेल जाने का विवरणी</td>
            <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields.f36_JailDetail}</td>
          </tr>
          <tr>
            <td className="border border-black p-1 italic bg-gray-50 pl-4">2. E-PRISON से प्राप्त विवरणी</td>
            <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields.f36_EPrison}</td>
          </tr>
        </tbody>

        {[37, 38, 39].map(n => (
          <tbody key={n} className="page-break-avoid">
            <tr>
              <td className="border border-black text-center font-bold">{n}</td>
              <td className="border border-black font-bold p-1 bg-gray-50">{getLabel(n)}</td>
              <td colSpan={2} className="border border-black p-1 whitespace-pre-wrap">{fields[`f${n}`]}</td>
            </tr>
          </tbody>
        ))}
      </table>

      {/* Appendix Section */}
      <div className="mt-8 border-t-4 border-black pt-4 page-break-avoid">
        <h3 className="font-bold text-lg underline uppercase mb-3">Appendix & Supporting Material</h3>
        <div className="text-[10px] whitespace-pre-wrap mb-6 min-h-[100px] p-2 bg-gray-50 border border-gray-200">
          {fields.extra_text || 'No additional appendix data provided.'}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {extraPhotos.map((url, i) => (
            <div key={i} className="border-2 border-black p-1 flex flex-col items-center page-break-avoid">
              <img src={url} className="max-w-full h-auto object-contain max-h-[300px]" alt={`Appendix ${i + 1}`} />
              <span className="text-[9px] font-bold mt-1">EXHIBIT {i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Multimedia Section - Non Print */}
      <div className="no-print mt-12 pt-8 border-t-2 border-dashed border-gray-400">
        <h3 className="text-xl font-bold text-indigo-700 underline uppercase mb-4">Multimedia Assets (Reference Only)</h3>
        {videos.length > 0 && (
          <div className="mb-8">
            <h4 className="text-sm font-bold mb-2">Attached Videos:</h4>
            <div className="grid grid-cols-1 gap-4">
              {videos.map((url, i) => (
                <div key={i} className="border p-2 bg-gray-50 page-break-avoid">
                  <video src={url} controls className="w-full max-h-[400px] rounded bg-black shadow-sm" />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-[10px] font-bold">Video Sample {i+1}</p>
                    <a href={url} download={`video_${i+1}.mp4`} className="text-[10px] bg-indigo-600 text-white px-2 py-1 rounded font-bold">Download</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {audio.length > 0 && (
          <div>
            <h4 className="text-sm font-bold mb-2">Attached Voice Samples:</h4>
            <div className="flex flex-col gap-2">
              {audio.map((url, i) => (
                <div key={i} className="border p-2 bg-gray-50 flex items-center justify-between gap-4 page-break-avoid">
                  <audio controls src={url} className="h-8 flex-1" />
                  <a href={url} download={`voice_${i+1}.wav`} className="text-[10px] bg-green-600 text-white px-2 py-1 rounded font-bold">Download</a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PhotoBox: React.FC<{ src: string | null; label: string }> = ({ src, label }) => (
  <div className="w-full h-32 border border-black bg-white flex flex-col items-center justify-center overflow-hidden relative">
    {src ? (
      <img src={src} className="w-full h-full object-cover" alt={label} />
    ) : (
      <span className="text-[8px] text-gray-400 font-bold uppercase">{label}</span>
    )}
    <div className="absolute bottom-0 w-full bg-black/60 text-white text-[8px] text-center py-0.5">{label}</div>
  </div>
);
