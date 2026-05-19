import React from 'react';
import { DossierState, FAMILY_KEYS, DIGITAL_KEYS, DOC_KEYS, HABIT_KEYS } from '../types';

interface DataEntryProps {
  state: DossierState;
  onFieldChange: (name: string, value: string) => void;
  onPhotoUpload: (slot: 'p1' | 'p2' | 'p3', base64: string) => void;
  onRemovePhoto: (slot: 'p1' | 'p2' | 'p3') => void;
  onExtraPhotos: (photos: string[]) => void;
  onRemoveExtraPhoto: (index: number) => void;
  onVideoUpload: (videos: string[]) => void;
  onRemoveVideo: (index: number) => void;
  onAudioUpload: (audios: string[]) => void;
  onRemoveAudio: (index: number) => void;
  onAddToBailHistory?: () => void;
}

export const DataEntry: React.FC<DataEntryProps> = ({ 
  state, onFieldChange, onPhotoUpload, onRemovePhoto, onExtraPhotos, onRemoveExtraPhoto,
  onVideoUpload, onRemoveVideo, onAudioUpload, onRemoveAudio, onAddToBailHistory
}) => {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, slot: 'p1' | 'p2' | 'p3') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoUpload(slot, reader.result as string);
        e.target.value = ''; // Reset input to allow re-upload of same file
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>, callback: (urls: string[]) => void) => {
    const files = Array.from(e.target.files || []) as File[];
    const promises = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((urls) => {
      callback(urls);
      e.target.value = ''; // Reset input
    });
  };

  const fetchGPS = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
        onFieldChange('bail_gps', coords);
      }, (error) => {
        alert("Unable to retrieve location: " + error.message);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const labels: Record<number, string> = {
    1: 'नाम/उपनाम (Name)',
    2: 'पिता का नाम (Father Name)',
    3: 'जन्म तिथि/स्थान (DOB/Place)',
    4: 'लिंग (Gender)',
    5: 'पहचान चिन्ह (ID Mark)',
    6: 'धर्म / जाति (Religion/Caste)',
    7: 'स्थायी पता (Perm Address)',
    8: 'वर्तमान पता (Curr Address)',
    9: 'शैक्षणिक योग्यता (Edu)',
    10: 'भाषा (Language)',
    11: 'मोबाईल नम्बर/आई.एम.ई.',
    12: 'पारिवारिक विवरणी (Family Details)',
    14: 'आदतें (Habits)',
    15: 'वैवाहिक स्थिति (Marital Status)',
    16: 'अन्य महत्वपूर्ण संबंधी',
    18: 'आर्थिक स्थिति',
    19: 'सम्पति विवरणी',
    20: 'वाहन विवरण',
    21: 'समाजिक प्रभाव',
    22: 'अपराध शैली',
    23: 'अपराध क्षेत्र',
    24: 'अपराधिक इतिहास',
    25: 'सहयोगी विवरण',
    26: 'छिपने का स्थान',
    27: 'संरक्षणदाता',
    28: 'आर्थिक सहयोगी',
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
    39: 'Team Detail / Sign',
    40: 'GR (Grid Reference)'
  };

  // Bail Monitoring Form
  if (state.reportType === 'BAIL MONITORING') {
    return (
      <div className="space-y-6 pb-20">
        <section className="bg-white p-4 border border-gray-100 rounded-lg shadow-sm">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 border-b pb-1">Bail Monitoring Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 block mb-1">नाम/उपनाम (Name/Alias)</label>
              <textarea
                name="bail_name"
                value={state.fields.bail_name || ''}
                onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                className="w-full border border-gray-200 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 block mb-1">सत्यापन का दिनांक/समय (Verification Date/Time)</label>
              <input
                type="text"
                name="bail_datetime"
                value={state.fields.bail_datetime || ''}
                onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                className="w-full border border-gray-200 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 block mb-1">जी०पी०एस० (GPS Location)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="bail_gps"
                  value={state.fields.bail_gps || ''}
                  onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                  className="flex-1 border border-gray-200 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
                <button 
                  onClick={fetchGPS}
                  className="bg-blue-600 text-white text-[10px] px-3 py-1 rounded font-bold hover:bg-blue-700"
                >
                  Fetch Current
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-50">
              <label className="text-[10px] font-bold text-blue-600 uppercase block mb-2">अपराधी की वर्तमान स्थिति (Present Status)</label>
              
              <div className="ml-2 space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">(i) वर्तमान में कहाँ रह रहा है (Living at)</label>
                  <textarea
                    name="bail_living"
                    value={state.fields.bail_living || ''}
                    onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                    className="w-full border border-gray-200 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none h-12"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">(ii) व्यवसाय (Occupation)</label>
                  <textarea
                    name="bail_occupation"
                    value={state.fields.bail_occupation || ''}
                    onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                    className="w-full border border-gray-200 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none h-12"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">(iii) आपराधिक गतिविधि (Activity)</label>
                  <textarea
                    name="bail_activity"
                    value={state.fields.bail_activity || ''}
                    onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                    className="w-full border border-gray-200 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none h-12"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">(iv) आय का स्रोत (Income Source)</label>
                  <textarea
                    name="bail_income"
                    value={state.fields.bail_income || ''}
                    onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                    className="w-full border border-gray-200 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none h-12"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1">(v) अन्य जानकारी (Other Info)</label>
                  <textarea
                    name="bail_other"
                    value={state.fields.bail_other || ''}
                    onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                    className="w-full border border-gray-200 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none h-16"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-50">
              <label className="text-[10px] font-bold text-gray-400 block mb-1">सत्यापनकर्ता (Verification Done By)</label>
              <textarea
                name="bail_verifier"
                value={state.fields.bail_verifier || ''}
                onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                className="w-full border border-gray-200 rounded p-2 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={onAddToBailHistory}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded shadow-md transition-all text-xs uppercase"
              >
                Add Verification to History Log
              </button>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 p-4 rounded-lg space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Attached Verification Photos (Bottom Section)</label>
            <input type="file" multiple accept="image/*" onChange={(e) => handleMultipleFiles(e, onExtraPhotos)} className="w-full text-xs mb-2" />
            <div className="flex flex-wrap gap-2">
              {state.extraPhotos.map((url, i) => (
                <div key={i} className="relative group">
                  <img src={url} className="w-12 h-12 object-cover border rounded" />
                  <button 
                    onClick={() => onRemoveExtraPhoto(i)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[8px] flex items-center justify-center hover:bg-red-600"
                  >✕</button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-300">
            <h3 className="text-sm font-bold text-indigo-800 uppercase mb-3">Multimedia Evidence (Bail)</h3>
            
            <div className="mb-4">
              <label className="text-[10px] font-bold text-gray-500 block mb-1">Video Samples</label>
              <input type="file" multiple accept="video/*" onChange={(e) => handleMultipleFiles(e, onVideoUpload)} className="w-full text-xs mb-2" />
              <div className="flex flex-wrap gap-2">
                {state.videos.map((_, i) => (
                  <div key={i} className="bg-indigo-50 text-indigo-700 text-[10px] px-2 py-1 rounded border border-indigo-200 flex items-center gap-2">
                    <span>Video {i + 1}</span>
                    <button onClick={() => onRemoveVideo(i)} className="text-red-500 font-bold">✕</button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-500 block mb-1">Voice Samples</label>
              <input type="file" multiple accept="audio/*" onChange={(e) => handleMultipleFiles(e, onAudioUpload)} className="w-full text-xs mb-2" />
              <div className="flex flex-wrap gap-2">
                {state.audio.map((_, i) => (
                  <div key={i} className="bg-green-50 text-green-700 text-[10px] px-2 py-1 rounded border border-green-200 flex items-center gap-2">
                    <span>Voice {i + 1}</span>
                    <button onClick={() => onRemoveAudio(i)} className="text-red-500 font-bold">✕</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Standard E-Dossier / Interrogation Form
  return (
    <div className="space-y-6 pb-20">
      <section className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <h3 className="text-sm font-bold text-blue-800 uppercase mb-3">Photo Identification</h3>
        <div className="grid grid-cols-1 gap-4">
          {(['p1', 'p2', 'p3'] as const).map((p, i) => (
            <div key={p} className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold text-blue-400 block">Angle {i + 1}</label>
              <div className="flex items-center gap-2">
                <input type="file" onChange={(e) => handleFile(e, p)} className="flex-1 text-xs" />
                {state.photos[p] && (
                  <button 
                    onClick={() => onRemovePhoto(p)}
                    className="bg-red-500 text-white text-[10px] px-2 py-1 rounded hover:bg-red-600 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
              {state.photos[p] && (
                <img src={state.photos[p]!} className="w-16 h-12 object-cover border rounded shadow-sm" alt={`Preview ${i+1}`} />
              )}
            </div>
          ))}
        </div>
      </section>

      {Array.from({ length: 40 }, (_, i) => i + 1).map(n => {
        const showTextarea = labels[n] !== undefined;
        // Primary rows for these fields are strictly headings
        const headerOnlyFields = [12, 14, 15, 30, 34, 35];

        return (
          <div key={n} className="p-4 border border-gray-100 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded">SL {n}</span>
              <span className="text-xs font-bold text-gray-700">{labels[n] || `Section ${n}`}</span>
            </div>

            {showTextarea && !headerOnlyFields.includes(n) && (
              <div className="flex flex-col gap-2">
                <textarea
                  name={`f${n}`}
                  value={state.fields[`f${n}`] || ''}
                  onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                  className="w-full border border-gray-200 rounded p-2 text-xs h-16 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  placeholder={`Detailed notes for serial ${n}...`}
                />
                {n === 40 && (
                  <button
                    onClick={() => {
                      if ("geolocation" in navigator) {
                        navigator.geolocation.getCurrentPosition((position) => {
                          const coords = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
                          onFieldChange('f40', coords);
                        }, (error) => {
                          alert("Unable to retrieve location: " + error.message);
                        });
                      } else {
                        alert("Geolocation is not supported by your browser.");
                      }
                    }}
                    className="self-start bg-blue-600 text-white text-[10px] px-3 py-1 rounded font-bold hover:bg-blue-700 transition-colors"
                  >
                    Get Current Location
                  </button>
                )}
              </div>
            )}

            {n === 12 && FAMILY_KEYS.map((s, idx) => (
              <div key={s} className="mt-2">
                <label className="text-[10px] text-gray-400">12.{idx + 1} {s}</label>
                <textarea
                  name={`f12_${s}`}
                  value={state.fields[`f12_${s}`] || ''}
                  onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                  className="w-full border border-gray-200 rounded p-1 text-[10px] h-8 focus:h-16 transition-all"
                />
              </div>
            ))}

            {n === 13 && ['PhotoDate', 'ChakraApp'].map((s, idx) => (
              <div key={s} className="mt-2">
                <label className="text-[10px] text-gray-400">13.{idx + 1} {s}</label>
                <textarea
                  name={`f13_${s}`}
                  value={state.fields[`f13_${s}`] || ''}
                  onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                  className="w-full border border-gray-200 rounded p-1 text-[10px] h-8 focus:h-16 transition-all"
                />
              </div>
            ))}

            {n === 14 && HABIT_KEYS.map(s => (
              <div key={s} className="mt-2">
                <label className="text-[10px] text-gray-400">Habit: {s}</label>
                <textarea
                  name={`f14_${s}`}
                  value={state.fields[`f14_${s}`] || ''}
                  onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                  className="w-full border border-gray-200 rounded p-1 text-[10px] h-8 focus:h-16 transition-all"
                />
              </div>
            ))}

            {n === 15 && ['Status', 'FatherInLaw', 'BrotherInLaw'].map(s => (
              <div key={s} className="mt-2">
                <label className="text-[10px] text-gray-400">15. {s}</label>
                <textarea
                  name={`f15_${s}`}
                  value={state.fields[`f15_${s}`] || ''}
                  onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                  className="w-full border border-gray-200 rounded p-1 text-[10px] h-8 focus:h-16 transition-all"
                />
              </div>
            ))}

            {n === 17 && ['Lawyer', 'Guarantor'].map(s => (
              <div key={s} className="mt-2">
                <label className="text-[10px] text-gray-400">17. {s}</label>
                <textarea
                  name={`f17_${s}`}
                  value={state.fields[`f17_${s}`] || ''}
                  onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                  className="w-full border border-gray-200 rounded p-1 text-[10px] h-8 focus:h-16 transition-all"
                />
              </div>
            ))}

            {n === 30 && ['घटना का संक्षिप्त विवरण (Details of event)', 'घटना कारित करने का मंशा (Intention)', 'घटना मे संलिप्त का नाम (co-offender)', 'Confession की संक्षिप्त विवरणी'].map((s, idx) => (
              <div key={s} className="mt-2">
                <label className="text-[10px] text-gray-400">30.{idx + 1} {s}</label>
                <textarea
                  name={`f30_sub${idx + 1}`}
                  value={state.fields[`f30_sub${idx + 1}`] || ''}
                  onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                  className="w-full border border-gray-200 rounded p-1 text-[10px] h-8 focus:h-24 transition-all"
                />
              </div>
            ))}

            {n === 34 && DIGITAL_KEYS.map(s => (
              <div key={s} className="mt-2">
                <label className="text-[10px] text-gray-400">Digital: {s}</label>
                <textarea
                  name={`f34_${s}`}
                  value={state.fields[`f34_${s}`] || ''}
                  onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                  className="w-full border border-gray-200 rounded p-1 text-[10px] h-8 focus:h-16 transition-all"
                />
              </div>
            ))}

            {n === 35 && DOC_KEYS.map(s => (
              <div key={s} className="mt-2">
                <label className="text-[10px] text-gray-400">Doc: {s}</label>
                <textarea
                  name={`f35_${s}`}
                  value={state.fields[`f35_${s}`] || ''}
                  onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                  className="w-full border border-gray-200 rounded p-1 text-[10px] h-8 focus:h-16 transition-all"
                />
              </div>
            ))}

            {n === 36 && ['JailDetail', 'EPrison'].map((s, idx) => (
              <div key={s} className="mt-2">
                <label className="text-[10px] text-gray-400">36.{idx + 1} {s}</label>
                <textarea
                  name={`f36_${s}`}
                  value={state.fields[`f36_${s}`] || ''}
                  onChange={(e) => onFieldChange(e.target.name, e.target.value)}
                  className="w-full border border-gray-200 rounded p-1 text-[10px] h-8 focus:h-16 transition-all"
                />
              </div>
            ))}
          </div>
        );
      })}

      <section className="bg-gray-100 p-4 rounded-lg space-y-4">
        <div>
          <h3 className="text-sm font-bold mb-3">Appendix Content</h3>
          <textarea
            name="extra_text"
            value={state.fields['extra_text'] || ''}
            onChange={(e) => onFieldChange(e.target.name, e.target.value)}
            placeholder="Append additional findings or report summaries here..."
            className="w-full border p-3 text-xs h-32 mb-2 rounded bg-white shadow-inner"
          ></textarea>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-600 block mb-1">Supplementary Photos (Appendix)</label>
          <input type="file" multiple accept="image/*" onChange={(e) => handleMultipleFiles(e, onExtraPhotos)} className="w-full text-xs mb-2" />
          <div className="flex flex-wrap gap-2">
            {state.extraPhotos.map((url, i) => (
              <div key={i} className="relative group">
                <img src={url} className="w-12 h-12 object-cover border rounded" />
                <button 
                  onClick={() => onRemoveExtraPhoto(i)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 text-[8px] flex items-center justify-center hover:bg-red-600"
                >✕</button>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-300">
          <h3 className="text-sm font-bold text-indigo-800 uppercase mb-3">Multimedia Samples (Non-Print)</h3>
          
          <div className="mb-4">
            <label className="text-[10px] font-bold text-gray-500 block mb-1">Video Samples</label>
            <input type="file" multiple accept="video/*" onChange={(e) => handleMultipleFiles(e, onVideoUpload)} className="w-full text-xs mb-2" />
            <div className="flex flex-wrap gap-2">
              {state.videos.map((_, i) => (
                <div key={i} className="bg-indigo-50 text-indigo-700 text-[10px] px-2 py-1 rounded border border-indigo-200 flex items-center gap-2">
                  <span>Video {i + 1}</span>
                  <button onClick={() => onRemoveVideo(i)} className="text-red-500 font-bold">✕</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-500 block mb-1">Voice Samples</label>
            <input type="file" multiple accept="audio/*" onChange={(e) => handleMultipleFiles(e, onAudioUpload)} className="w-full text-xs mb-2" />
            <div className="flex flex-wrap gap-2">
              {state.audio.map((_, i) => (
                <div key={i} className="bg-green-50 text-green-700 text-[10px] px-2 py-1 rounded border border-green-200 flex items-center gap-2">
                  <span>Voice {i + 1}</span>
                  <button onClick={() => onRemoveAudio(i)} className="text-red-500 font-bold">✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
