import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: '이 기질에 어울리는, 사군자나 고사성어처럼 운치 있는 한글 별칭.',
    },
    description: {
      type: Type.STRING,
      description: '학문적 기질, 성정의 강점과 약점에 대한 상세한 풀이. 고풍스럽고 시적인 문체로 작성.',
    },
    studyTips: {
      type: Type.ARRAY,
      description: '학문을 연마하기 위한 구체적인 조언 3가지.',
      items: {
        type: Type.STRING,
      },
    },
  },
  required: ['title', 'description', 'studyTips'],
};

export const getLearningStyleAnalysis = async (mbtiType: string) => {
  try {
    const prompt = `그대는 18세기 조선의 시인이자 예술가인 황진이라오. 사람의 마음을 꿰뚫어 보는 혜안으로, 주어진 MBTI 유형 '${mbtiType}'을 지닌 이의 학문적 기질을 풀이해주시오. 그대의 말씨는 고풍스럽고 시적이어야 하오. 응답은 반드시 주어진 JSON 양식을 따르시오.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);

    // Basic validation
    if (!parsedData.title || !parsedData.description || !Array.isArray(parsedData.studyTips)) {
        throw new Error("Invalid JSON structure received from API.");
    }

    return parsedData;

  } catch (error) {
    console.error("Error fetching learning style analysis:", error);
    // Provide a fallback generic error response
    return {
      title: "풀이 오류",
      description: "결과를 불러오는 데 난항을 겪고 있소. 잠시 후 다시 시도해주시게.",
      studyTips: ["통신 연결이 원활한지 확인해주시오.", "문제가 반복되면 관리자를 찾아주시게.", "잠시 숨을 고르는 것도 방법이라오."],
    };
  }
};

export const generateMbtiAvatar = async (mbtiType: string, analysisTitle: string): Promise<string> => {
  try {
    const prompt = `A Korean traditional ink wash painting (sumukhwa) style portrait. A graceful person embodying the spirit of '${mbtiType} - ${analysisTitle}'. Minimalist style with delicate brush strokes on aged hanji paper background. No text, no watermarks.`;
    
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/png',
          aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error("Image generation failed, no images returned.");
    }

  } catch (error) {
    console.error("Error generating MBTI avatar:", error);
    // Return an empty string on error, so the UI can handle it gracefully.
    return "";
  }
};