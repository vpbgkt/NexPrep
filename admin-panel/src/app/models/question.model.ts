export interface Option {
  _id?: { $oid: string } | string; // Allow for both object and plain string ID
  text: string;
  img?: string;
  isCorrect: boolean;
}

// ADDED: Interface for structured explanations
export interface Explanation {
  _id?: { $oid: string } | string;
  type: 'text' | 'video' | 'pdf' | 'image';
  label?: string;
  content: string; // URL for video/pdf/image, text for text
}

export interface Translation {
  _id?: { $oid: string } | string;
  lang: string;
  questionText: string;
  images?: string[];
  options: Option[];
  explanations?: Explanation[]; // UPDATED to use Explanation interface
  numericalAnswer?: NumericalAnswer; // ADDED for numerical question types
}

// ADDED: Interface for populated hierarchical fields
export interface PopulatedHierarchyField {
  _id: string | { $oid: string };
  name: string;
  // Add other properties if they exist for populated fields
}

export interface Question {
  _id: { $oid: string } | string;
  expanded?: boolean; // Added for UI state

  // Allow for string ID, $oid object, or a fully populated object for hierarchical data
  branch?: string | { $oid: string } | PopulatedHierarchyField;
  subject?: string | { $oid: string } | PopulatedHierarchyField;
  topic?: string | { $oid: string } | PopulatedHierarchyField;
  subTopic?: string | { $oid: string } | PopulatedHierarchyField; // Corrected casing

  translations: Translation[];
  difficulty: '' | 'Very Easy' | 'Easy' | 'Medium' | 'Hard' | 'Very Hard' | 'Not-mentioned';
  type?: string;
  explanations?: any[];
  questionHistory?: any[];
  status?: string;
  version?: { $numberInt: string } | number;
  createdBy?: { $oid: string } | string;
  createdAt?: { $date: { $numberLong: string } } | Date | string;
  updatedAt?: { $date: { $numberLong: string } } | Date | string;
  __v?: { $numberInt: string } | number;

  // NEWLY ADDED FIELDS
  tags?: string[];
  recommendedTimeAllotment?: number; // Assuming in minutes or a consistent unit
  internalNotes?: string;

  // ADDED: Top-level fields for simpler display in lists (e.g., QuestionListComponent)
  // These would typically be populated from the primary translation by the service/backend for list views.
  questionText?: string;
  options?: Option[];

  // Keep original fields for compatibility if they are still used elsewhere directly,
  // but prefer using the translations array for text and options.
  // questionText?: string; // This might be from an older structure or a simplified view
  // options?: { text: string; isCorrect: boolean }[]; // This is now inside each Translation

  // ID values for submission (can be kept if used, or derived from main _id objects)
  branchId?: string;
  subjectId?: string;
  topicId?: string;
  // subtopicId?: string; // Covered by subTopic

  // Populated objects for listing (can be kept if used)
  // branch?: { _id: string; name: string }; // Covered by main branch object
  // subject?: { _id: string; name: string }; // Covered by main subject object
  // topic?: { _id: string; name: string }; // Covered by main topic object
  // subtopic?: { _id: string; name: string }; // Covered by main subTopic object
}

// ADDED: Interface for numerical answers (NAT - Numerical Answer Type)
export interface NumericalAnswer {
  _id?: { $oid: string } | string;
  minValue?: number;
  maxValue?: number;
  exactValue?: number;
  tolerance?: number; // For percentage-based tolerance
  unit?: string; // Optional unit like "m", "kg", etc.
}
