export enum SlideType {
  INTRO = 'INTRO',
  CALENDAR = 'CALENDAR',
  DETAIL = 'DETAIL',
  OUTRO = 'OUTRO'
}

export interface EnvironmentalDate {
  day: number;
  title: string;
  isMostImportant: boolean;
  description?: string;
  imageKeyword?: string;
  actionItem?: string;
}

export interface MonthData {
  month: number; // 1-12
  monthName: string;
  daysInMonth: number;
  startDayOffset: number; // 0 = Sunday, 1 = Monday, etc.
  events: EnvironmentalDate[];
}

export interface SlideConfig {
  id: number;
  type: SlideType;
  monthData?: MonthData;
  detailEvent?: EnvironmentalDate;
  monthName?: string;
}
