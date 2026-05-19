
import React, { useState, useCallback, useRef } from 'react';
import { DataEntry } from './components/DataEntry';
import { DossierPage } from './components/DossierPage';
import { exportToPdf, exportToWord } from './utils/export';
import { DossierState, INITIAL_STATE } from './types';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [state, setState] = useState<DossierState>(INITIAL_STATE);
  const [isExporting, setIsExporting] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const legacyFileInputRef = useRef<HTMLInputElement>(null);

  const getFormattedNow = () => {
    const now = new Date();
    const d = now.getDate().toString().padStart(2, '0');
    const m = (now.getMonth() + 1).toString().padStart(2, '0');
    const y = now.getFullYear();
    const h = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    return `${d}/${m}/${y} ${h}:${min}:${s}`;
  };

  const handleFieldChange = useCallback((name: string, value: string) => {
    setState(prev => ({
      ...prev,
      fields: { ...prev.fields, [name]: value }
    }));
  }, []);

  const handleTypeChange = (type: DossierState['reportType']) => {
    setState(prev => {
      const newState = { ...prev, reportType: type };
      
      // Auto-fetch date/time for Bail Monitoring if not already set
      if (type === 'BAIL MONITORING' && !prev.fields.bail_datetime) {
        newState.fields = { ...newState.fields, bail_datetime: getFormattedNow() };
      }
      
      return newState;
    });
  };

  const handleAddToBailHistory = useCallback(() => {
    if (!state.fields.bail_name) {
      alert("Please enter a name before logging.");
      return;
    }
    const newEntry = {
      date: state.fields.bail_datetime || getFormattedNow(),
      name: state.fields.bail_name || '',
      gps: state.fields.bail_gps || '',
      living: state.fields.bail_living || '',
      occupation: state.fields.bail_occupation || '',
      activity: state.fields.bail_activity || '',
      income: state.fields.bail_income || '',
      other: state.fields.bail_other || '',
      verifier: state.fields.bail_verifier || '',
    };
    setState(prev => ({
      ...prev,
      bailHistory: [newEntry, ...prev.bailHistory]
    }));
    alert("Verification log entry added successfully.");
  }, [state.fields]);

  const handleTranslate = async (targetLang: 'Hindi' | 'English') => {
    if (Object.keys(state.fields).length === 0) {
      alert("No data to translate.");
      return;
    }

    setIsTranslating(true);
    try {
      // Use Vite's standard environment variable access
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || (process.env as any).GEMINI_API_KEY;
      
      if (!apiKey || apiKey === 'undefined' || apiKey === 'PLACEHOLDER_API_KEY' || apiKey === '') {
        throw new Error("API Key is missing. Please set VITE_GEMINI_API_KEY in GitHub Secrets.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a professional translator for official police dossiers. 
      Translate all values in the following JSON object to ${targetLang}. 
      Keep the keys exactly as they are. Preserve technical terms, names, and addresses accurately.
      Return ONLY the translated JSON object.
      
      JSON content:
      ${JSON.stringify(state.fields)}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      if (!response.text) {
        throw new Error("Empty response from AI model.");
      }

      const translatedFields = JSON.parse(response.text);
      setState(prev => ({
        ...prev,
        fields: translatedFields
      }));
    } catch (error: any) {
      console.error("Translation failed:", error);
      alert(`AI Translation failed: ${error.message || "Please try again."}`);
    } finally {
      setIsTranslating(false);
    }
  };

  const handlePhotoUpload = useCallback((slot: 'p1' | 'p2' | 'p3', base64: string) => {
    setState(prev => ({
      ...prev,
      photos: { ...prev.photos, [slot]: base64 }
    }));
  }, []);

  const handleRemovePhoto = useCallback((slot: 'p1' | 'p2' | 'p3') => {
    setState(prev => ({
      ...prev,
      photos: { ...prev.photos, [slot]: null }
    }));
  }, []);

  const handleExtraPhotos = useCallback((newPhotos: string[]) => {
    setState(prev => ({
      ...prev,
      extraPhotos: [...prev.extraPhotos, ...newPhotos]
    }));
  }, []);

  const handleRemoveExtraPhoto = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      extraPhotos: prev.extraPhotos.filter((_, i) => i !== index)
    }));
  }, []);

  const handleVideoUpload = useCallback((newVideos: string[]) => {
    setState(prev => ({
      ...prev,
      videos: [...prev.videos, ...newVideos]
    }));
  }, []);

  const handleRemoveVideo = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  }, []);

  const handleAudioUpload = useCallback((newAudios: string[]) => {
    setState(prev => ({
      ...prev,
      audio: [...prev.audio, ...newAudios]
    }));
  }, []);

  const handleRemoveAudio = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      audio: prev.audio.filter((_, i) => i !== index)
    }));
  }, []);

  const handleSave = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${state.fields['f1'] || state.fields['bail_name'] || 'dossier'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleLoad = () => {
    legacyFileInputRef.current?.click();
  };

  const handleFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const loadedState = JSON.parse(event.target?.result as string);
          setState(loadedState);
        } catch (err) {
          alert("Invalid project file");
        }
      };
      reader.readAsText(file);
    }
    e.target.value = ''; // Reset input
  };

  const handlePdfExport = async (compress: boolean = false) => {
    setIsExporting(true);
    const filename = `${state.reportType}_${state.fields['f1'] || state.fields['bail_name'] || 'Draft'}${compress ? '_compressed' : ''}.pdf`;
    await exportToPdf('dossier-content', filename, compress);
    setIsExporting(false);
  };

  const handleWordExport = () => {
    exportToWord('dossier-content', `${state.reportType}_${state.fields['f1'] || state.fields['bail_name'] || 'Draft'}.doc`);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen max-w-[1600px] mx-auto overflow-hidden">
      {/* Hidden input for loading */}
      <input 
        type="file" 
        accept=".json" 
        ref={legacyFileInputRef} 
        onChange={handleFileLoad} 
        className="hidden" 
      />

      {/* Sidebar - Form Entry */}
      <div className="no-print w-full md:w-[400px] lg:w-[450px] bg-white border-r border-gray-200 overflow-y-auto h-screen sticky top-0 z-10">
        <div className="p-6">
          <header className="mb-6 flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-blue-900 tracking-tight leading-none uppercase">{state.reportType}</h1>
            <p className="text-xs text-gray-500 font-medium">Official Record Management System</p>
          </header>

          <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => handleTypeChange('E-DOSSIER')}
              className={`flex-1 py-2 text-[8px] font-bold rounded ${state.reportType === 'E-DOSSIER' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              E-DOSSIER
            </button>
            <button 
              onClick={() => handleTypeChange('INTERROGATION REPORT')}
              className={`flex-1 py-2 text-[8px] font-bold rounded ${state.reportType === 'INTERROGATION REPORT' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              INTERROGATION
            </button>
            <button 
              onClick={() => handleTypeChange('BAIL MONITORING')}
              className={`flex-1 py-2 text-[8px] font-bold rounded ${state.reportType === 'BAIL MONITORING' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200'}`}
            >
              BAIL MONITORING
            </button>
          </div>

          <div className="flex flex-col gap-2 mb-6">
             <div className="flex gap-2">
                <button
                    disabled={isTranslating}
                    onClick={() => handleTranslate('Hindi')}
                    className="flex-1 bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-2 rounded text-[10px] font-bold border border-orange-200 transition-colors disabled:opacity-50"
                >
                    {isTranslating ? 'Translating...' : 'Convert Data to Hindi (AI)'}
                </button>
                <button
                    disabled={isTranslating}
                    onClick={() => handleTranslate('English')}
                    className="flex-1 bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-2 rounded text-[10px] font-bold border border-blue-200 transition-colors disabled:opacity-50"
                >
                    {isTranslating ? 'Translating...' : 'Convert Data to English (AI)'}
                </button>
             </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded text-[10px] font-bold transition-colors uppercase shadow-sm"
            >
              Save Project
            </button>
            <button
              onClick={handleLoad}
              className="flex-1 bg-gray-700 hover:bg-gray-800 text-white px-2 py-2 rounded text-[10px] font-bold transition-colors uppercase shadow-sm"
            >
              Load Project
            </button>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            <button
              disabled={isExporting}
              onClick={() => handlePdfExport(false)}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isExporting ? 'Generating...' : 'Download High-Res PDF'}
            </button>
            <button
              disabled={isExporting}
              onClick={() => handlePdfExport(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              {isExporting ? 'Generating...' : 'Download Compressed PDF (Small)'}
            </button>
            <button
              onClick={handleWordExport}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              Export to Word (.doc)
            </button>
            <button
              onClick={() => window.print()}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg font-bold shadow-md transition-all flex items-center justify-center gap-2"
            >
              Print Dossier (Direct)
            </button>
          </div>

          <DataEntry
            state={state}
            onFieldChange={handleFieldChange}
            onPhotoUpload={handlePhotoUpload}
            onRemovePhoto={handleRemovePhoto}
            onExtraPhotos={handleExtraPhotos}
            onRemoveExtraPhoto={handleRemoveExtraPhoto}
            onVideoUpload={handleVideoUpload}
            onRemoveVideo={handleRemoveVideo}
            onAudioUpload={handleAudioUpload}
            onRemoveAudio={handleRemoveAudio}
            onAddToBailHistory={handleAddToBailHistory}
          />
        </div>
      </div>

      {/* Main Content - Live Preview */}
      <div className="flex-1 overflow-y-auto p-4 md:p-12 flex justify-center bg-gray-100">
        <div id="dossier-content" className="dossier-preview p-[12mm]">
          <DossierPage state={state} />
        </div>
      </div>
    </div>
  );
};

export default App;
