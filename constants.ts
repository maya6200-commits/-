import { MonthData } from './types';

// Helper to generate month data
const createMonth = (
  month: number,
  monthName: string,
  daysInMonth: number,
  startDayOffset: number,
  events: any[]
): MonthData => ({
  month,
  monthName,
  daysInMonth,
  startDayOffset,
  events,
});

export const CALENDAR_DATA: MonthData[] = [
  createMonth(1, "1월", 31, 1, [
    { day: 1, title: "새해 환경 다짐", isMostImportant: true, description: "올해는 지구를 위해 어떤 약속을 할까요?", imageKeyword: "sunrise", actionItem: "일회용품 줄이기를 약속해요." }
  ]),
  createMonth(2, "2월", 29, 4, [
    { day: 2, title: "세계 습지의 날", isMostImportant: true, description: "습지는 많은 생물들의 집이에요.", imageKeyword: "wetland", actionItem: "물을 깨끗하게 사용해요." },
    { day: 27, title: "북극곰의 날", isMostImportant: false }
  ]),
  createMonth(3, "3월", 31, 5, [
    { day: 22, title: "세계 물의 날", isMostImportant: true, description: "물은 우리 생명에게 가장 소중해요.", imageKeyword: "water", actionItem: "양치할 때 컵을 사용해요." },
    { day: 23, title: "세계 기상의 날", isMostImportant: false }
  ]),
  createMonth(4, "4월", 30, 1, [
    { day: 5, title: "식목일", isMostImportant: false },
    { day: 22, title: "지구의 날", isMostImportant: true, description: "아픈 지구를 위해 우리가 도와줘요.", imageKeyword: "earth", actionItem: "저녁 8시에 10분간 불을 꺼요." }
  ]),
  createMonth(5, "5월", 31, 3, [
    { day: 22, title: "생물다양성의 날", isMostImportant: true, description: "다양한 동물과 식물이 함께 살아요.", imageKeyword: "forest", actionItem: "길가에 핀 꽃을 꺾지 않아요." },
    { day: 31, title: "바다의 날", isMostImportant: false }
  ]),
  createMonth(6, "6월", 30, 6, [
    { day: 5, title: "세계 환경의 날", isMostImportant: true, description: "환경 보호를 위해 전 세계가 함께해요.", imageKeyword: "recycling", actionItem: "쓰레기를 분리수거해요." },
    { day: 17, title: "사막화 방지의 날", isMostImportant: false }
  ]),
  createMonth(7, "7월", 31, 1, [
    { day: 3, title: "일회용 비닐봉지 없는 날", isMostImportant: true, description: "비닐은 썩는 데 아주 오래 걸려요.", imageKeyword: "bag", actionItem: "장바구니를 사용해요." }
  ]),
  createMonth(8, "8월", 31, 4, [
    { day: 22, title: "에너지의 날", isMostImportant: true, description: "전기를 아껴서 지구 온도를 낮춰요.", imageKeyword: "lightbulb", actionItem: "안 쓰는 코드를 뽑아요." }
  ]),
  createMonth(9, "9월", 30, 0, [
    { day: 6, title: "자원순환의 날", isMostImportant: false },
    { day: 16, title: "오존층 보호의 날", isMostImportant: true, description: "지구의 선글라스, 오존층을 지켜요.", imageKeyword: "sky", actionItem: "스프레이 사용을 줄여요." }
  ]),
  createMonth(10, "10월", 31, 2, [
    { day: 4, title: "세계 동물의 날", isMostImportant: true, description: "모든 동물은 우리의 친구예요.", imageKeyword: "animals", actionItem: "동물을 사랑하고 보호해요." },
    { day: 16, title: "세계 식량의 날", isMostImportant: false }
  ]),
  createMonth(11, "11월", 30, 5, [
    { day: 26, title: "아무것도 사지 않는 날", isMostImportant: true, description: "꼭 필요한 물건만 사용해요.", imageKeyword: "shopping", actionItem: "고장 난 물건은 고쳐 써요." }
  ]),
  createMonth(12, "12월", 31, 0, [
    { day: 5, title: "세계 토양의 날", isMostImportant: true, description: "흙은 우리가 먹는 음식을 키워줘요.", imageKeyword: "soil", actionItem: "음식물을 남기지 않아요." }
  ]),
];
