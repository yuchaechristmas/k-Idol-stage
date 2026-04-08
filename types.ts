export interface Fancam {
  id: string;
  title: string;
  idolName: string;
  groupName: string;
  youtubeId: string;
  thumbnailUrl: string;
  date: string;
  views?: string;
  description?: string;
  tags: string[];
}

export interface AIRecommendation {
  reason: string;
  suggestedFancams: Fancam[];
}
