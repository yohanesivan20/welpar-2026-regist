export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const response =
      await fetch(
        process.env
          .NEXT_PUBLIC_GOOGLE_SCRIPT_URL!,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(body),
        }
      );

    const result =
      await response.json();

    return Response.json(
      result
    );

  } catch (err: any) {

    return Response.json(
      {
        success: false,
        message:
          err.message,
      },
      {
        status: 500,
      }
    );
  }
}