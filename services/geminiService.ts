import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateTeachingTip = async (topic: string, month: string): Promise<string> => {
  if (!apiKey) return "API Key가 설정되지 않았습니다.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        당신은 발달장애인 성인 학습자를 가르치는 친절한 선생님입니다.
        "${month} - ${topic}"에 대해 설명하려고 합니다.
        학습자들이 이해하기 아주 쉽고, 친근하고, 따뜻한 말투로 2문장 내외의 짧은 설명과
        실생활에서 할 수 있는 아주 쉬운 행동 1가지를 추천해주세요.
        존댓말(해요체)을 사용하세요. 이모지를 적절히 섞어주세요.
      `,
    });
    return response.text || "설명을 불러올 수 없습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "죄송합니다. 지금은 AI 선생님과 연결할 수 없어요.";
  }
};

export const generateQuiz = async (topic: string): Promise<{ question: string; answer: string }> => {
  if (!apiKey) return { question: "API Key 없음", answer: "" };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        "${topic}"와 관련된 아주 쉬운 O/X 퀴즈를 하나 만들어주세요.
        대상은 성인 발달장애인입니다. 아주 직관적이고 쉬워야 합니다.
        JSON 형식으로 답변해주세요.
        형식: {"question": "질문 내용", "answer": "O 또는 X", "explanation": "정답 이유"}
      `,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    const json = JSON.parse(text);
    return {
      question: json.question,
      answer: `${json.answer} - ${json.explanation}`
    };
  } catch (error) {
    console.error("Gemini API Quiz Error:", error);
    return { question: "퀴즈를 만들 수 없어요.", answer: "" };
  }
};
