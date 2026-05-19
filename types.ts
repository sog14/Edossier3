
export interface DossierState {
  reportType: 'E-DOSSIER' | 'INTERROGATION REPORT' | 'BAIL MONITORING';
  fields: Record<string, string>;
  photos: {
    p1: string | null;
    p2: string | null;
    p3: string | null;
  };
  extraPhotos: string[];
  videos: string[];
  audio: string[];
  bailHistory: Array<{
    date: string;
    name: string;
    gps: string;
    living: string;
    occupation: string;
    activity: string;
    income: string;
    other: string;
    verifier: string;
  }>;
}

export const INITIAL_STATE: DossierState = {
  reportType: 'E-DOSSIER',
  fields: {},
  photos: { p1: null, p2: null, p3: null },
  extraPhotos: [],
  videos: [],
  audio: [],
  bailHistory: [],
};

export const FAMILY_KEYS = ['Father', 'Mother', 'Wife', 'Brother', 'Sister', 'Children', 'दादा', 'चाचा', 'ननिहाल', 'मौसा-मौसी', 'बुआ', 'Other'];
export const DIGITAL_KEYS = ['Phone', 'WhatsApp', 'Signal', 'FB', 'Insta', 'Tele', 'Twitter', 'Email', 'Other'];
export const DOC_KEYS = ['Aadhar', 'PAN', 'Voter', 'Bank', 'Passpt', 'DL', 'Other'];
export const HABIT_KEYS = ['Cloths', 'Drinking', 'Smoking', 'Drugs', 'Prostitution'];
