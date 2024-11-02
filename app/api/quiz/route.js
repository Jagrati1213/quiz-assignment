import questions from "../../data/quiz";

export async function GET() {
  return Response.json(
    JSON.parse(JSON.stringify(questions)),
    {
      status: 200,
    });
}

export async function POST(request) {
  const data = await request.json();
  return Response.json({
    message: "Answer submitted successfully!",
    data
  }, {
    status: 200
  }
  )
}