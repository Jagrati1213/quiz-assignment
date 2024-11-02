import questions from "../../data/quiz";

export async function GET() {
  return Response.json(
    JSON.parse(JSON.stringify(questions)),
    {
      status: 200,
    });
}